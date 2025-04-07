//viewer.js
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from 'three-mesh-bvh';
import JSZip from 'jszip'; 

THREE.Mesh.prototype.raycast = acceleratedRaycast;
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;

let scene, camera, renderer, controls;
let meshes = [];
let meshGroup = null;
let material;
let modelData = window.threeDViewerData || null;

let annotations = [];
let annotationMarkers = [];
let selectedAnnotation = null;
// 항상 메모모드 활성화
let isAnnotationMode = true;
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let tempMarker = null;
let onAnnotationSelect = null;
let onAnnotationAdd = null;
// 가장 최근에 추가된 메모의 인덱스를 추적하는 변수 추가
let lastAddedAnnotationIndex = null;

const params = {
  matcap: 'Clay',
};

const matcaps = {};
const colorPalette = [
  '#F9E4C8', '#FAF0D1', '#FFFFE0', '#FDE8D0', '#FFFAF0', 
  '#EDE6DB', '#D3D3C3', '#D8D8D8', '#F2F2F5', '#F3E5AB'
];

const stlLoader = new STLLoader();

// ===== 로딩 애니메이션 관련 함수 및 스타일 추가 =====
function addSpinnerStyle() {
  if (document.getElementById('spinner-style')) return;
  const style = document.createElement('style');
  style.id = 'spinner-style';
  style.innerHTML = `
    @keyframes spinner {
      to { transform: rotate(360deg); }
    }
    #loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .spinner {
      width: 50px;
      height: 50px;
      border: 6px solid #ccc;
      border-top-color: #333;
      border-radius: 50%;
      animation: spinner 0.6s linear infinite;
    }
  `;
  document.head.appendChild(style);
}

function showLoadingAnimation() {
  addSpinnerStyle();
  let loadingDiv = document.getElementById("loading-overlay");
  if (!loadingDiv) {
    loadingDiv = document.createElement("div");
    loadingDiv.id = "loading-overlay";
    loadingDiv.innerHTML = "<div class='spinner'></div>";
    document.body.appendChild(loadingDiv);
  }
  loadingDiv.style.display = "flex";
}

function hideLoadingAnimation() {
  const loadingDiv = document.getElementById("loading-overlay");
  if (loadingDiv) {
    loadingDiv.style.display = "none";
  }
}
// ========================================================

function fitCameraToMeshes() {
    if (!meshGroup || meshes.length === 0) return;
    
    const boundingBox = new THREE.Box3();
    
    meshes.forEach(mesh => {
      if (!mesh.geometry.boundingBox) {
        mesh.geometry.computeBoundingBox();
      }
      const meshBounds = new THREE.Box3().copy(mesh.geometry.boundingBox);
      meshBounds.applyMatrix4(mesh.matrixWorld);
      boundingBox.union(meshBounds);
    });
    
    const center = new THREE.Vector3();
    boundingBox.getCenter(center);
    const size = new THREE.Vector3();
    boundingBox.getSize(size);
    
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    
    let distance = Math.abs(maxDim / Math.sin(fov / 2));
    
    distance *= 0.6;
    
    const direction = new THREE.Vector3(0, 1, 0).normalize();
    camera.position.copy(center).add(direction.multiplyScalar(distance));
    
    camera.lookAt(center);
    
    camera.up.set(0, 0, 1);
    
    camera.near = distance / 100;
    camera.far = distance * 100;
    camera.updateProjectionMatrix();
    
    controls.target.copy(center);
    
    controls.rotateSpeed = 3.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noPan = false;
    controls.noZoom = false;
    controls.noRotate = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    if (controls.up) {
        controls.up.copy(camera.up);
    }
    
    controls.update();
}

function addMeshFromGeometry(geometry) {
  geometry.computeBoundingSphere();
  
  geometry.deleteAttribute('uv');
  geometry = BufferGeometryUtils.mergeVertices(geometry);
  geometry.computeVertexNormals();
  geometry.attributes.position.setUsage(THREE.DynamicDrawUsage);
  geometry.attributes.normal.setUsage(THREE.DynamicDrawUsage);
  geometry.computeBoundsTree({ setBoundingBox: false });
  
  const meshMaterial = new THREE.MeshMatcapMaterial({
    flatShading: false,
    side: THREE.DoubleSide,
    matcap: matcaps[params.matcap]
  });
  
  const newMesh = new THREE.Mesh(geometry, meshMaterial);
  meshes.push(newMesh);
  
  return newMesh;
}

function arrangeMeshes() {
  if (meshGroup) {
    scene.remove(meshGroup);
  }
  
  meshGroup = new THREE.Group();
  scene.add(meshGroup);
  
  if (meshes.length === 0) return;
  
  meshes.forEach(mesh => {
    meshGroup.add(mesh);
  });
  
  fitCameraToMeshes();
}

function clearAllMeshes() {
  if (meshGroup) {
    scene.remove(meshGroup);
  }
  
  meshes.forEach(mesh => {
    mesh.geometry.dispose();
  });
  
  meshes = [];
  meshGroup = null;
  
  clearAllAnnotations();
}

function clearAllAnnotations() {
  annotationMarkers.forEach(marker => {
    scene.remove(marker);
    if (marker.geometry) marker.geometry.dispose();
    if (marker.material) marker.material.dispose();
  });
  
  annotations = [];
  annotationMarkers = [];
  selectedAnnotation = null;
  lastAddedAnnotationIndex = null; // 이 변수도 초기화
  
  if (tempMarker) {
    scene.remove(tempMarker);
    if (tempMarker.geometry) tempMarker.geometry.dispose();
    if (tempMarker.material) tempMarker.material.dispose();
    tempMarker = null;
  }
}

function processSTLFile(arrayBuffer, filename = '') {
  try {
    const geometry = stlLoader.parse(arrayBuffer);
    const positionAttr = geometry.getAttribute('position');
    
    if (!positionAttr) {
      console.error('BufferGeometry has no position attribute:', filename);
      return null;
    }
    
    const positions = positionAttr.array;
    const indices = [];
    for (let i = 0; i < positions.length / 3; i += 3) {
      indices.push(i, i + 1, i + 2);
    }
    
    let newGeometry = new THREE.BufferGeometry();
    newGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    newGeometry.setIndex(new THREE.Uint32BufferAttribute(indices, 1));
    
    return addMeshFromGeometry(newGeometry);
  } catch (error) {
    console.error('Error processing STL file:', filename, error);
    return null;
  }
}

async function processZipFile(arrayBuffer) {
  try {
    const zip = await JSZip.loadAsync(arrayBuffer);
    let processedFiles = 0;
    
    const promises = [];
    
    zip.forEach((relativePath, zipEntry) => {
      if (relativePath.toLowerCase().endsWith('.stl')) {
        const promise = zipEntry.async('arraybuffer').then(fileData => {
          const mesh = processSTLFile(fileData, relativePath);
          if (mesh) processedFiles++;
          return mesh;
        });
        promises.push(promise);
      }
    });
    
    await Promise.all(promises);
    
    if (processedFiles === 0) {
      console.warn('No STL files found in ZIP file.');
    }
    
    arrangeMeshes();
  } catch (error) {
    console.error('Error processing ZIP file:', error);
  }
}

function createAnnotationMarker(position, index) {
    const markerGroup = new THREE.Group();
    markerGroup.position.copy(position);
    markerGroup.userData.annotationIndex = index;
    
    const markerGeometry = new THREE.SphereGeometry(0.48, 24, 24);
    const markerMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xFF4500, 
      transparent: true,
      opacity: 0.9,
      depthTest: false
    });
    
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    markerGroup.add(marker);
    
    const ringGeometry = new THREE.RingGeometry(0.60, 0.84, 32);
    const ringMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xFFFF00, 
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
      depthTest: false
    });
    
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    markerGroup.add(ring);
    
    ring.userData.animation = {
      pulse: 0,
      speed: 2
    };
    
    if (!window.annotationAnimations) {
      window.annotationAnimations = [];
    }
    window.annotationAnimations.push(ring);
      
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 18;
    ctx.font = 'bold 160px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeText(index + 1, 128, 128);
    ctx.fillText(index + 1, 128, 128);
    
    const texture = new THREE.CanvasTexture(canvas);
    const labelGeometry = new THREE.PlaneGeometry(0.84, 0.84);
    const labelMaterial = new THREE.MeshBasicMaterial({ 
      map: texture,
      transparent: true,
      depthTest: false,
      side: THREE.DoubleSide
    });
    
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.set(0, 0.90, 0);
    
    label.userData.isBillboard = true;
    
    markerGroup.add(label);
    
    markerGroup.userData.isOccluded = false;
    
    return markerGroup;
}

// Modified to accept an optional ID parameter
function addAnnotation(position, text, id = null) {
  const index = annotations.length;
  const annotation = {
    id: id || Date.now(), // Use provided ID or timestamp
    position: position.clone(),
    text: text,
    createdAt: new Date()
  };
  
  annotations.push(annotation);
  
  const marker = createAnnotationMarker(position, index);
  scene.add(marker);
  annotationMarkers.push(marker);
  
  createClickAnimation(position);
  
  // 가장 최근에 추가된 메모의 인덱스 저장
  lastAddedAnnotationIndex = index;
  
  if (onAnnotationAdd && typeof onAnnotationAdd === 'function') {
    onAnnotationAdd(annotation, index);
  }
  
  return annotation;
}

// NEW: Function to add an existing annotation loaded from the server
function addExistingAnnotation(annotation) {
  try {
    // Handle different position formats safely
    let positionVector;
    
    if (!annotation.position) {
      console.error('Annotation position is undefined', annotation);
      return null;
    }
    
    // Create a THREE.Vector3 from the position if it's not already
    if (annotation.position instanceof THREE.Vector3) {
      positionVector = annotation.position.clone();
    } else {
      // Make sure we have numeric values for position
      const x = parseFloat(annotation.position.x) || 0;
      const y = parseFloat(annotation.position.y) || 0;
      const z = parseFloat(annotation.position.z) || 0;
      positionVector = new THREE.Vector3(x, y, z);
    }
    
    // Create the annotation in the viewer
    const index = annotations.length;
    const newAnnotation = {
      id: annotation.id, // Use the server ID
      position: positionVector,
      text: annotation.text || '',
      createdAt: annotation.createdAt ? new Date(annotation.createdAt) : new Date(),
      updatedAt: annotation.updatedAt ? new Date(annotation.updatedAt) : null,
      writerName: annotation.writerName
    };
    
    annotations.push(newAnnotation);
    
    // Create and add the marker
    const marker = createAnnotationMarker(positionVector, index);
    scene.add(marker);
    annotationMarkers.push(marker);
    
    console.log('Added existing annotation:', newAnnotation);
    
    return newAnnotation;
  } catch (error) {
    console.error('Error adding existing annotation:', error, annotation);
    return null;
  }
}

// NEW: Function to update an annotation's ID after saving to server
function updateAnnotationId(index, newId) {
  if (index >= 0 && index < annotations.length) {
    annotations[index].id = newId;
    return true;
  }
  return false;
}

function createClickAnimation(position) {
  const rippleGeometry = new THREE.RingGeometry(0.06, 0.03, 16);
  const rippleMaterial = new THREE.MeshBasicMaterial({
    color: 0x00FFFF,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide,
    depthTest: false
  });
  
  const ripple = new THREE.Mesh(rippleGeometry, rippleMaterial);
  ripple.position.copy(position);
  ripple.rotation.x = Math.PI / 2;
  scene.add(ripple);
  
  ripple.userData.createdAt = Date.now();
  ripple.userData.duration = 2000;
  
  if (!window.clickAnimations) {
    window.clickAnimations = [];
  }
  window.clickAnimations.push(ripple);
  
  setTimeout(() => {
    scene.remove(ripple);
    ripple.geometry.dispose();
    ripple.material.dispose();
    
    if (window.clickAnimations) {
      const index = window.clickAnimations.indexOf(ripple);
      if (index > -1) {
        window.clickAnimations.splice(index, 1);
      }
    }
  }, ripple.userData.duration);
}

function updateAnnotation(index, text) {
  if (index >= 0 && index < annotations.length) {
    annotations[index].text = text;
    annotations[index].updatedAt = new Date();
    
    // 메모가 저장되면(텍스트가 있으면) 최근 추가된 메모 인덱스 초기화
    if (index === lastAddedAnnotationIndex && text !== "") {
      lastAddedAnnotationIndex = null;
    }
    
    return true;
  }
  return false;
}

function deleteAnnotation(index) {
  if (index >= 0 && index < annotations.length) {
    scene.remove(annotationMarkers[index]);
    if (annotationMarkers[index].geometry) annotationMarkers[index].geometry.dispose();
    if (annotationMarkers[index].material) annotationMarkers[index].material.dispose();
    
    annotations.splice(index, 1);
    annotationMarkers.splice(index, 1);
    
    // lastAddedAnnotationIndex 업데이트
    if (lastAddedAnnotationIndex === index) {
      lastAddedAnnotationIndex = null;
    } else if (lastAddedAnnotationIndex > index) {
      lastAddedAnnotationIndex--;
    }
    
    annotationMarkers.forEach((marker, i) => {
      marker.userData.annotationIndex = i;
      
      if (marker.children.length > 2) {
        const label = marker.children[2]; // 라벨은 세번째 자식 요소
        if (label) {
          const canvas = document.createElement('canvas');
          canvas.width = 256;
          canvas.height = 256;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = 'white';
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 18;
          ctx.font = 'bold 160px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.strokeText(i + 1, 128, 128);
          ctx.fillText(i + 1, 128, 128);
          
          const texture = new THREE.CanvasTexture(canvas);
          if (label.material && label.material.map) {
            label.material.map.dispose();
            label.material.map = texture;
            label.material.needsUpdate = true;
          }
        }
      }
    });
    
    if (selectedAnnotation === index) {
      selectedAnnotation = null;
    } else if (selectedAnnotation > index) {
      selectedAnnotation--;
    }
    
    return true;
  }
  return false;
}

function focusOnAnnotation(index) {
    if (index >= 0 && index < annotations.length && camera && controls) {
      const annotation = annotations[index];
      const position = annotation.position.clone();
      
      // Calculate a position that gives a good view of the annotation
      const offsetDistance = 20; // Distance from annotation to place camera
      
      // Get the current camera direction vector
      const currentDirection = new THREE.Vector3();
      camera.getWorldDirection(currentDirection);
      
      // Calculate a new camera position
      const newCameraPosition = position.clone().sub(
        currentDirection.multiplyScalar(offsetDistance)
      );
      
      // Animation settings
      const duration = 800; // ms
      const startTime = Date.now();
      const startPosition = camera.position.clone();
      const startTarget = controls.target.clone();
      const endTarget = position.clone();
      
      // Disable controls during animation
      const originalControlsState = {
        enabled: controls.enabled
      };
      controls.enabled = false;
      
      // Animation function
      function animateCamera() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease function for smoother animation
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
        
        // Interpolate camera position and target
        camera.position.lerpVectors(startPosition, newCameraPosition, easeProgress);
        controls.target.lerpVectors(startTarget, endTarget, easeProgress);
        controls.update();
        
        if (progress < 1) {
          requestAnimationFrame(animateCamera);
        } else {
          // Re-enable controls when animation is complete
          controls.enabled = originalControlsState.enabled;
        }
      }
      
      // Start animation
      animateCamera();
      
      // Highlight the marker
      annotationMarkers.forEach((marker, i) => {
        const sphere = marker.children.find(child => 
          child.isMesh && child.geometry.type === 'SphereGeometry'
        );
        
        if (sphere && sphere.material) {
          if (i === index) {
            sphere.material.color.set(0x00FF00);
            sphere.material.opacity = 1.0;
            
            // Create a pulse effect at the marker location
            createClickAnimation(position);
          } else {
            sphere.material.color.set(0xFF4500);
            sphere.material.opacity = 0.8;
          }
        }
      });
      
      selectedAnnotation = index;
      return true;
    }
    return false;
  }

function onMouseMove(event) {
    if (!renderer || !camera) return;
    
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    
    annotationMarkers.forEach(markerGroup => {
      if (markerGroup.userData.annotationIndex !== selectedAnnotation && markerGroup.visible) {
        const sphere = markerGroup.children.find(child => child.isMesh && child.geometry.type === 'SphereGeometry');
        if (sphere && sphere.material) {
          sphere.material.color.set(0xFF4500);
          sphere.material.opacity = 0.8;
        }
      }
    });
    
    const intersects = raycaster.intersectObjects(annotationMarkers, true);
    
    if (intersects.length > 0) {
      let markerGroup = intersects[0].object;
      while (markerGroup.parent && !markerGroup.userData.hasOwnProperty('annotationIndex')) {
        markerGroup = markerGroup.parent;
      }
      
      if (markerGroup.userData.hasOwnProperty('annotationIndex') && markerGroup.visible) {
        const annotationIndex = markerGroup.userData.annotationIndex;
        
        if (annotationIndex !== selectedAnnotation) {
          const sphere = markerGroup.children.find(child => child.isMesh && child.geometry.type === 'SphereGeometry');
          if (sphere && sphere.material) {
            sphere.material.color.set(0xFFFF00);
            sphere.material.opacity = 1.0;
          }
        }
        document.body.style.cursor = 'pointer';
      }
    } else {
      // 항상 메모모드이므로 crosshair 커서 유지
      document.body.style.cursor = 'crosshair';
    }
    
    if (meshes.length > 0) {
      const meshIntersects = raycaster.intersectObjects(meshes);
      if (meshIntersects.length > 0) {
        const point = meshIntersects[0].point;
        
        if (!tempMarker) {
          const tempGroup = new THREE.Group();
          
          const markerGeometry = new THREE.SphereGeometry(0.36, 16, 16);
          const markerMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x00FF00, 
            transparent: true, 
            opacity: 0.7,
            depthTest: false
          });
          const sphere = new THREE.Mesh(markerGeometry, markerMaterial);
          tempGroup.add(sphere);
          
          const lineLength = 1.2;
          const lineWidth = 0.036;
          
          const hLineGeom = new THREE.BoxGeometry(lineLength, lineWidth, lineWidth);
          const lineMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
          const hLine = new THREE.Mesh(hLineGeom, lineMaterial);
          tempGroup.add(hLine);
          
          const vLineGeom = new THREE.BoxGeometry(lineWidth, lineLength, lineWidth);
          const vLine = new THREE.Mesh(vLineGeom, lineMaterial);
          tempGroup.add(vLine);
          
          const dLineGeom = new THREE.BoxGeometry(lineWidth, lineWidth, lineLength);
          const dLine = new THREE.Mesh(dLineGeom, lineMaterial);
          tempGroup.add(dLine);
          
          const circleGeometry = new THREE.RingGeometry(0.48, 0.504, 32);
          const circleMaterial = new THREE.MeshBasicMaterial({
            color: 0x00FFFF,
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide,
            depthTest: false
          });
          const circle = new THREE.Mesh(circleGeometry, circleMaterial);
          circle.rotation.x = Math.PI / 2;
          tempGroup.add(circle);
          
          tempMarker = tempGroup;
          scene.add(tempMarker);
        }
        
        tempMarker.position.copy(point);
        tempMarker.visible = true;
      } else if (tempMarker) {
        tempMarker.visible = false;
      }
    } else if (tempMarker) {
      tempMarker.visible = false;
    }
}

function onMouseClick(event) {
    if (!renderer || !camera) return;
    
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    
    const markerIntersects = raycaster.intersectObjects(annotationMarkers, true);
    if (markerIntersects.length > 0) {
      let markerGroup = markerIntersects[0].object;
      while (markerGroup.parent && !markerGroup.userData.hasOwnProperty('annotationIndex')) {
        markerGroup = markerGroup.parent;
      }
      
      if (markerGroup.userData.hasOwnProperty('annotationIndex') && markerGroup.visible) {
        const index = markerGroup.userData.annotationIndex;
        
        selectedAnnotation = index;
        
        annotationMarkers.forEach((group, i) => {
          const sphere = group.children.find(child => child.isMesh && child.geometry.type === 'SphereGeometry');
          
          if (sphere && sphere.material) {
            if (i === selectedAnnotation) {
              sphere.material.color.set(0x00FF00);
              sphere.material.opacity = 1.0;
            } else {
              sphere.material.color.set(0xFF4500);
              sphere.material.opacity = 0.8;
            }
          }
        });
        
        if (onAnnotationSelect && typeof onAnnotationSelect === 'function') {
          onAnnotationSelect(annotations[index], index);
        }
        
        return;
      }
    }
    
    if (meshes.length > 0) {
      const meshIntersects = raycaster.intersectObjects(meshes);
      if (meshIntersects.length > 0) {
        const point = meshIntersects[0].point;
        
        // 저장되지 않은 메모가 있으면 삭제
        if (lastAddedAnnotationIndex !== null && 
            annotations[lastAddedAnnotationIndex] && 
            annotations[lastAddedAnnotationIndex].text === "") {
          deleteAnnotation(lastAddedAnnotationIndex);
        }
        
        // 새 메모 추가
        addAnnotation(point, "");
        
        if (tempMarker) {
          tempMarker.visible = false;
        }
      }
    }
}

function init() {
  const container = document.querySelector('.fullPop > div') || document.body;
  
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor('gray')
  container.appendChild(renderer.domElement);
  
  scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  
  camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 50);
  camera.position.set(0, 0, 3);
  
  controls = new TrackballControls(camera, renderer.domElement);
  
  const textureLoader = new THREE.TextureLoader();
  let loadedTextures = 0;
  const totalTextures = 4;
  
  const onTextureLoaded = () => {
    loadedTextures++;
    if (loadedTextures === totalTextures) {
      console.log("All textures loaded");
    }
  };
  
  textureLoader.load('/src/textures/B67F6B_4B2E2A_6C3A34_F3DBC6-256px.png', (texture) => {
    matcaps['Clay'] = texture;
    updateMaterials();
    onTextureLoaded();
  }, undefined, (error) => console.error('Texture loading error:', error));
  
  material = new THREE.MeshMatcapMaterial({
    flatShading: false,
    side: THREE.DoubleSide
  });
  
  document.body.style.cursor = 'crosshair';
  
  renderer.domElement.addEventListener('mousemove', onMouseMove);
  renderer.domElement.addEventListener('click', onMouseClick);
  
  const handleResize = () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  
  window.addEventListener('resize', handleResize);
  
  render();
  
  return () => {
    window.removeEventListener('resize', handleResize);
    renderer.domElement.removeEventListener('mousemove', onMouseMove);
    renderer.domElement.removeEventListener('click', onMouseClick);
    
    if (renderer && renderer.domElement) {
      container.removeChild(renderer.domElement);
    }
    
    clearAllAnnotations();
    renderer.dispose();
  };
}

function render() {
    requestAnimationFrame(render);
    controls.update();
    
    if (camera && meshes.length > 0 && annotationMarkers.length > 0) {
        const occlusionRaycaster = new THREE.Raycaster();
        
        annotationMarkers.forEach(markerGroup => {
            const markerPosition = markerGroup.position.clone();
            
            const direction = markerPosition.clone().sub(camera.position).normalize();
            
            occlusionRaycaster.set(camera.position, direction);
            
            const distanceToMarker = camera.position.distanceTo(markerPosition);
            
            const intersects = occlusionRaycaster.intersectObjects(meshes);
            
            const isOccluded = intersects.length > 0 && intersects[0].distance < distanceToMarker * 0.95;
            
            markerGroup.visible = !isOccluded;
            markerGroup.userData.isOccluded = isOccluded;
            
            if (!isOccluded) {
                markerGroup.children.forEach(child => {
                    if (child.userData.isBillboard) {
                        child.quaternion.copy(camera.quaternion);
                    }
                });
            }
        });
    }
    
    if (window.annotationAnimations) {
        const time = Date.now() * 0.001;
        
        window.annotationAnimations.forEach(ring => {
            if (ring && ring.parent && ring.parent.visible && ring.userData && ring.userData.animation) {
                const pulseSpeed = ring.userData.animation.speed;
                const pulseFactor = 0.2 * Math.sin(time * pulseSpeed) + 0.8;
                
                ring.scale.set(pulseFactor, pulseFactor, pulseFactor);
                
                ring.material.color.setHSL(
                    (time * 0.1) % 1.0,
                    0.7,
                    0.6
                );
                
                ring.material.opacity = 0.3 + 0.4 * Math.sin(time * pulseSpeed * 0.5);
            }
        });
    }
    
    if (window.clickAnimations) {
        const now = Date.now();
        
        window.clickAnimations.forEach(ripple => {
            if (ripple && ripple.userData) {
                const elapsed = now - ripple.userData.createdAt;
                const duration = ripple.userData.duration;
                const progress = Math.min(elapsed / duration, 1.0);
                
                const scale = 1.0 + progress * 30.0;
                ripple.scale.set(scale, scale, scale);
                
                ripple.material.opacity = 0.9 * (1.0 - progress);
            }
        });
    }
    
    renderer.render(scene, camera);
}

function updateMaterials() {
  if (!matcaps[params.matcap]) {
    return;
  }
  
  material.matcap = matcaps[params.matcap];
  
  meshes.forEach(mesh => {
    if (mesh.material && mesh.material.isMeshMatcapMaterial) {
      mesh.material.matcap = matcaps[params.matcap];
      mesh.material.needsUpdate = true;
    }
  });
}

// 로딩 중 애니메이션을 추가한 loadModelsFromUrls 함수
async function loadModelsFromUrls(fileList) {
  showLoadingAnimation();
  clearAllMeshes();
  
  if (!fileList || fileList.length === 0) {
    console.warn('No files provided in fileList');
    hideLoadingAnimation();
    return;
  }
  
  try {
    const loadPromises = fileList.map(async (fileInfo, index) => {
      if (!fileInfo.threeFileUrl) {
        console.warn(`File at index ${index} has no URL`);
        return null;
      }
      
      try {
        const response = await fetch(fileInfo.threeFileUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch STL: ${response.statusText}`);
        }
        
        const arrayBuffer = await response.arrayBuffer();
        const mesh = processSTLFile(arrayBuffer, fileInfo.threeFileRealName || `model_${index}.stl`);
        
        return mesh;
      } catch (error) {
        console.error(`Error loading model from URL ${fileInfo.threeFileUrl}:`, error);
        return null;
      }
    });
    
    await Promise.all(loadPromises);
    
    arrangeMeshes();
    
    console.log(`Loaded ${meshes.length} models from URLs`);
  } catch (error) {
    console.error('Error loading models from URLs:', error);
  } finally {
    hideLoadingAnimation();
  }
}

function setAnnotationCallbacks(selectCallback, addCallback) {
  onAnnotationSelect = selectCallback;
  onAnnotationAdd = addCallback;
}

function getAnnotations() {
  return [...annotations];
}

export function toggleAnnotationMode() {
  // 항상 메모모드가 활성화되도록 수정
  isAnnotationMode = true;
  document.body.style.cursor = 'crosshair';
  return isAnnotationMode;
}

export function getSelectedAnnotation() {
  if (selectedAnnotation !== null && selectedAnnotation >= 0 && selectedAnnotation < annotations.length) {
    return {
      annotation: annotations[selectedAnnotation],
      index: selectedAnnotation
    };
  }
  return null;
}

let cleanupFunction = null;

export function initViewer(container, modelData, annotationSelectCallback, annotationAddCallback) {
  if (cleanupFunction) {
    cleanupFunction();
    cleanupFunction = null;
  }
  
  cleanupFunction = init();
  
  setAnnotationCallbacks(annotationSelectCallback, annotationAddCallback);
  
  if (modelData && modelData.fileList && modelData.fileList.length > 0) {
    loadModelsFromUrls(modelData.fileList);
  }
  
  return cleanupFunction;
}

export function cleanupViewer() {
  if (cleanupFunction) {
    cleanupFunction();
    cleanupFunction = null;
  }
}

export { 
  addAnnotation,
  updateAnnotation,
  deleteAnnotation,
  getAnnotations,
  addExistingAnnotation,
  updateAnnotationId,
  focusOnAnnotation
};
