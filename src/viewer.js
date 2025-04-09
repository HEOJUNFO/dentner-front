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

let modelMap = new Map();

let annotations = [];
let annotationMarkers = [];
let selectedAnnotation = null;
let isAnnotationMode = false; // Default to false, will be set based on callbacks
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let tempMarker = null;
let onAnnotationSelect = null;
let onAnnotationAdd = null;
let lastAddedAnnotationIndex = null;
let currentAnimation = null;

const params = {
  matcap: 'Clay',
};

const matcaps = {};

const stlLoader = new STLLoader();

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
  
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  distance *= isMobile ? 1.2 : 0.6;
  
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

function addMeshFromGeometry(geometry, fileNo) {
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
    matcap: matcaps[params.matcap],
    transparent: true,
    opacity: 1.0
  });
  
  const newMesh = new THREE.Mesh(geometry, meshMaterial);
  const meshIndex = meshes.length;
  
  // Set default visibility based on index
  newMesh.visible = meshIndex === 0;
  
  meshes.push(newMesh);
  
  if (fileNo) {
    modelMap.set(fileNo, meshIndex);
    newMesh.userData.fileNo = fileNo;
  }
  
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
  modelMap.clear();
  
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
  lastAddedAnnotationIndex = null;
  
  if (tempMarker) {
    scene.remove(tempMarker);
    if (tempMarker.geometry) tempMarker.geometry.dispose();
    if (tempMarker.material) tempMarker.material.dispose();
    tempMarker = null;
  }
}

function processSTLFile(arrayBuffer, filename = '', fileNo = null) {
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
    
    return addMeshFromGeometry(newGeometry, fileNo);
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

function setModelTransparency(fileNo, opacity) {
  if (modelMap.has(fileNo)) {
    const meshIndex = modelMap.get(fileNo);
    if (meshIndex >= 0 && meshIndex < meshes.length) {
      const mesh = meshes[meshIndex];
      if (mesh && mesh.material) {
        mesh.material.transparent = opacity < 0.99;
        mesh.material.opacity = opacity;
        mesh.material.needsUpdate = true;
      }
    }
  }
}

function setModelVisibility(fileNo, visible) {
  if (modelMap.has(fileNo)) {
    const meshIndex = modelMap.get(fileNo);
    if (meshIndex >= 0 && meshIndex < meshes.length) {
      const mesh = meshes[meshIndex];
      if (mesh) {
        mesh.visible = visible;
        // console.log(`Setting model ${fileNo} visibility to ${visible}`);
      }
    }
  }
  // 경고 메시지 제거
  // else {
  //   console.warn(`Model with fileNo ${fileNo} not found in modelMap`);
  // }
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

function addAnnotation(position, text, id = null) {
  if (!isAnnotationMode) return null;
  
  const index = annotations.length;
  const annotation = {
    id: id || Date.now(),
    position: position.clone(),
    text: text,
    createdAt: new Date()
  };
  
  annotations.push(annotation);
  
  const marker = createAnnotationMarker(position, index);
  scene.add(marker);
  annotationMarkers.push(marker);
  
  createClickAnimation(position);
  
  lastAddedAnnotationIndex = index;
  
  if (onAnnotationAdd && typeof onAnnotationAdd === 'function') {
    onAnnotationAdd(annotation, index);
  }
  
  return annotation;
}

function addExistingAnnotation(annotation) {
  try {
    let positionVector;
    
    if (!annotation.position) {
      console.error('Annotation position is undefined', annotation);
      return null;
    }
    
    if (annotation.position instanceof THREE.Vector3) {
      positionVector = annotation.position.clone();
    } else {
      const x = parseFloat(annotation.position.x) || 0;
      const y = parseFloat(annotation.position.y) || 0;
      const z = parseFloat(annotation.position.z) || 0;
      positionVector = new THREE.Vector3(x, y, z);
    }
    
    const index = annotations.length;
    const newAnnotation = {
      id: annotation.id,
      position: positionVector,
      text: annotation.text || '',
      createdAt: annotation.createdAt ? new Date(annotation.createdAt) : new Date(),
      updatedAt: annotation.updatedAt ? new Date(annotation.updatedAt) : null,
      writerName: annotation.writerName
    };
    
    annotations.push(newAnnotation);
    
    const marker = createAnnotationMarker(positionVector, index);
    scene.add(marker);
    annotationMarkers.push(marker);
    
    return newAnnotation;
  } catch (error) {
    console.error('Error adding existing annotation:', error, annotation);
    return null;
  }
}

function updateAnnotationId(index, newId) {
  if (index >= 0 && index < annotations.length) {
    annotations[index].id = newId;
    return true;
  }
  return false;
}

function createClickAnimation(position) {
  const rippleGeometry = new THREE.RingGeometry(0.01, 0.03, 16);
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
  if (!isAnnotationMode) return false;
  
  if (index >= 0 && index < annotations.length) {
    annotations[index].text = text;
    annotations[index].updatedAt = new Date();
    
    if (index === lastAddedAnnotationIndex && text !== "") {
      lastAddedAnnotationIndex = null;
    }
    
    return true;
  }
  return false;
}

function deleteAnnotation(index) {
  if (!isAnnotationMode) return false;
  
  if (index >= 0 && index < annotations.length) {
    scene.remove(annotationMarkers[index]);
    if (annotationMarkers[index].geometry) annotationMarkers[index].geometry.dispose();
    if (annotationMarkers[index].material) annotationMarkers[index].material.dispose();
    
    annotations.splice(index, 1);
    annotationMarkers.splice(index, 1);
    
    if (lastAddedAnnotationIndex === index) {
      lastAddedAnnotationIndex = null;
    } else if (lastAddedAnnotationIndex > index) {
      lastAddedAnnotationIndex--;
    }
    
    annotationMarkers.forEach((marker, i) => {
      marker.userData.annotationIndex = i;
      
      if (marker.children.length > 2) {
        const label = marker.children[2];
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
    
    const offsetDistance = 20;
    
    // 진행 중인 애니메이션이 있으면 취소
    if (currentAnimation) {
      cancelAnimationFrame(currentAnimation);
      currentAnimation = null;
    }
    
    // 컨트롤 비활성화
    controls.enabled = false;
    
    // First attempt - use current direction
    const currentDirection = new THREE.Vector3();
    camera.getWorldDirection(currentDirection);
    
    let newCameraPosition = position.clone().sub(
      currentDirection.multiplyScalar(offsetDistance)
    );
    
    // Function to check if annotation is visible from a camera position
    function isAnnotationVisible(cameraPos) {
      // Create a raycaster from camera position to annotation
      const direction = position.clone().sub(cameraPos).normalize();
      const occlusionRaycaster = new THREE.Raycaster();
      occlusionRaycaster.set(cameraPos, direction);
      
      const distanceToMarker = cameraPos.distanceTo(position);
      const intersects = occlusionRaycaster.intersectObjects(meshes);
      
      // If there's an intersection before reaching the annotation, it's occluded
      return !(intersects.length > 0 && intersects[0].distance < distanceToMarker * 0.95);
    }
    
    // If the annotation would be occluded from the initial position, find a better angle
    if (!isAnnotationVisible(newCameraPosition)) {
      // Try different angles around the annotation
      const angles = [45, 90, 135, 180, 225, 270, 315];
      let bestPosition = null;
      
      // Create a coordinate system centered on the annotation
      const up = new THREE.Vector3(0, 1, 0);
      const right = new THREE.Vector3(1, 0, 0);
      
      // Try positions at different angles around the annotation
      for (const angle of angles) {
        const radians = angle * (Math.PI / 180);
        
        // Create a position at this angle around the annotation
        const rotationMatrix = new THREE.Matrix4().makeRotationAxis(up, radians);
        const testDirection = new THREE.Vector3(0, 0, 1).applyMatrix4(rotationMatrix);
        
        // Also try different elevations
        for (const elevation of [-30, 0, 30]) {
          const elevRad = elevation * (Math.PI / 180);
          const elevMatrix = new THREE.Matrix4().makeRotationAxis(right, elevRad);
          const finalDirection = testDirection.clone().applyMatrix4(elevMatrix).normalize();
          
          // Calculate position at this angle
          const testPosition = position.clone().add(
            finalDirection.multiplyScalar(-offsetDistance)
          );
          
          if (isAnnotationVisible(testPosition)) {
            bestPosition = testPosition;
            break;
          }
        }
        
        if (bestPosition) break;
      }
      
      // If we found a better position, use it
      if (bestPosition) {
        newCameraPosition = bestPosition;
      }
    }
    
    // Animation settings
    const duration = 800;
    const startTime = Date.now();
    const startPosition = camera.position.clone();
    const startTarget = controls.target.clone();
    const endTarget = position.clone();
    
    function animateCamera() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      camera.position.lerpVectors(startPosition, newCameraPosition, easeProgress);
      controls.target.lerpVectors(startTarget, endTarget, easeProgress);
      controls.update();
      
      if (progress < 1) {
        currentAnimation = requestAnimationFrame(animateCamera);
      } else {
        // 애니메이션 종료 시 컨트롤 항상 활성화
        controls.enabled = true;
        currentAnimation = null;
      }
    }
    
    currentAnimation = requestAnimationFrame(animateCamera);
    
    annotationMarkers.forEach((marker, i) => {
      const sphere = marker.children.find(child =>
        child.isMesh && child.geometry.type === 'SphereGeometry'
      );
      
      if (sphere && sphere.material) {
        if (i === index) {
          sphere.material.color.set(0x00FF00);
          sphere.material.opacity = 1.0;
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
    document.body.style.cursor = isAnnotationMode ? 'crosshair' : 'default';
  }
  
  // Only show temp marker in annotation mode
  if (isAnnotationMode && meshes.length > 0) {
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
  
  // Only add new annotations if in annotation mode
  if (isAnnotationMode && meshes.length > 0) {
    const meshIntersects = raycaster.intersectObjects(meshes);
    if (meshIntersects.length > 0) {
      const point = meshIntersects[0].point;
      
      if (lastAddedAnnotationIndex !== null &&
          annotations[lastAddedAnnotationIndex] &&
          annotations[lastAddedAnnotationIndex].text === "") {
        deleteAnnotation(lastAddedAnnotationIndex);
      }
      
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
  
  textureLoader.load('https://raw.githubusercontent.com/HEOJUNFO/blockout/main/textures/B67F6B_4B2E2A_6C3A34_F3DBC6-256px.png', (texture) => {
    matcaps['Clay'] = texture;
    updateMaterials();
    onTextureLoaded();
  }, undefined, (error) => console.error('Texture loading error:', error));
  
  material = new THREE.MeshMatcapMaterial({
    flatShading: false,
    side: THREE.DoubleSide
  });
  
  document.body.style.cursor = 'default';
  
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
        const mesh = processSTLFile(
          arrayBuffer, 
          fileInfo.threeFileRealName || `model_${index}.stl`,
          fileInfo.threeFileNo
        );
        
        if (mesh) {
          mesh.visible = index === 0;
        }
        
        return mesh;
      } catch (error) {
        console.error(`Error loading model from URL ${fileInfo.threeFileUrl}:`, error);
        return null;
      }
    });
    
    await Promise.all(loadPromises);
    
    arrangeMeshes();
    
  } catch (error) {
    console.error('Error loading models from URLs:', error);
  } finally {
    hideLoadingAnimation();
  }
  
  // 모든 모델이 로드되었으므로 반환
  return meshes.length;
}

function setAnnotationCallbacks(selectCallback, addCallback) {
  onAnnotationSelect = selectCallback;
  onAnnotationAdd = addCallback;
  
  // Set annotation mode based on whether callbacks are provided
  isAnnotationMode = !!(selectCallback && addCallback);
  
  // Update cursor
  document.body.style.cursor = isAnnotationMode ? 'crosshair' : 'default';
  
  // Hide temporary marker if annotation mode is disabled
  if (!isAnnotationMode && tempMarker) {
    tempMarker.visible = false;
  }
  
  return isAnnotationMode;
}

function getAnnotations() {
  return [...annotations];
}

export function toggleAnnotationMode() {
  isAnnotationMode = !isAnnotationMode;
  document.body.style.cursor = isAnnotationMode ? 'crosshair' : 'default';
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

export function initViewer(container, modelData, annotationSelectCallback, annotationAddCallback, onModelsLoadedCallback) {
  if (cleanupFunction) {
    cleanupFunction();
    cleanupFunction = null;
  }
  
  cleanupFunction = init();
  
  setAnnotationCallbacks(annotationSelectCallback, annotationAddCallback);
  
  if (modelData && modelData.fileList && modelData.fileList.length > 0) {
    loadModelsFromUrls(modelData.fileList)
      .then(() => {
        // 모델 로드가 완료된 후 콜백 호출
        if (onModelsLoadedCallback && typeof onModelsLoadedCallback === 'function') {
          onModelsLoadedCallback();
        }
      });
  }
  
  return cleanupFunction;
}

export function cleanupViewer() {
  if (currentAnimation) {
    cancelAnimationFrame(currentAnimation);
    currentAnimation = null;
  }
  
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
  focusOnAnnotation,
  setModelTransparency,
  setModelVisibility
};