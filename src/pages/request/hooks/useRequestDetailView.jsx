import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNav, useSnack } from '@components/hooks';
import ModalStore from '@store/ModalStore';
import { getTeethType, getCommonCode } from '@api/Common';
import {postRequestDetail, postRequestOften,  putRequestDetail, getRequestJsonView} from '@api/Request';
import { useTranslation} from 'react-i18next';
import useWindowSize from '../../../components/hooks/useWindowSize';

export const useRequestDetailView = () => {
  const isMobile = useWindowSize();
  const { t, i18n } = useTranslation();
  const { actions } = ModalStore();

  const { handleNav, state } = useNav();
  const { showSnackbar, showWarnSnackbar } = useSnack();

  const [mode, setMode] = useState('write');
  const [apiResponse, setApiResponse] = useState(); //수정인 경우 받아온 데이터

  const maxFile = 10;
  const dc = '의뢰에 대한 상세설명을 입력해주세요 (최대 1,300자)\n\n' + '[상세 내용 작성예시]\n' + 'Implant Scan body library 등 작성';
  let edc = 'Please enter a detailed description of the request (up to 1,300 characters)\n\n' + '[Example of writing details]\n' + 'Create implant scan body library, etc';

  const pontic = [
    { className: 'radioSet d1', value: 'A', id: 'saddle', label: 'Saddle pontic' },
    { className: 'radioSet d2', value: 'B', id: 'ridge', label: 'Ridge lap pontic' },
    {
      className: ' radioSet d3',
      value: 'C',
      id: 'modified',
      label: (
        <>
          Modified ridge
          <br />
          lap pontic
        </>
      ),
    },
    { className: 'radioSet d4', value: 'D', id: 'ovate', label: 'Ovate pontic' },
    { className: 'radioSet d5', value: 'E', id: 'conical', label: 'Conical pontic' },
    { className: 'radioSet d6', value: 'F', id: 'spheroidal', label: 'Spheroidal pontic' },
  ];

  const [valueSe, setValueSe] = useState([]);

  const values = [
    { title: 'Cement gap', id: 'cementGapValue' },
    { title: 'Extra cement gap', id: 'extraGapValue' },
    { title: 'Occlusal distance', id: 'occlusalDistanceValue' },
    { title: 'Approximal distance', id: 'approximalDistanceValue' },
    { title: 'Height for minimal gap', id: 'heightMinimalValue' },
  ];

  const toothsValue = {
    teethType: undefined,
    selectedUpperTooths: [],
    selectedLowerTooths: [],
    upperTooths: [
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
    ],
    upperBridge: [
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
    ],
    lowerTooths: [
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
    ],
    lowerBridge: [
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
    ],
  };

  const [isNumValue, setNumValue] = useState(false);

  const [teethTypeCode, setTeethTypeCode] = useState([]);
  const [millingTypeCode, setMillingTypeCode] = useState([]);

  const [keyTooths, setKeyTooths] = useState(0); // 임시key 사용안함 추후 삭제
  const toothsRef = useRef();

  const [activeIndex, setActiveIndex] = useState(0); // 탭 index
  const [files, setFiles] = useState([]);
  const [delFiles, setDelFiles] = useState([]); // 삭제된 파일

  // 파일 중복 제거 함수 추가
  const addUniqueFiles = (newFiles) => {
    if (!newFiles || newFiles.length === 0) return [];
    
    const uniqueFiles = [];
    const fileNameMap = {};
    
    // 기존 파일의 이름을 맵에 추가
    files.forEach(file => {
      const name = file.fileName;
      if (!fileNameMap[name]) {
        fileNameMap[name] = true;
        uniqueFiles.push(file);
      }
    });
    
    // 새 파일 중 기존에 없는 파일만 추가
    newFiles.forEach(file => {
      const name = file.fileName || file.name;
      if (!fileNameMap[name]) {
        fileNameMap[name] = true;
        uniqueFiles.push(file);
      }
    });
    
    return uniqueFiles;
  };
  
  // 파일 업로드 핸들러 추가
  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files).map(file => ({
      file,
      fileName: file.name,
      fileSize: file.size,
      type: 'local'
    }));
    
    // 중복 제거 후 파일 설정
    setFiles(addUniqueFiles([...files, ...newFiles]));
  };

  const [agree, setAgree] = useState({
    isConfirm: { value: false, type: 'boolean', isRequired: true, error: '', check: 1, success: 0, checkMessage: '필수항목 동의 후 저장이 가능합니다.' },
    isTemp: { value: true, type: 'boolean', isRequired: true, error: '', check: 1, success: 1, checkMessage: '필수항목 동의 후 저장이 가능합니다.' },
  });
  const [params, setParams] = useState([
    {
      name: 'a',
      isOn: false,
      uuidKey: uuidv4(),
      active: true,
      requestNumber: { value: '', isRequired: true, error: '', check: 0, success: 0, maxLength: 20, placeholder: '의뢰번호를 입력하세요. (숫자/기호 최대 20자)' },
      requestProcessNo: { value: '', isRequired: false, error: '', check: 0, success: 0, placeholder: '가공방법을 선택하세요.' },
      requestProcessEtcName: { value: '', isRequired: false, error: '', check: 0, success: 0 },
      implantType: { value: '', isRequired: false, error: '', check: 0, success: 0, maxLength: 50, placeholder: '임플란트 종류를 입력하세요.' },
      requestPonticSe: { value: '', isRequired: false, error: '', check: 0, success: 0 },
      valueSj: { value: '', isRequired: false, error: '', check: 0, success: 0, maxLength: 50, placeholder: '수치값의 제목을 입력해주세요.' },
      valueSe: { value: '', isRequired: false, error: '', check: 0, success: 0 },
      cementGapValue: { value: '', isRequired: false, error: '', check: 0, success: 0, maxLength: 4, placeholder: '0.00' },
      extraGapValue: { value: '', isRequired: false, error: '', check: 0, success: 0, maxLength: 4, placeholder: '0.00' },
      occlusalDistanceValue: { value: '', isRequired: false, error: '', check: 0, success: 0, maxLength: 4, placeholder: '0.00' },
      approximalDistanceValue: { value: '', isRequired: false, error: '', check: 0, success: 0, maxLength: 4, placeholder: '0.00' },
      heightMinimalValue: { value: '', isRequired: false, error: '', check: 0, success: 0, maxLength: 4, placeholder: '0.00' },
      requestDc: { value: '', isRequired: false, error: '', check: 0, success: 0, placeholder: dc, maxLength: 1300, emptyMessage: '상세설명을 입력하세요.' },
      typeList: { value: [], type: 'array', isRequired: true, error: '', check: 0, success: 0, placeholder: '보철종류를 선택하세요.' },
      teethType: undefined,
      selectedUpperTooths: [],
      selectedLowerTooths: [],
      upperTooths: [
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
      ],
      upperBridge: [
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
      ],
      lowerTooths: [
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
      ],
      lowerBridge: [
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
      ],
      interestYn: { value: 'N', isRequired: false, error: '', check: 0, success: 0 },
    },
  ]);

  const add = () => {
    return {
      name: '',
      isOn: false,
      uuidKey: uuidv4(),
      active: false,
      requestProcessNo: { value: '', isRequired: false, error: '', check: 0, success: 0, placeholder: t('version2_4.text23') },
      requestProcessEtcName: { value: '', isRequired: false, error: '', check: 0, success: 0 },
      implantType: { value: '', isRequired: false, error: '', check: 0, success: 0, maxLength: 50, placeholder: t('version2_4.text117') },
      requestPonticSe: { value: '', isRequired: false, error: '', check: 0, success: 0 },
      valueSj: { value: '', isRequired: false, error: '', check: 0, success: 0, maxLength: 50, placeholder: t('version2_4.text118') },
      valueSe: { value: '', isRequired: false, error: '', check: 0, success: 0 },
      cementGapValue: { value: '', isRequired: false, error: '', check: 0, success: 0, maxLength: 4, placeholder: '0.00' },
      extraGapValue: { value: '', isRequired: false, error: '', check: 0, success: 0, maxLength: 4, placeholder: '0.00' },
      occlusalDistanceValue: { value: '', isRequired: false, error: '', check: 0, success: 0, maxLength: 4, placeholder: '0.00' },
      approximalDistanceValue: { value: '', isRequired: false, error: '', check: 0, success: 0, maxLength: 4, placeholder: '0.00' },
      heightMinimalValue: { value: '', isRequired: false, error: '', check: 0, success: 0, maxLength: 4, placeholder: '0.00' },
      requestDc: { value: '', isRequired: false, error: '', check: 0, success: 0, placeholder: i18n.language === 'ko' ? dc : edc, maxLength: 1300, emptyMessage: t('version2_4.text24') },
      typeList: { value: [], type: 'array', isRequired: true, error: '', check: 0, success: 0, placeholder: t('version2_4.text73') },
      interestYn: { value: 'N', isRequired: false, error: '', check: 0, success: 0 },
      ...toothsValue,
    };
  };

  useEffect(() => {
    setAgree((prev) => {
      const isConfirm = prev.isConfirm;
      isConfirm['checkMessage'] = t('version2_4.text21');
      isConfirm['error'] = '';
      const isTemp = prev.isTemp;
      isTemp['checkMessage'] = t('version2_4.text21');
      isTemp['error'] = '';

      return { ...prev, isConfirm, isTemp };
    });

    setParams((prev) => {
      const v = [...prev];
      const newValue = v.map((el, idx) => {
        const requestNumber = el.requestNumber;
        if (idx === 0) {
          requestNumber['placeholder'] = t('version2_4.text22');
          requestNumber['error'] = '';
        }

        const requestProcessNo = el.requestProcessNo;
        requestProcessNo['placeholder'] = t('version2_4.text23');
        requestProcessNo['error'] = '';

        const implantType = el.implantType;
        implantType['placeholder'] = t('version2_4.text117');
        implantType['error'] = '';

        const valueSj = el.valueSj;
        valueSj['placeholder'] = t('version2_4.text118');
        valueSj['error'] = '';

        const requestDc = el.requestDc;
        requestDc['placeholder'] = i18n.language === 'ko' ? dc : edc;
        requestDc['emptyMessage'] = t('version2_4.text24');
        requestDc['error'] = '';

        const typeList = el.typeList;
        typeList['placeholder'] = t('version2_4.text73');
        typeList['error'] = '';

        return {
          ...el,
          requestNumber,
          requestProcessNo,
          implantType,
          valueSj,
          requestDc,
          typeList,
        };
      });
      return newValue;
    });

    setValueSe([
      { title: t('base.input_manually'), id: 'direct', value: 'A' },
      { title: t('version2_4.text119'), id: 'designer', value: 'B' },
    ]);
  }, [i18n.language]);

  const handleChange = (name, value, success = 0, error = '') => {
    setParams((prevParams) => {
      const updatedValue = [...prevParams];
      updatedValue[activeIndex] = { ...prevParams[activeIndex], [name]: { ...prevParams[activeIndex][name], value, success, error } };

      if (name === 'valueSe') {
        if (value === 'A') {
          setNumValue(true);
        } else {
          setNumValue(false);
        }
      }

      return [...updatedValue];
    });
  };

  //치아선택
  const handleToothsChange = (idx, type, tooths, bridge, selectedTooths) => {
    setParams((prevParams) => {
      const updatedValue = [...prevParams];
      if (type === 'upper') {
        updatedValue[activeIndex] = { ...prevParams[activeIndex], upperTooths: tooths, upperBridge: bridge, selectedUpperTooths: selectedTooths };
      } else {
        updatedValue[activeIndex] = { ...prevParams[activeIndex], lowerTooths: tooths, lowerBridge: bridge, selectedLowerTooths: selectedTooths };
      }
      //개수산정방법 A:개별 B:묶음
      const calcMethod = params[activeIndex].typeList.value[0]?.calcMethod;

      if (!calcMethod) {
        // showWarnSnackbar('보철종류 선택해주세요.');
        showWarnSnackbar(t('version2_4.text120'));
      } else {
        let totalCnt = 0;

        const { lowerTooths, upperTooths } = updatedValue[activeIndex];

        const lcnt = lowerTooths?.filter((el) => el.selected).length;
        const ucnt = upperTooths?.filter((el) => el.selected).length;
        if (calcMethod === 'A') {
          totalCnt = ucnt + lcnt;
        } else if (calcMethod === 'B') {
          totalCnt = (ucnt > 0 ? 1 : 0) + (lcnt > 0 ? 1 : 0);
        }

        //의뢰서당 1개만 선택할 수 있기때문에 0으로 고정함
        const updatedTypeCount = { ...updatedValue[activeIndex].typeList.value[0], typeCount: totalCnt };
        const updatedTypeList = { ...updatedValue[activeIndex].typeList, value: [updatedTypeCount] };

        updatedValue[activeIndex] = { ...updatedValue[activeIndex], typeList: updatedTypeList };
      }

      return [...updatedValue];
    });
  };

  //치식 선택 취소
  const handleToothsRemove = (type, el) => {
    // ref 로 처리해서 컴포넌트에서 처리해서 다시 데이터 받아오도록 처리함
    if (toothsRef.current) {
      if (type === 'upper') {
        let upperTooths = params[activeIndex].upperTooths;
        if (el?.type === 'group') {
          upperTooths = params[activeIndex].upperTooths.map((_tooth) => {
            if (el.groupNum.includes(_tooth.num)) {
              return {
                ..._tooth,
                selected: false,
              };
            }
            return {
              ..._tooth,
            };
          });
        } else {
          upperTooths = params[activeIndex].upperTooths.map((_tooth) => {
            if (el.num === _tooth.num) {
              return {
                ..._tooth,
                selected: false,
              };
            }
            return {
              ..._tooth,
            };
          });
        }

        toothsRef.current.setUpperTooths(upperTooths);
      } else {
        let lowerTooths = params[activeIndex].lowerTooths;
        if (el?.type === 'group') {
          lowerTooths = params[activeIndex].lowerTooths.map((_tooth) => {
            if (el.groupNum.includes(_tooth.num)) {
              return {
                ..._tooth,
                selected: false,
              };
            }
            return {
              ..._tooth,
            };
          });
        } else {
          lowerTooths = params[activeIndex].lowerTooths.map((_tooth) => {
            if (el.num === _tooth.num) {
              return {
                ..._tooth,
                selected: false,
              };
            }
            return {
              ..._tooth,
            };
          });
        }

        toothsRef.current.setLowerTooths(lowerTooths);
      }
    }
  };

  // 토글 보기
  const handleToggle = () => {
    setParams((prev) => {
      return prev.map((param, paramIdx) => {
        if (paramIdx === activeIndex) {
          return { ...param, isOn: !param.isOn };
        } else {
          return param;
        }
      });
    });
  };

  const handleCheck = (e) => {
    const { id, checked } = e.target;

    setAgree((prev) => ({
      ...prev,
      [id]: { ...prev[id], value: checked, success: checked ? 1 : 0 },
    }));
  };

  //의뢰서추가
  const handleReqTabAdd = () => {
    // const name = ['a', 'b', 'c', 'd', 'e', 'f'];
    setParams((prev) => [...prev, { ...add() }]);
  };

  //의뢰서삭제
  const handleReqTabRemove = (index) => {
    // TODO 처리필요
    if (activeIndex === index) {
      setActiveIndex((prev) => prev - 1);
    }

    const r = params
      .map((el, idx) => {
        if (idx === index - 1) {
          return {
            ...el,
            active: true,
          };
        } else if (idx === index) {
          return {
            ...el,
            active: false,
            status: 'D',
          };
        }
        return el;
      })
      .sort((a, b) => {
        if (a.status === 'D' && b.status !== 'D') return 1;
        if (a.status !== 'D' && b.status === 'D') return -1;
        return 0;
      })
      .filter((el) => {
        if (el.status === 'D' && !el.requestDocNo) return false;
        else return true;
      });

    setParams(r);
  };

  //의뢰서탭변경
  const handleReqTabClick = (index) => {
    const r = params.map((el, idx) => {
      if (idx !== index) {
        return {
          ...el,
          active: false,
        };
      } else {
        return {
          ...el,
          active: true,
        };
      }
    });

    setParams(r);
    setActiveIndex(index);

    if (params[index]?.valueSe?.value === 'A') setNumValue(true);
    else setNumValue(false);
  };

  //보철종류추가
  const handleAddTeethType = (p, upper, middle, lower, check) => {
    // console.log(p);
    //p 데이터 그대로 추가해서 보철종류 탭 살려야함
    const { dept, code, lowerCode, middleCode, upperCode } = p;

    let v = {};
    if (dept === 'code') {
      const tempName = lowerCode.direct ? lowerCode.name + '(' + lowerCode.direct + ')' : lowerCode.name;

      const name = upperCode.name + (middleCode.name ? ' > ' + middleCode.name : '') + (tempName ? ' > ' + tempName : '') + ' > ' + code.name.join(' / ');
      v = {
        requestTypeValue: p[dept].value.join(','),
        typeCount: '',
        requestTypeName: name,
        requestMiddleValue: middleCode.value,
        calcMethod: upperCode.calcMethod,
      };
    } else {
      const name = upperCode.name + (middleCode.name ? ' > ' + middleCode.name : '') + (lowerCode.name ? ' > ' + lowerCode.name : '');

      v = {
        requestTypeValue: p[dept].value,
        typeCount: '',
        requestTypeName: name,
        requestMiddleValue: middleCode.value,
        calcMethod: upperCode.calcMethod,
      };
    }

    setParams((prevParams) => {
      const updatedValue = [...prevParams];
      updatedValue[activeIndex] = {
        ...prevParams[activeIndex],
        teethType: p,
        teethUpperCode: upper,
        teethMiddleCode: middle,
        teethLowerCode: lower,
        teethCheckCode: check,
        typeList: { ...updatedValue[activeIndex].typeList, value: [...updatedValue[activeIndex].typeList.value, v], success: 1, error: '' },
      };
      return [...updatedValue];
    });
  };

  //보철종류삭제
  const handleRemoveType = (idx) => {
    console.log(activeIndex , idx)
    setParams((prevParams) => {
      const updatedValue = [...prevParams];
      const updatedTypeListValue = [...updatedValue[activeIndex].typeList.value];
      updatedTypeListValue.splice(idx, 1);

      updatedValue[activeIndex] = {
        ...prevParams[activeIndex],
        typeList: { ...updatedValue[activeIndex].typeList, value: updatedTypeListValue, success: 1, error: '' },
        ...toothsValue, //보철종류 삭제시 선택 치아 초기화
      };
      return [...updatedValue];
    });
  };

  //가공방법
  const handleChangeMillingType = (e) => {
    if (isMobile) {
      if (e.codeEditYn === 'Y') {
        handleChange('requestProcessNo', e.codeNo, 0);
      } else {
        handleChange('requestProcessNo', e.codeNo, 1);
      }
    } else {
      if (e.target.dataset.edit === 'Y') {
        handleChange('requestProcessNo', e.target.value, 0);
      } else {
        handleChange('requestProcessNo', e.target.value, 1);
        handleChange('requestProcessEtcName', '');
      }
    }
  };

  //자주쓰는말 저장
  const handleOftenSubmit = async () => {
    if (!params[activeIndex].requestDc.value) {
      // showWarnSnackbar('상세설명 내용을 입력하세요.');
      showWarnSnackbar(t('version2_4.text26'));
      return;
    }
    const r = await postRequestOften({ oftenCn: params[activeIndex].requestDc.value });
    if (Boolean(Number(r.data))) {
      // showSnackbar('등록했습니다.');
      showSnackbar(t('version2_4.text121'));
    }
  };

  // 공통코드 조회
  const fetchCommonCode = async (pathValue) => {
    const r = await getCommonCode(pathValue, i18n.language);
    const { data, statusCode, message } = r;

    if (data) {
      setMillingTypeCode(data);
    }
  };

  // 보철종류 조회
  const fetchTeethTypeCode = async () => {
    const r = await getTeethType(i18n.language);
    const { data, statusCode, message } = r;

    if (data) {
      setTeethTypeCode(data);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const [commonCodeResult, teethTypeCodeResult] = await Promise.all([fetchCommonCode('766'), fetchTeethTypeCode()]);

        if (state?.requestDocGroupNo && state?.requestFormNo) {
          fetchData(state?.requestDocGroupNo,state?.requestFormNo);
        }

        if (state?.requestDc) {

          setParams((prevParams) => {
            const updatedValue = [...state?.params];
            const act = state?.params.findIndex((el) => el.active);
            setActiveIndex(act);
            updatedValue[act] = { ...updatedValue[act], ['requestDc']: { ...updatedValue[act]['requestDc'], value: state?.requestDc, success: 0, error: '' } };
            return [...updatedValue];
          });
        }

        if (state?.valueSj) {
          setParams((prevParams) => {
            const updatedValue = [...state?.params];
            const act = state?.params.findIndex((el) => el.active);
            setActiveIndex(act);
            setNumValue(true);
            updatedValue[act] = {
              ...updatedValue[act],
              ['valueSe']: { ...updatedValue[act]['valueSe'], value: 'A', success: 0, error: '' },
              ['valueSj']: { ...updatedValue[act]['valueSj'], value: state?.valueSj, success: 0, error: '' },
              ['cementGapValue']: { ...updatedValue[act]['cementGapValue'], value: state?.cementGapValue, success: 0, error: '' },
              ['extraGapValue']: { ...updatedValue[act]['extraGapValue'], value: state?.extraGapValue, success: 0, error: '' },
              ['occlusalDistanceValue']: { ...updatedValue[act]['occlusalDistanceValue'], value: state?.occlusalDistanceValue, success: 0, error: '' },
              ['approximalDistanceValue']: { ...updatedValue[act]['approximalDistanceValue'], value: state?.approximalDistanceValue, success: 0, error: '' },
              ['heightMinimalValue']: { ...updatedValue[act]['heightMinimalValue'], value: state?.approximalDistanceValue, success: 0, error: '' },
              ['isOn']: true,
            };
            return [...updatedValue];
          });
          handleToggle();
        }
      } catch (error) {
        setError(e);
      }
    };

    init();
  }, [state, i18n.language]);

  // 상세 데이터 조회 (파일 중복 제거 로직으로 수정)
  const fetchData = async (requestDocGroupNo, requestFormNo) => {
    const r = await getRequestJsonView(requestDocGroupNo, requestFormNo);
    const dt = r.data;

    const p = JSON.parse(dt.requestJsonDc);
    const activeIdx = p.findIndex((el) => el.active);

    const json = JSON.parse(dt.requestJsonDc);
    const j = json
      .filter((el) => el.status !== 'D')
      .map((el) => {
        const requestDocNo = dt.keyList.find((key) => key.requestUuidKey === el.uuidKey)?.requestDocNo;
        return {
          ...el,
          status: 'U',
          requestDocNo,
        };
      });

    // 서버에서 가져온 파일 처리
    const serverFiles = dt?.fileList?.map((el) => {
      return {
        fileName: el.fileRealName,
        fileSize: el.fileSize,
        type: 'server',
        fileNo: el.fileNo,
        fileUrl: el.fileUrl,
      };
    });
    
    // 중복 제거 로직을 적용하여 파일 설정
    setFiles(addUniqueFiles(serverFiles || []));

    setApiResponse(dt);
    setParams(j);
    setActiveIndex(activeIdx);

    setMode('modify');
    // 9.3 추가
    handleChange('valueSe', j[activeIdx].valueSe.value, 1);
  };

  const convertData = (item) => {
    const typeList = item.typeList.value.map((el) => {
      const selectedTooths = [...item.selectedLowerTooths, ...item.selectedUpperTooths];
      const dentalList = selectedTooths
        ?.filter((t) => t.visible)
        ?.map((t) => {
          return {
            requestDentalSe: t.tag,
            requestDentalValue: t.title,
          };
        });

      return {
        requestTypeValue: el.requestTypeValue,
        typeCount: el.typeCount,
        dentalList: dentalList || [], // A:개별, B:브릿지, C:상악묶음, D:하악묶음
        ...el,
      };
    });

    const status = item?.status;
    const requestDocNo = item?.requestDocNo;
    return {
      status,
      requestDocNo,
      requestUuidKey: item.uuidKey,
      requestProcessNo: item.requestProcessNo.value, //가공방법
      requestProcessEtcName: item.requestProcessEtcName.value, //가공방법기타
      requestDc: item.requestDc.value, //상세설명
      requestPonticSe: item.requestPonticSe.value, //Pontic 디자인 값 A B C D E F
      implantType: item.implantType.value, //임플란트종류 입력
      valueSe: item.valueSe.value, //수치값 사용여부 A 직접 B 디자이너 수치값 사용
      valueSj: item.valueSj.value, //수치값 제목
      cementGapValue: item.cementGapValue.value, //수치값
      extraGapValue: item.extraGapValue.value,
      occlusalDistanceValue: item.occlusalDistanceValue.value,
      approximalDistanceValue: item.approximalDistanceValue.value,
      heightMinimalValue: item.heightMinimalValue.value,
      typeDetail: typeList?.length > 0 ? typeList[0] : {},
      interestYn: item.interestYn.value,
    };
  };

  const handleValidChange = (name, index, error) => {
    let success = 0;
    if (!error) {
      success = 1;
    }
    setParams((prev) => {
      return prev.map((param, paramIdx) => {
        if (paramIdx === index) {
          return { ...param, [name]: { ...param[name], error, success } };
        } else {
          return param;
        }
      });
    });
  };

  const fileProgress = (p) => {
    actions.setReceived(p);
  };

  // 저장
  const handleSubmit = async () => {
    let errorMsg = '';
    const p = [...params];
    let inProgress = true;

    const formData = new FormData();

    p.forEach((innerObject, index) => {
      for (const p_key in innerObject) {
        if (innerObject[p_key]?.error) {
          inProgress = false;
        }

        if (innerObject[p_key]?.check === 1 && innerObject[p_key].success !== 1) {
          inProgress = false;
          if (!errorMsg) errorMsg = innerObject[p_key].checkMessage;
        }

        if (innerObject[p_key]?.isRequired) {
          if (innerObject[p_key]?.type === 'array') {
            if (innerObject[p_key]?.value.length === 0) {
              inProgress = false;
              handleValidChange(p_key, index, innerObject[p_key].emptyMessage || innerObject[p_key].placeholder);
            }

            for (const k in innerObject[p_key].value) {
              if (innerObject[p_key].value[k].typeCount === '') {
                handleTypeCountChange(k, { ...innerObject[p_key].value[k], error: '1' });

                inProgress = false;
              }
            }
          } else {
            if (innerObject[p_key].value === '') {
              inProgress = false;
              if (innerObject[p_key].placeholder || innerObject[p_key].emptyMessage) {
                handleValidChange(p_key, index, innerObject[p_key].emptyMessage || innerObject[p_key].placeholder);
              }
            }
          }
        }

        if (p_key === 'typeList') {
          // formData.append(p_key, JSON.stringify(innerObject[p_key].value));
        } else {
          // formData.append(p_key, innerObject[p_key]?.value);
        }
      }
    });

    if (!inProgress) {
      // if (errorMsg)
      // showWarnSnackbar('의뢰서 필수항목을 확인해주세요.');
      showWarnSnackbar(t('version2_4.text28'));
      return;
    }

    if (files.length === 0) {
      inProgress = false;
    }

    if (files.length === 0) {
      // showWarnSnackbar('첨부파일을 올려주세요.');
      showWarnSnackbar(t('version2_3.text111'));
      return;
    }

    if (!agree.isConfirm.value || !agree.isTemp.value) {
      showWarnSnackbar(t('version2_4.text21'));
      return;
    }

    files.forEach((f) => {
      formData.append('files', f.file);
    });

    //9.2 삭제 파일 추가
    if (delFiles.length > 0) {
      formData.append('fileDel', delFiles.join(','));
    }

    const docList = params.map((p) => convertData(p));

    formData.append('requestNumber', p[0].requestNumber.value);
    formData.append('docList', JSON.stringify(docList));
    formData.append('saveAt', 'N');
    formData.append('files', files);
    formData.append('requestJsonDc', JSON.stringify(p));

    actions.setLoading(true);

    try {
      if (mode === 'modify') {
        //console.log(params);
        //putRequestDetail
        if (apiResponse?.requestDocGroupNo) {
          const r = await putRequestDetail({ requestDocGroupNo: apiResponse.requestDocGroupNo, formData, fileProgress });
          if (r.data) {
            // showSnackbar('의뢰서 저장 완료');
            showSnackbar(t('version2_4.text31'));
            handleNav('/request/end', { requestDocGroupNo: r.data, requestMode: 'detail' });
          }
        }
      }
      if (mode === 'write') {
        const r = await postRequestDetail(formData, fileProgress);

        if (r.data) {
          // showSnackbar('의뢰서 저장 완료');
          showSnackbar(t('version2_4.text31'));
          handleNav('/request/end', { requestDocGroupNo: r.data, requestMode: 'detail' });
        }
      }
    } catch (e) {
      // showWarnSnackbar('네트워크 오류입니다.');
      showWarnSnackbar(t('version2_1.text86'));
    } finally {
      actions.setLoading(false);
    }
  };

  // 임시저장 -> 임시저장의경우 체크할필요없이 그대로 저장함
  const handleSubmitDraft = async (e) => {
    const p = [...params];

    const formData = new FormData();

    for (const key in p) {
      // 체크
    }
    const docList = params.map((p) => convertData(p));

    formData.append('requestNumber', p[0].requestNumber.value);
    
    // 파일 중복 제거 후 추가
    const uniqueFiles = addUniqueFiles(files);
    uniqueFiles.forEach((f) => {
      formData.append('files', f.file);
    });

    if (delFiles.length > 0) formData.append('fileDel', delFiles.join(','));

    formData.append('docList', JSON.stringify(docList));
    formData.append('saveAt', 'Y');
    formData.append('requestJsonDc', JSON.stringify(p));

    actions.setLoading(true);
    try {
      if (mode === 'modify') {
        if (apiResponse?.requestDocGroupNo) {
          const r = await putRequestDetail({ requestDocGroupNo: apiResponse.requestDocGroupNo, formData, fileProgress });
          if (r.data) {
            // showSnackbar('의뢰서 임시저장 완료');
            showSnackbar(t('version2_4.text32'));
            handleNav(`/request/view/doc/${r.data}`);
            // handleNav(`/request/basket`, { type: 'detailmode' });
          }
        }
      }
      if (mode === 'write') {
        const r = await postRequestDetail(formData, fileProgress);

        if (r.data) {
          // showSnackbar('의뢰서 임시저장 완료');
          showSnackbar(t('version2_4.text32'));
          handleNav(`/request/view/doc/${r.data}`);
          // handleNav(`/request/basket`, { type: 'detailmode' });
        }
      }
    } catch (e) {
      // showWarnSnackbar('네트워크 오류입니다.');
      showWarnSnackbar(t('version2_1.text86'));
    } finally {
      actions.setLoading(false);
    }
  };

  return {
    pontic,
    values,
    valueSe,
    agree,
    params,
    setParams,
    activeIndex,
    maxFile,
    files,
    setFiles,
    delFiles,
    setDelFiles,
    handleToggle,
    handleCheck,
    handleChange,
    handleReqTabAdd,
    handleReqTabRemove,
    handleReqTabClick,
    handleToothsChange,
    handleToothsRemove,
    isNumValue,
    teethTypeCode,
    millingTypeCode,
    handleAddTeethType,
    handleRemoveType,
    handleOftenSubmit,
    handleChangeMillingType,
    handleSubmit,
    handleSubmitDraft,
    toothsRef,
    fetchData,
    handleFileUpload,   // 새로 추가된 파일 업로드 핸들러
    addUniqueFiles,     // 파일 중복 제거 함수 
  };
};