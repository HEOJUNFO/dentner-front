// src/components/STLViewer.js
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, TrackballControls, useProgress, Html } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { useLoader } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';

import './style.css';

function Model({ url, onClick, color, onCreated, opacity }) {
  const geom = useLoader(STLLoader, url);
  const ref = useRef();
  const isTrasparent = opacity != 1;
  return (
    <mesh ref={ref} geometry={geom} opacity={0.5} scale={0.9} onClick={onClick} rotation-x={Math.PI / 2} onCreated={onCreated}>
      <meshStandardMaterial attach="material" color={color || 'orange'} transparent={isTrasparent} opacity={opacity || 1} />
    </mesh>
  );
}

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

const CustomCamera = ({ position, onChange }) => {
  const cameraRef = useRef();
  const pos = position ? [position.x, position.y, position.z] : [0, 0, 0];

  // Adjust camera settings
  return (
    <PerspectiveCamera
      onChanged={(cam) => {
        if (onChange) onChange(cam);
      }}
      ref={cameraRef}
      makeDefault
      position={pos}
      fov={75}
      aspect={window.innerWidth / window.innerHeight}
      near={0.1}
      far={1000}
    />
  );
};

function Box({ position, color }) {
  let pos = [0, 0, 0];
  if (position) pos = [position.x, position.y, position.z];
  // attach="material"
  return (
    <mesh position={pos}>
      <boxGeometry args={[11, 0.1, 11]} />
      <meshStandardMaterial color={color || 'yellow'} />
    </mesh>
  );
}

//define custom style
const CmMemoFlat = ({ position, memo, color, onChanged }) => {
  const text = memo.text; //? memo.text.replaceAll('\n','<br/>'):'';
  return (
    <div
      style={{
        marginTop: 10,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 4,
        flex: 1,
        borderRadius: 4,
        caretColor: 'transparent',
        minHeight: 60,
      }}
    >
      <div>{memo.writerName}</div>
      <div>
        {memo.id}
        <pre> {text}</pre>
      </div>
    </div>
  );
};

const CmMemo = ({ position, memo, color, onMemoAdd, memoChildren, isExpanded, onClose, isEditable }) => {
  const [mainMemo, setMainMemo] = useState(memo);
  const [isEditingAdd, setIsEditingAdd] = useState(memo.isEditing);
  const [expanded, setExpanded] = useState(isExpanded);
  const childMemos = memoChildren;

  const [textValue, setTextValue] = useState('');

  var pos = [position.x, position.y, position.z];
  const txtRef = useRef();
  var markerImg = 'https://cdn3.iconfinder.com/data/icons/zeir-minimalism-1/25/note_notes_file_document_memo-512.png';
  console.log('CmMemo: expanded=', expanded, ',memo:', memo, ',childMemos:', childMemos);
  return (
    <Html position={pos}>
      {!expanded && (
        <div
          style={{
            cursor: 'pointer',
            borderTopRightRadius: 15,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            border: '0px solid black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            caretColor: 'transparent',
            width: '30px',
            height: '30px',
            backgroundColor: color || 'yellow',
          }}
          onClick={() => setExpanded(true)}
        >
          <img src={markerImg} style={{ border: 13, width: 26, height: 26 }} />
        </div>
      )}
      {expanded && (
        <div style={{ borderRadius: 6, width: 200, maxHeight: 300, display: 'flex', flexDirection: 'column', caretColor: 'transparent', padding: 10, backgroundColor: color || 'skyblue' }}>
          {/* 해더 */}
          <div
            style={{
              display: 'flex',
              padding: 4,
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 30,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 600 }}>댓글</div>
            <div
              style={{ marginTop: -4, width: 24, display: 'flex', cursor: 'pointer', justifyContent: 'center', alignItems: 'center', borderRadius: 3, height: 24 }}
              onClick={() => {
                if (isEditingAdd) {
                  if (onClose) onClose();
                } else setExpanded(false);
              }}
            >
              <img style={{ width: 24, height: 24 }} src="https://cdn2.iconfinder.com/data/icons/picons-essentials/71/no-512.png" />
            </div>
          </div>
          <div className="container" style={{ maxHeight: 200 }}>
            {!isEditingAdd && <CmMemoFlat memo={mainMemo} />}

            {/* 댓글 */}
            {childMemos && childMemos.map((smemo, index) => <CmMemoFlat key={'mm-' + index} memo={smemo} />)}
          </div>
          {/* 전송 */}
          {isEditable && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'row', height: 22 }}>
              <input
                type="test"
                ref={txtRef}
                style={{ caretColor: 'black', flex: 0.7, height: 'auto', minHeight: 26, marginTop: 10, backgroundColor: 'lightgrey' }}
                onChange={(e) => setTextValue(e.target.value)}
                defaultValue={''}
              />
              <div
                style={{
                  cursor: 'pointer',
                  backgroundColor: 'lightblue',
                  borderRadius: 4,
                  marginLeft: 4,
                  height: 30,
                  marginTop: 10,
                  flex: 0.3,
                  justifyContent: 'center',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onClick={() => {
                  console.log('send clicked:', textValue, 'isEditingAdd:', isEditingAdd, 'onMemoAdd:', onMemoAdd);
                  var txtVal = txtRef.current.value;
                  txtRef.current.value = '';

                  if (isEditingAdd) {
                    setIsEditingAdd(false);
                    setMainMemo(null);

                    var newMemo = { ...mainMemo, text: txtVal, isExpanded: true, isEditing: false };
                    if (onMemoAdd) onMemoAdd(newMemo);
                  } else {
                    //setChildMemos([...childMemos,{pid:mainMemo.id,text:txtVal}]);
                    if (onMemoAdd) onMemoAdd({ layerId: mainMemo.layerId, pid: mainMemo.id, text: txtVal });
                  }
                }}
              >
                전송
              </div>
            </div>
          )}
        </div>
      )}
    </Html>
  );
};

function midpoint(x1, y1, z1, x2, y2, z2) {
  const xm = (x1 + x2) / 2;
  const ym = (y1 + y2) / 2;
  const zm = (z1 + z2) / 2;

  return { x: xm, y: ym, z: zm };
}

function calculateFocalLength(cameraPosition, planeCenter = { x: 0, y: 0, z: 0 }) {
  const { x: x_c, y: y_c, z: z_c } = cameraPosition;
  const { x: x_p, y: y_p, z: z_p } = planeCenter;

  // Calculate the Euclidean distance between the camera and the plane center
  const focalLength = Math.sqrt(Math.pow(x_c - x_p, 2) + Math.pow(y_c - y_p, 2) + Math.pow(z_c - z_p, 2));

  return focalLength;
}

function projectTo2D(x, y, z, cx, cy, cz) {
  var f = 75; // calculateFocalLength({x:cx,y:cy,z:cz},{x,y,z});
  if (z === 0) {
    z = 0.001; // Prevent division by zero
  }

  // Perspective projection formula
  const xProjected = (f * x) / z;
  const yProjected = (f * y) / z;

  return { x: xProjected, y: yProjected };
}

class EditMemo {
  constructor(props) {
    this.text = '';
    this.position = props.position || [0, 0, 0];
    //this.color='y';
    //this.size=1;
    this.layerId = props.layerId;
    this.isEditing = props.isEditing || false;
    this.isExpanded = props.isExpanded || false;

    this.children = [];
  }
}

export default function STLViewer({ allLayers, layers, onMemoAdd, isEditable }) {
  const allMemos = [];
  layers.forEach((layer) => {
    if (layer.memos) allMemos.push(...layer.memos);
  });
  console.log('STLViewer.allMemos:', allMemos);

  const [memoOn, setMemoOn] = useState(true);
  const memos = allMemos;

  const [memoPosition, setMemoPosition] = useState({ x: 10, y: 10, z: 10 });
  const [editMemo, setEditMemo] = useState(null);

  const controlRef = useRef();
  const canvasRef = useRef();
  const camRef = useRef();

  //add mouse event handler
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('click', (e) => {
        console.log('clicked:', e);
        //if(memoOn)    setMemoOn(false);
      });
    }
  }, [canvasRef]);

  var camPos = { x: 0, y: 0, z: 45 };

  const procAddMemo = (memo) => {
    console.log('procAddMemo:', memo);

    if (onMemoAdd) onMemoAdd(memo);
  };

  return (
    <Canvas ref={canvasRef} style={{ height: '100%', backgroundColor: 'lightgrey' }}>
      <CustomCamera
        ref={camRef}
        position={camPos}
        onChange={(cam) => {
          console.log('camera changed:', cam);
          //camPos=cam.position;
        }}
      />

      <ambientLight intensity={Math.PI / 3} />
      {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI/2} />
    <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI/2} /> */}

      <directionalLight
        position={[10, 10, 55]} // Position of the light
        intensity={1} // Brightness of the light
        // Enable shadow casting
        shadow-mapSize-width={1024} // Shadow quality (width)
        shadow-mapSize-height={1024} // Shadow quality (height)
        shadow-camera-far={50} // Distance shadow can be cast
        shadow-camera-left={-10} // Shadow camera left boundary
        shadow-camera-right={10} // Shadow camera right boundary
        shadow-camera-top={10} // Shadow camera top boundary
        shadow-camera-bottom={-10} // Shadow camera bottom boundary
      />

      <directionalLight
        position={[10, 10, -55]} // Position of the light
        intensity={1} // Brightness of the light
        // Enable shadow casting
        shadow-mapSize-width={1024} // Shadow quality (width)
        shadow-mapSize-height={1024} // Shadow quality (height)
        shadow-camera-far={50} // Distance shadow can be cast
        shadow-camera-left={-10} // Shadow camera left boundary
        shadow-camera-right={10} // Shadow camera right boundary
        shadow-camera-top={10} // Shadow camera top boundary
        shadow-camera-bottom={-10} // Shadow camera bottom boundary
      />

      <React.Suspense fallback={<Loader />}>
        {layers.map((layer, index) => (
          <Model
            key={index}
            url={layer.url}
            color={layer.color}
            opacity={layer.opacity}
            onCreated={({ geometry }) => {
              console.log(geometry);
            }}
            onClick={(e) => {
              console.log('clicked :e.point=', e.point);

              if (layer.memos) {
                var np = { ...e.point };
                console.log('np=', np);
                setMemoPosition(np);
                setEditMemo(new EditMemo({ position: np, layerId: layer.id, isEditing: true, isExpanded: true }));
              }
            }}
          />
        ))}
      </React.Suspense>

      {memoOn && (
        <>
          {memos.map((memo, index) => {
            var pos = { x: memoPosition.x, y: memoPosition.y, z: memoPosition.z };
            if (memo.position) pos = memo.position;

            return (
              <CmMemo
                key={'mm-' + memo.id}
                isEditable={isEditable}
                position={pos}
                isExpanded={memo.isExpanded}
                memo={memo}
                memoChildren={memo.children}
                color={memo.color}
                onMemoAdd={(t) => {
                  console.log('memo add childMemo:', t);
                  procAddMemo(t);
                }}
              />
            );
          })}
          {isEditable && memoOn && editMemo && (
            <CmMemo
              position={editMemo.position}
              memo={editMemo}
              isEditable={isEditable}
              isExpanded={editMemo.isExpanded}
              onClose={() => {
                setEditMemo(null);
              }}
              onMemoAdd={(t) => {
                console.log('memo add New :', t);
                t.isExpanded = true;
                setEditMemo(null);
                procAddMemo(t);
              }}
            />
          )}
        </>
      )}
      {/**
       * 365 degree for y,x axis
       */}
      <TrackballControls rotateSpeed={1.5} staticMoving={true} />
    </Canvas>
  );
}
