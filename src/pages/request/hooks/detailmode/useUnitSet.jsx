import { useEffect } from 'react';

export const useUnitSet = ({ activeIndex, params, setParams }) => {
  // const selectedTooths = () => {
  //   const p = params[activeIndex];

  //   const calcMethod = p.typeList.value[0].calcMethod;
  //   const { upperTooths, upperBridge, lowerTooths, lowerBridge } = p;
  //   if (calcMethod === 'A') {
  //     //개별치식
  //     const utooths = upperTooths.filter((el) => el.selected);
  //     console.log(utooths);
  //     console.log(getBridges(upperBridge));
  //   }
  //   // console.log(p, calcMethod);
  // };

  // const getTooths = (calcMethod, _bridge, tooths) => {
  //   if (calcMethod === 'A') {
  //   }
  // };

  // //브릿지
  // const getBridges = (_bridge) => {
  //   const result = [];
  //   let startBridge = null;

  //   _bridge.forEach((item, index) => {
  //     if (item.selected) {
  //       if (!item.bridgSelected) {
  //         // 개별 항목으로 처리 (bridgSelected가 false인 경우)
  //         item.num.forEach((el) => {
  //           const checkBridge = _bridge.filter((b) => {
  //             if (b.bridgSelected && b.num.includes(el)) return true;
  //             else return false;
  //           });
  //           if (checkBridge.length === 0 && !result.includes(`${el}`)) result.push(`${el}`);
  //         });

  //         startBridge = null; // 기존 그룹 초기화
  //       } else {
  //         if (startBridge === null) {
  //           startBridge = item; // 그룹의 시작점 설정
  //         }
  //         if (index === _bridge.length - 1 || !_bridge[index + 1].bridgSelected) {
  //           // 그룹 종료 조건: 마지막 항목이거나, 다음 항목이 그룹화되지 않은 경우
  //           const endBridge = item;
  //           result.push(`${startBridge.num[0]} ~ ${endBridge.num[1]}`);
  //           startBridge = null; // 그룹 초기화
  //         }
  //       }
  //     }
  //   });

  //   return result;
  // };

  useEffect(() => {
    console.log(params[activeIndex]?.selectedTooths);
  }, [activeIndex, params]);

  return {};
};
