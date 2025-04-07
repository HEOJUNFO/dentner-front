import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseButton } from '@components/common';
import { useSnack } from '@components/hooks';
import { get3dMemo, post3dMemo } from '@api/Payment';
import R3DViewer from '@components/r3dview/R3DViewer';

const ThreeDModal = ({ onClose, fileList, requestFormNo, threeInfoNo, threeSj }) => {
  // let layerAll = [
  //   { title: '치아1', url: FILE_URL + '/stl/stl02/stl02_01.stl', visible: true, memos: [{ text: 'memo 1', position: [0, 0, 0], color: 'red' }], color: 'orange' },
  //   { title: '치아2', url: FILE_URL + '/stl/stl02/stl02_02.stl', visible: true, memos: [{ text: 'memo 2', position: [0, 0, 0], color: 'red' }], color: 'lightgreen', opacity: 0.5 },
  //   { title: '치아3', url: FILE_URL + '/stl/stl02/stl02_03.stl', visible: true, memos: [{ text: 'memo 3' }], color: 'orange' },
  //   { title: '윗턱', url: FILE_URL + '/stl/stl02/stl02_LowerJaw.stl', visible: true, memos: [{ text: 'memo 3' }], color: 'darkgrey' },
  //   { title: '아랫턱', url: FILE_URL + '/stl/stl02/stl02_UpperJaw.stl', visible: true, memos: [{ text: 'memo 3' }], color: 'skyblue' },
  // ];
  const { t } = useTranslation();
  const { showSnackbar, showWarnSnackbar } = useSnack();
  const [layerAll, setLayerAll] = useState([]);
  const [layerRepo, setLayerRepo] = useState(null); // TestRepo 상태로 관리

  const color = [
    '#F9E4C8', // Light Beige (밝은 베이지)
    '#FAF0D1', // Light Linen (밝은 린넨)
    '#FFFFE0', // Light Ivory (밝은 아이보리)
    '#FDE8D0', // Soft Peach (연한 복숭아색)
    '#FFFAF0', // Cream White (크림 화이트)
    '#EDE6DB', // Eggshell (계란껍질색)
    '#D3D3C3', // Light Platinum (밝은 플래티넘)
    '#D8D8D8', // Soft Gainsboro (부드러운 연회색)
    '#F2F2F5', // Light Ghost White (밝은 유령 백색)
    '#F3E5AB', // Pale Goldenrod (연한 황금빛)
  ];

  const fetchMemo = async (threeFileNo) => {
    return await get3dMemo(threeFileNo);
  };
  // memos: [{ layerId: 1, id: 1, text: 'memo 1\ntest sljlks한글', position: { x: -18.02, y: 15.17, z: -13.9 }, writerName: '홍길동1', writerId: 'hong', createdAt: '2021-10-10' }],
  useEffect(() => {
    const fetchLayers = async () => {
      if (fileList && fileList.length > 0) {
        const layers = await Promise.all(
          fileList.map(async (f, idx) => {
            let memos = [];
            const r = await fetchMemo(f?.threeFileNo);
            if (r?.data) {
              const newValue = r?.data
                ?.filter((el) => !el?.threeParentNo)
                ?.map((el) => {
                  const child = r?.data
                    ?.filter((ele) => ele.threeParentNo === el?.threeMemoNo)
                    ?.map((ele) => {
                      return {
                        pid: el?.threeMemoNo,
                        id: ele?.threeMemoNo,
                        text: ele?.threeMemo,
                        writerName: ele?.registerName,
                        writerId: '',
                        createdAt: ele?.registerDt,
                      };
                    });
                  return {
                    layerId: f?.threeFileNo,
                    id: el?.threeMemoNo,
                    text: el?.threeMemo,
                    position: { x: el?.threeMemoPosX, y: el?.threeMemoPosY, z: el?.threeMemoPosZ },
                    children: child,
                    writerName: el?.registerName,
                    createdAt: el?.registerDt,
                  };
                });

              memos = [...newValue];
            }

            return {
              title: f?.threeFileRealName,
              url: f?.threeFileUrl,
              id: f?.threeFileNo,
              visible: true,
              // writerName: '홍길동1',
              // writerId: 'hong',
              // createdAt: '2021-10-10',
              memos: memos,
              color: color[idx],
            };
          })
        );

        setLayerAll(layers);
        if (layers && layers.length > 0) {
          setLayerRepo(new TestRepo(layers));
        }
      }
    };

    fetchLayers();
  }, [fileList]);

  if (layerAll.length === 0) return <></>;

  return (
    <>
      <div className="fullPop" style={{ display: 'block', width: '150' }}>
        <BaseButton label={t('base.close')} className={'btnPClose'} onClick={() => onClose()} />
        {/* <h1 className="pt">STL 파일 업로드</h1> */}
        <div>
          <R3DViewer style={{ height: '100%', minHeight: 700 }} isEditable={true} layerOn={true} layerAll={layerAll} layerRepo={layerRepo} />
        </div>
      </div>
    </>
  );
};

export default ThreeDModal;

class TestRepo {
  constructor(layerAll) {
    this.layers = [...layerAll];
    //this.idCnt = 6;
  }

  async addMemo(memo) {
    const body = {
      threeParentNo: memo?.pid,
      threeMemo: memo?.text,
      threeMemoPosX: memo?.position?.x,
      threeMemoPosY: memo?.position?.y,
      threeMemoPosZ: memo?.position?.z,
    };

    const r = await post3dMemo({ threeFileNo: memo?.layerId, body });

    if (r?.statusCode === 200) {
      console.log(r);
      var newLayers = this.layers.map((layer) => {
        if (layer.id == memo.layerId) {
          console.log('memo.pid', memo.pid);
          if (memo.pid) {
            var parent = layer.memos.find((m) => m.id == memo.pid);

            if (parent) {
              if (!parent.children) parent.children = [];
              const newMemo = {
                pid: memo.pid,
                id: r?.data?.threeMemoNo,
                text: r?.data?.threeMemo,
                writerName: r?.data?.registerName,
                createdAt: r?.data?.registerDt,
              };
              parent.children.push(newMemo);
            }
          } else {
            const newMemo = {
              layerId: layer.id,
              id: r?.data?.threeMemoNo,
              text: r?.data?.threeMemo,
              position: { x: r?.data?.threeMemoPosX, y: r?.data?.threeMemoPosY, z: r?.data?.threeMemoPosZ },
              writerName: r?.data?.registerName,
              createdAt: r?.data?.registerDt,
            };

            layer.memos.push(newMemo);
          }
        }
        return layer;
      });
      console.log('newLayers', newLayers);
      this.layers = [...newLayers];
      return { status: 0, data: memo };
    }
    console.log(r);
    // memo.id = this.idCnt++;
  }

  async getLayers() {
    return { status: 0, data: [...this.layers] };
  }
}
