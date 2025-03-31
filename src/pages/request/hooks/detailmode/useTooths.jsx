import React, { useEffect, useRef, useState } from 'react';
import { useNav } from '@components/hooks';
import { getTeethType } from '@api/Common';
import UserStore from '@store/UserStore';

export const useTooths = ({ activeIndex, params, setParams, onChange }) => {
  //상악
  const [upperTooths, setUpperTooths] = useState([
    { seq: 18, num: 18, selected: false },
    { seq: 17, num: 17, selected: false },
    { seq: 16, num: 16, selected: false },
    { seq: 15, num: 15, selected: false },
    { seq: 14, num: 14, selected: false },
    { seq: 13, num: 13, selected: false },
    { seq: 12, num: 12, selected: false },
    { seq: 11, num: 11, selected: false },
    { seq: 21, num: 21, selected: false },
    { seq: 22, num: 22, selected: false },
    { seq: 23, num: 23, selected: false },
    { seq: 24, num: 24, selected: false },
    { seq: 25, num: 25, selected: false },
    { seq: 26, num: 26, selected: false },
    { seq: 27, num: 27, selected: false },
    { seq: 28, num: 28, selected: false },
  ]);

  //상악 브릿지
  const [upperBridge, setUpperBridge] = useState([
    { seq: 1817, num: [18, 17], selected: false, bridgeName: '18 ~ 17', bridgSelected: false },
    { seq: 1716, num: [17, 16], selected: false, bridgeName: '17 ~ 16', bridgSelected: false },
    { seq: 1615, num: [16, 15], selected: false, bridgeName: '16 ~ 15', bridgSelected: false },
    { seq: 1514, num: [15, 14], selected: false, bridgeName: '15 ~ 14', bridgSelected: false },
    { seq: 1413, num: [14, 13], selected: false, bridgeName: '14 ~ 13', bridgSelected: false },
    { seq: 1312, num: [13, 12], selected: false, bridgeName: '13 ~ 12', bridgSelected: false },
    { seq: 1211, num: [12, 11], selected: false, bridgeName: '12 ~ 11', bridgSelected: false },
    { seq: 1121, num: [11, 21], selected: false, bridgeName: '11 ~ 21', bridgSelected: false },
    { seq: 2122, num: [21, 22], selected: false, bridgeName: '21 ~ 22', bridgSelected: false },
    { seq: 2223, num: [22, 23], selected: false, bridgeName: '22 ~ 23', bridgSelected: false },
    { seq: 2324, num: [23, 24], selected: false, bridgeName: '23 ~ 24', bridgSelected: false },
    { seq: 2425, num: [24, 25], selected: false, bridgeName: '24 ~ 25', bridgSelected: false },
    { seq: 2526, num: [25, 26], selected: false, bridgeName: '25 ~ 26', bridgSelected: false },
    { seq: 2627, num: [26, 27], selected: false, bridgeName: '26 ~ 27', bridgSelected: false },
    { seq: 2728, num: [27, 28], selected: false, bridgeName: '27 ~ 28', bridgSelected: false },
  ]);

  //하악
  const [lowerTooths, setLowerTooths] = useState([
    { seq: 48, num: 48, selected: false },
    { seq: 47, num: 47, selected: false },
    { seq: 46, num: 46, selected: false },
    { seq: 45, num: 45, selected: false },
    { seq: 44, num: 44, selected: false },
    { seq: 43, num: 43, selected: false },
    { seq: 42, num: 42, selected: false },
    { seq: 41, num: 41, selected: false },
    { seq: 31, num: 31, selected: false },
    { seq: 32, num: 32, selected: false },
    { seq: 33, num: 33, selected: false },
    { seq: 34, num: 34, selected: false },
    { seq: 35, num: 35, selected: false },
    { seq: 36, num: 36, selected: false },
    { seq: 37, num: 37, selected: false },
    { seq: 38, num: 38, selected: false },
  ]);

  //하악 브릿지
  const [lowerBridge, setLowerBridge] = useState([
    { seq: 4847, num: [48, 47], selected: false, bridgeName: '48 ~ 47', bridgSelected: false },
    { seq: 4746, num: [47, 46], selected: false, bridgeName: '47 ~ 46', bridgSelected: false },
    { seq: 4645, num: [46, 45], selected: false, bridgeName: '46 ~ 45', bridgSelected: false },
    { seq: 4544, num: [45, 44], selected: false, bridgeName: '45 ~ 44', bridgSelected: false },
    { seq: 4443, num: [44, 43], selected: false, bridgeName: '44 ~ 43', bridgSelected: false },
    { seq: 4342, num: [43, 42], selected: false, bridgeName: '43 ~ 42', bridgSelected: false },
    { seq: 4241, num: [42, 41], selected: false, bridgeName: '42 ~ 41', bridgSelected: false },
    { seq: 4131, num: [41, 31], selected: false, bridgeName: '41 ~ 31', bridgSelected: false },
    { seq: 3132, num: [31, 32], selected: false, bridgeName: '31 ~ 32', bridgSelected: false },
    { seq: 3233, num: [32, 33], selected: false, bridgeName: '32 ~ 33', bridgSelected: false },
    { seq: 3334, num: [33, 34], selected: false, bridgeName: '33 ~ 34', bridgSelected: false },
    { seq: 3435, num: [34, 35], selected: false, bridgeName: '34 ~ 35', bridgSelected: false },
    { seq: 3536, num: [35, 36], selected: false, bridgeName: '35 ~ 36', bridgSelected: false },
    { seq: 3637, num: [36, 37], selected: false, bridgeName: '36 ~ 37', bridgSelected: false },
    { seq: 3738, num: [37, 38], selected: false, bridgeName: '37 ~ 38', bridgSelected: false },
  ]);

  const [utooths, setUTooths] = useState([]);
  const [ltooths, setLTooths] = useState([]);

  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const [upperIndex, setUpperIndex] = useState();
  const [lowerIndex, setLowerIndex] = useState();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Shift') {
        setIsShiftPressed(true);
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'Shift') {
        setIsShiftPressed(false);
      }
    };

    // 전역적으로 키보드 이벤트 리스너 추가
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  //상악
  //치아선택
  const handelUpperClick = (el, index) => {
    setUpperTooths((prev) => {
      const updatedValue = [...prev];
      updatedValue[index] = { ...prev[index], selected: !prev[index].selected };

      if (!prev[index].selected) {
        setUpperIndex(el.num);
      } else {
        setUpperIndex(null);
      }

      if (isShiftPressed && upperIndex !== null) {
        const s1 = upperTooths.findIndex((t) => t.num === el.num);
        const s2 = upperTooths.findIndex((t) => t.num === upperIndex);

        const start = Math.min(s1, s2) + 1;
        const end = Math.max(s1, s2) - 1;

        for (let i = start; i <= end; i++) {
          updatedValue[i] = { ...updatedValue[i], selected: true };
        }
      }

      //선택처리 -> useEffect 안에서 처리
      // const _tooths = !prev[index].selected
      //   ? [...utooths, { seq: prev[index].seq, num: prev[index].num, visible: true, type: 'single', tag: 'A', title: `${prev[index].num}` }]
      //   : utooths.filter((el) => el.num !== prev[index].num);
      // setUTooths(_tooths);

      return [...updatedValue];
    });
  };

  //치아브릿지선택
  const handleUpperBridgeClick = (el, index) => {
    if (!el.selected) return;

    setUpperBridge((prev) => {
      const updatedValue = [...prev];
      updatedValue[index] = { ...prev[index], bridgSelected: !prev[index].bridgSelected };

      return [...updatedValue];
    });
  };

  // 상악 브릿지 처리
  useEffect(() => {
    const bridge = upperBridge.map((el) => {
      const tooths = upperTooths.filter((tooth) => el.num.includes(tooth.num)).find((tooth) => !tooth.selected);
      if (!tooths) {
        return {
          ...el,
          selected: true,
        };
      } else {
        return {
          ...el,
          selected: false,
          bridgSelected: false,
        };
      }
    });
    setUpperBridge(bridge);

    //선택처리
    const _tooths = upperTooths
      .filter((tooth) => tooth.selected)
      .map((tooth) => {
        return {
          seq: tooth.seq,
          num: tooth.num,
          visible: true,
          type: 'single',
          tag: 'A',
          title: `${tooth.num}`,
        };
      });
    setUTooths(_tooths);
  }, [upperTooths]);

  //하악
  //치아선택
  const handelLowerClick = (el, index) => {
    setLowerTooths((prev) => {
      const updatedValue = [...prev];
      updatedValue[index] = { ...prev[index], selected: !prev[index].selected };

      if (!prev[index].selected) {
        setLowerIndex(el.num);
      } else {
        setLowerIndex(null);
      }

      if (isShiftPressed && lowerIndex !== null) {
        const s1 = lowerTooths.findIndex((t) => t.num === el.num);
        const s2 = lowerTooths.findIndex((t) => t.num === lowerIndex);

        const start = Math.min(s1, s2) + 1;
        const end = Math.max(s1, s2) - 1;

        for (let i = start; i <= end; i++) {
          updatedValue[i] = { ...updatedValue[i], selected: true };
        }
      }

      //선택처리
      // const _tooths = !prev[index].selected
      //   ? [...ltooths, { seq: prev[index].seq, num: prev[index].num, visible: true, type: 'single', tag: 'A', title: `${prev[index].num}` }]
      //   : ltooths.filter((el) => el.num !== prev[index].num);
      // setLTooths(_tooths);

      return [...updatedValue];
    });
  };

  //치아브릿지선택
  const handleLowerBridgeClick = (el, index) => {
    if (!el.selected) return;

    setLowerBridge((prev) => {
      const updatedValue = [...prev];
      updatedValue[index] = { ...prev[index], bridgSelected: !prev[index].bridgSelected };

      return [...updatedValue];
    });
  };

  // 하악 브릿지 처리
  useEffect(() => {
    const bridge = lowerBridge.map((el) => {
      const tooths = lowerTooths.filter((tooth) => el.num.includes(tooth.num)).find((tooth) => !tooth.selected);
      if (!tooths) {
        return {
          ...el,
          selected: true,
        };
      } else {
        return {
          ...el,
          selected: false,
          bridgSelected: false,
        };
      }
    });
    // console.log(bridge);
    setLowerBridge(bridge);

    //선택처리
    const _tooths = lowerTooths
      .filter((tooth) => tooth.selected)
      .map((tooth) => {
        return {
          seq: tooth.seq,
          num: tooth.num,
          visible: true,
          type: 'single',
          tag: 'A',
          title: `${tooth.num}`,
        };
      });
    setLTooths(_tooths);
    // if (onChange) onChange(activeIndex, 'upperTooths', upperTooths);
  }, [lowerTooths]);

  useEffect(() => {
    // console.log('params[activeIndex]', params[activeIndex]);
    if (params[activeIndex].upperTooths.length > 0) {
      setUpperTooths(params[activeIndex].upperTooths);
    }

    if (params[activeIndex].upperBridge.length > 0) {
      setUpperBridge(params[activeIndex].upperBridge);
    }

    if (params[activeIndex].lowerTooths.length > 0) {
      setLowerTooths(params[activeIndex].lowerTooths);
    }

    if (params[activeIndex].lowerBridge.length > 0) {
      setLowerBridge(params[activeIndex].lowerBridge);
    }
  }, [activeIndex]);

  //브릿지
  const getBridges = (_type, _bridge, _tooths) => {
    // console.log(_bridge, _tooths);
    // calcMethod 개수산정방법 A 개별 B 묶음
    const calcMethod = params[activeIndex].typeList.value[0]?.calcMethod;
    const result = [];

    let startBridge = null;
    let bridgeArr = []; // 그룹처리
    let __tooths = [..._tooths];

    _bridge.forEach((item, index) => {
      if (item.selected) {
        //개별건이 포함이 안되는 경우 처리함
        item.num.forEach((el) => {
          __tooths = __tooths.map((t) => {
            if (t.num === el) {
              return {
                ...t,
                visible: false,
              };
            } else {
              return { ...t };
            }
          });
        });

        if (calcMethod === 'B') {
          // calcMethod가 'B'인 경우, 브릿지 설정과 상관없이 연결 처리
          if (startBridge === null) {
            startBridge = item;
            bridgeArr.push(...item.num);
          }

          const isLastBridge = index === _bridge.length - 1 || !_bridge[index + 1].selected;
          if (isLastBridge) {
            const endBridge = item;
            result.push(`${startBridge.num[0]} ~ ${endBridge.num[endBridge.num.length - 1]}`);
            bridgeArr.push(...item.num);

            const tag = _type === 'lower' ? 'D' : 'C';
            __tooths = [
              ...__tooths,
              {
                seq: item.seq,
                visible: true,
                type: 'group',
                tag: tag,
                title: `${startBridge.num[0]} ~ ${endBridge.num[endBridge.num.length - 1]}`,
                groupNum: [...new Set(bridgeArr)],
              },
            ];

            startBridge = null;
            bridgeArr = [];
          } else {
            bridgeArr.push(...item.num);
          }
        } else {
          if (!item.bridgSelected) {
            // 개별 항목으로 처리 (bridgSelected가 false인 경우)
            item.num.forEach((el) => {
              const checkBridge = _bridge.filter((b) => {
                if (b.bridgSelected && b.num.includes(el)) return true;
                else return false;
              });
              if (checkBridge.length === 0 && !result.includes(`${el}`)) {
                result.push(`${el}`);
                __tooths = [...__tooths, { seq: item.seq, visible: true, type: 'group', tag: 'A', title: `${el}`, groupNum: [el] }]; // A:개별, B:브릿지, C:상악묶음, D:하악묶음
              }
            });

            startBridge = null; // 기존 그룹 초기화
          } else {
            if (startBridge === null) {
              startBridge = item; // 그룹의 시작점 설정
              bridgeArr.push(...item.num);
            }
            if (index === _bridge.length - 1 || !_bridge[index + 1].bridgSelected) {
              // 그룹 종료 조건: 마지막 항목이거나, 다음 항목이 그룹화되지 않은 경우
              const endBridge = item;
              result.push(`${startBridge.num[0]} ~ ${endBridge.num[1]}`);
              bridgeArr.push(...item.num);

              __tooths = [...__tooths, { seq: item.seq, visible: true, type: 'group', tag: 'B', title: `${startBridge.num[0]} ~ ${endBridge.num[1]}`, groupNum: [...new Set(bridgeArr)] }]; // A:개별, B:브릿지, C:상악묶음, D:하악묶음

              startBridge = null; // 그룹 초기화
              bridgeArr = []; // 그룹 초기화
            } else {
              bridgeArr.push(...item.num);
            }
          }
        }
      }
    });

    // return result;
    return __tooths;
  };

  useEffect(() => {
    const selectedTooths = getBridges('upper', upperBridge, utooths);
    if (onChange) onChange(activeIndex, 'upper', upperTooths, upperBridge, selectedTooths);
  }, [upperBridge]);

  // useEffect(() => {
  //   //시간될때 체크해보기
  //   if (onChange) onChange(activeIndex, 'upper', upperTooths, upperBridge);
  // }, [upperTooths, upperBridge]);

  useEffect(() => {
    //시간될때 체크해보기
    const selectedTooths = getBridges('lower', lowerBridge, ltooths);
    if (onChange) onChange(activeIndex, 'lower', lowerTooths, lowerBridge, selectedTooths);
  }, [lowerBridge]);
  // }, [lowerTooths, lowerBridge]);

  return {
    upperTooths,
    upperBridge,
    lowerTooths,
    lowerBridge,
    setUpperTooths,
    setUpperBridge,
    setLowerTooths,
    setLowerBridge,
    handelUpperClick,
    handleUpperBridgeClick,
    handelLowerClick,
    handleLowerBridgeClick,
  };
};
