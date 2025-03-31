import React, { useEffect } from 'react';
import STLViewer from './STLViewer';
import { extend } from '@react-three/fiber';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

extend({ TextGeometry });
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

export class R3DMemo {
  constructor() {
    this.text = '';
    this.position = [0, 0, 0];
    this.color = 'black';
    this.size = 1;
  }
}

export const R3DLayer = ({ style, layer, onClick, onOpacity }) => {
  var st = { display: 'flex', margin: 1, height: 50, paddingLeft: 10, paddingRight: 10, alignItems: 'center', backgroundColor: layer.color || 'lightgrey', ...style };
  var title = layer.title;
  //var op=(layer.opacity)? '투명:'+layer.opacity:'';
  var hasOp = true;
  var topacity = layer.opacity == undefined ? 1.0 : layer.opacity;

  var [opacity, setOpacity] = React.useState(topacity);

  return (
    <div style={{ ...st, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ flex: 1, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, fontWeight: 'bold' }} onClick={onClick}>
        {title}
      </div>
      <div style={{ flex: 0.3, width: 30, alignItems: 'center' }}>
        <input type="checkbox" checked={layer.visible} onChange={onClick} />
      </div>
      {hasOp && (
        <div style={{ width: 100, height: 30 }}>
          <input
            type="range"
            style={{ width: 100, height: 30 }}
            min={0.1}
            max={1}
            step={0.02}
            value={opacity}
            onChange={(event) => {
              setOpacity(event.target.valueAsNumber);
              console.log('opacity:', event.target.valueAsNumber);
              if (onOpacity) onOpacity({ ...layer, opacity: event.target.valueAsNumber });
              //setVolume(event.target.valueAsNumber);
            }}
          />
        </div>
      )}
    </div>
  );
};

export class R3DModel {
  constructor() {
    this.layers = [];
  }
}
//{"x":-18.02542748299516,"y":15.178425131320367,"z":-13.90720953541855
//x":2.2223813607307727,"y":7.927955574634015,"z":2.39496755898201
//"x":-22.187128389808176,"y":14.042216006412874,"z":0.8392564043704812
const FILE_URL = 'http://192.168.29.22:4000';
const layerAll = [
  {
    id: 1,
    title: '치아1',
    url: FILE_URL + '/stl/stl02/stl02_01.stl',
    visible: true,
    writerName: '홍길동1',
    writerId: 'hong',
    createdAt: '2021-10-10',
    memos: [{ layerId: 1, id: 1, text: 'memo 1\ntest sljlks한글', position: { x: -18.02, y: 15.17, z: -13.9 }, writerName: '홍길동1', writerId: 'hong', createdAt: '2021-10-10' }],
    color: 'orange',
  },
  {
    id: 2,
    title: '치아2',
    url: FILE_URL + '/stl/stl02/stl02_02.stl',
    visible: true,
    writerName: '홍길동1',
    writerId: 'hong',
    createdAt: '2021-10-10',
    memos: [{ layerId: 2, id: 2, text: 'memo 2', position: { x: -18.02, y: 25.17, z: -13.9 }, color: 'skyblue', writerName: '홍길동1', writerId: 'hong', createdAt: '2021-10-10' }],
    color: 'lightgreen',
    opacity: 0.5,
  },
  {
    id: 3,
    title: '치아3',
    url: FILE_URL + '/stl/stl02/stl02_03.stl',
    visible: true,
    writerName: '홍길동1',
    writerId: 'hong',
    createdAt: '2021-10-10',
    memos: [
      {
        layerId: 3,
        id: 3,
        text: 'memo 3',
        position: { x: -18.02, y: 25.17, z: -13.9 },
        writerName: '홍길동1',
        writerId: 'hong',
        createdAt: '2021-10-10',
        children: [
          { pid: 3, id: 30, text: 'memo3-111', writerName: '홍길동2', writerId: 'hong2', createdAt: '2021-10-10' },
          { pid: 3, id: 31, text: 'memo3-2', writerName: '홍길동3', writerId: 'hong3', createdAt: '2021-10-10' },
        ],
      },
    ],
    color: 'orange',
  },
  {
    id: 4,
    title: '윗턱',
    url: FILE_URL + '/stl/stl02/stl02_LowerJaw.stl',
    visible: true,
    writerName: '홍길동1',
    writerId: 'hong',
    createdAt: '2021-10-10',
    memos: [{ layerId: 4, id: 4, text: 'memo 4', position: { x: 2.22, y: 7.92, z: 2.394 }, writerName: '홍길동1', writerId: 'hong', createdAt: '2021-10-10' }],
    color: 'darkgrey',
  },
  {
    id: 5,
    title: '아랫턱',
    url: FILE_URL + '/stl/stl02/stl02_UpperJaw.stl',
    visible: true,
    writerName: '홍길동1',
    writerId: 'hong',
    createdAt: '2021-10-10',
    memos: [{ layerId: 5, id: 5, text: 'memo 5', position: { x: -22.18, y: 14.04, z: 0.83 }, writerName: '홍길동1', writerId: 'hong', createdAt: '2021-10-10' }],
    color: 'skyblue',
  },
];

const layerAll2 = [
  {
    title: '2024-10-07_00006-001-LowerJaw.stl',
    url: FILE_URL + '/stl/stl02/stl02_LowerJaw.stl',
    id: 34,
    visible: true,
    memos: [
      {
        layerId: 34,
        id: 112,
        text: '7777',
        position: {
          x: -7.612307673062166,
          y: 34.73531150794332,
          z: -6.233555287076977,
        },
        writerName: '코자이너',
        createdAt: '2024-10-22 16:37:02',
      },
      {
        layerId: 34,
        id: 114,
        text: '87878',
        position: {
          x: -16.316163906880636,
          y: 28.518008895225265,
          z: -5.499270383190734,
        },
        writerName: '코자이너',
        createdAt: '2024-10-22 16:37:09',
      },
    ],
    color: '#F9E4C8',
  },
  {
    title: '2024-10-07_00006-001-UpperJaw.stl',
    url: FILE_URL + '/stl/stl02/stl02_03.stl',
    id: 35,
    visible: true,
    memos: [
      {
        layerId: 35,
        id: 113,
        text: '8887878',
        position: {
          x: 2.159589506212022,
          y: 42.46411235168844,
          z: -0.755131453228482,
        },
        writerName: '코자이너',
        createdAt: '2024-10-22 16:37:06',
      },
    ],
    color: '#FAF0D1',
  },
];

const R3DViewer = (props) => {
  // "requestFormNo": 2,

  var layerOn = props.layerOn;
  var st = {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    minHeight: 700,
    ...props?.style,
  };
  var viewerFlex = layerOn ? 0.8 : 1;
  var [allLayers, setAllLayers] = React.useState([]);
  var isEditable = true;

  if (!Boolean(props.isEditable)) isEditable = false;

  useEffect(() => {
    props?.layerRepo.getLayers().then((r) => {
      var layers = r.data;
      setAllLayers(layers);
    });
  }, []);

  var visLayers = allLayers.filter((layer) => layer.visible);

  return (
    <div style={st}>
      {layerOn && (
        <div style={{ display: 'flex', flex: 1 - viewerFlex, backgroundColor: 'grey', flexDirection: 'column' }}>
          {allLayers &&
            allLayers.map((layer, ix) => (
              <R3DLayer
                key={'layer-' + ix}
                layer={layer}
                onMemoChanged={(memo) => {
                  console.log('memo changed:', memo);
                  layer.memos = memo;
                  var newLayers = layers.map((l) => {
                    if (l.id == layer.id) return layer;
                    return l;
                  });
                  setAllLayers(newLayers);
                }}
                onOpacity={(lay) => {
                  console.log('layer[', lay.id, '] opacity:', lay.opacity);
                  var newLayers = allLayers.map((l) => {
                    if (l.id == lay.id) return lay;
                    return l;
                  });
                  setAllLayers(newLayers);
                }}
                onClick={() => {
                  console.log('layer clicked:', layer);
                  layer.visible = !layer.visible;

                  var newLayers = [...allLayers];
                  setAllLayers(newLayers);
                }}
              />
            ))}
        </div>
      )}
      <div style={{ flex: viewerFlex, backgroundColor: 'black' }}>
        <STLViewer
          allLayers={allLayers}
          layers={visLayers}
          isEditable={isEditable}
          onMemoAdd={async (smemo) => {
            console.log('onMemoAdd : memo=', smemo);
            let memo2 = { ...smemo, writerName: '홍길동', writerId: 'hoho', createdAt: '2021-10-10' };
            let r0 = await props?.layerRepo.addMemo(memo2);
            if (r0.status != 0) return;

            var r1 = await props?.layerRepo.getLayers();
            if (r0.status != 0) return;

            var newLayers = r1.data;

            setAllLayers(newLayers);
            console.log('memo added:', smemo, 'newLayers:', newLayers);
          }}
        />
      </div>
    </div>
  );
};

// class TestRepo {
//   constructor() {
//     this.layers = [...layerAll];
//     this.idCnt = 1000;
//   }

//   async addMemo(memo) {
//     memo.id = this.idCnt++;
//     console.log('repo.addMemo :', memo);

//     var newLayers = this.layers.map((layer) => {
//       if (layer.id == memo.layerId) {
//         if (memo.pid) {
//           var parent = layer.memos.find((m) => m.id == memo.pid);
//           if (parent) {
//             if (!parent.children) parent.children = [];
//             parent.children.push(memo);
//           }
//         } else {
//           layer.memos.push(memo);
//         }
//       }
//       return layer;
//     });

//     this.layers = [...newLayers];

//     return { status: 0, data: memo };
//   }

//   async getLayers() {
//     return { status: 0, data: [...this.layers] };
//   }
// }

// var layerRepo = new TestRepo();

export default R3DViewer;
