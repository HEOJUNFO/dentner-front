import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseButton } from '@components/common';
import { useSnack } from '@components/hooks';
import { get3dMemo, post3dMemo } from '@api/Payment';
import * as THREE from 'three';
import MemoListSVG from '../../svg/MemoListSVG';

const ThreeDViewer = ({ onClose, fileList, requestFormNo, threeInfoNo, threeSj, isMemo = true }) => {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === 'en' || i18n.language === 'en-US';
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const { showSnackbar, showWarnSnackbar } = useSnack();
  
  const [isMobile, setIsMobile] = useState(false);
  const [annotations, setAnnotations] = useState([]);
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);
  const [showAnnotationForm, setShowAnnotationForm] = useState(false);
  const [annotationText, setAnnotationText] = useState('');
  const [currentFileNo, setCurrentFileNo] = useState(null);
  const [lastAddedIndex, setLastAddedIndex] = useState(null);
  const [collapsedModelList, setCollapsedModelList] = useState(false);
  const [showMemoList, setShowMemoList] = useState(!isMobile && isMemo);
  const [modelTransparency, setModelTransparency] = useState({});
  const [modelVisibility, setModelVisibility] = useState({});
  const [isDragging, setIsDragging] = useState(null);
  
  useEffect(() => {
    const checkMobile = () => {
      const newIsMobile = window.innerWidth <= 768;
      setIsMobile(newIsMobile);
      if (newIsMobile) {
        setShowMemoList(false);
        setCollapsedModelList(false);
      } else {
        setShowMemoList(isMemo);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMemo]);
  
  const modelListContentWidth = collapsedModelList ? '0' : (isMobile ? '100%' : '440px');
  
  useEffect(() => {
    if (fileList && fileList.length > 0) {
      const initialTransparency = {};
      const initialVisibility = {};
      
      fileList.forEach((file, index) => {
        initialTransparency[file.threeFileNo] = 100;
        initialVisibility[file.threeFileNo] = index === 0; // Only first model is visible
      });
      
      setModelTransparency(initialTransparency);
      setModelVisibility(initialVisibility);
    }
    
    window.threeDViewerData = {
      fileList,
      requestFormNo,
      threeInfoNo,
      threeSj
    };
    
    if (fileList && fileList.length > 0) {
      setCurrentFileNo(fileList[0].threeFileNo);
    }
    
            const loadViewer = async () => {
      try {
        const viewerModule = await import('/src/viewer.js');
        if (viewerRef.current && viewerRef.current.cleanupViewer) {
          viewerRef.current.cleanupViewer();
        }
        if (containerRef.current) {
          viewerRef.current = viewerModule;
          
          // 모델을 먼저 로드한 후 가시성 설정을 위한 콜백 함수 정의
          const onModelsLoaded = () => {
            if (fileList && fileList.length > 0) {
              fileList.forEach((file, index) => {
                if (viewerRef.current && viewerRef.current.setModelVisibility) {
                  const isVisible = index === 0;
                  viewerRef.current.setModelVisibility(file.threeFileNo, isVisible);
                  
                  // Update local state to match
                  setModelVisibility(prev => ({
                    ...prev,
                    [file.threeFileNo]: isVisible
                  }));
                }
              });
            }
          };
          
          // 로드 완료 콜백 함수를 전달
          viewerModule.initViewer(
            containerRef.current, 
            window.threeDViewerData,
            isMemo ? handleAnnotationSelect : null,
            isMemo ? handleAnnotationAdd : null,
            onModelsLoaded // 콜백 추가
          );
        }
      } catch (error) {
        console.error('Failed to load viewer:', error);
        showWarnSnackbar(isEnglish ? 'Failed to load viewer.' : '뷰어 로드에 실패했습니다.');
      }
    };
    
    loadViewer();
    loadAnnotationsFromServer();
    
    return () => {
      if (viewerRef.current && viewerRef.current.cleanupViewer) {
        viewerRef.current.cleanupViewer();
      }
      delete window.threeDViewerData;
    };
  }, [fileList, requestFormNo, threeInfoNo, threeSj, isMemo]);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const sliderRect = document.getElementById(`slider-track-${isDragging}`).getBoundingClientRect();
        const sliderWidth = sliderRect.width;
        const offsetX = e.clientX - sliderRect.left;
        let percentage = Math.round((offsetX / sliderWidth) * 100);
        percentage = Math.max(0, Math.min(100, percentage));
        handleTransparencyChange(isDragging, percentage);
      }
    };
    
    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(null);
      }
    };
    
    const handleTouchMove = (e) => {
      if (isDragging && e.touches && e.touches[0]) {
        const touch = e.touches[0];
        const sliderRect = document.getElementById(`slider-track-${isDragging}`).getBoundingClientRect();
        const sliderWidth = sliderRect.width;
        const offsetX = touch.clientX - sliderRect.left;
        let percentage = Math.round((offsetX / sliderWidth) * 100);
        percentage = Math.max(0, Math.min(100, percentage));
        handleTransparencyChange(isDragging, percentage);
        e.preventDefault();
      }
    };
    
    const handleTouchEnd = () => {
      if (isDragging) {
        setIsDragging(null);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);
  
  const loadAnnotationsFromServer = async () => {
    if (!fileList || fileList.length === 0) return;
    
    try {
      const fileNo = fileList[0].threeFileNo;
      if (!fileNo) return;
      
      setCurrentFileNo(fileNo);
      setAnnotations([]);
      
      if (viewerRef.current && viewerRef.current.clearAllAnnotations) {
        viewerRef.current.clearAllAnnotations();
      } else if (viewerRef.current && viewerRef.current.getAnnotations && viewerRef.current.deleteAnnotation) {
        const viewerAnnotations = viewerRef.current.getAnnotations();
        for (let i = viewerAnnotations.length - 1; i >= 0; i--) {
          viewerRef.current.deleteAnnotation(i);
        }
      }
      
      const response = await get3dMemo(fileNo);
      
      if (response?.data && viewerRef.current) {
        const parentMemos = response.data.filter(memo => !memo.threeParentNo);
        const positionGroups = {};
        const deletedPositions = new Set();
        
        parentMemos.forEach(memo => {
          if (memo.threeMemoPosX !== undefined && 
              memo.threeMemoPosY !== undefined && 
              memo.threeMemoPosZ !== undefined) {
            const posKey = `${memo.threeMemoPosX},${memo.threeMemoPosY},${memo.threeMemoPosZ}`;
            if (memo.threeMemo && memo.threeMemo.startsWith('!del!')) {
              deletedPositions.add(posKey);
            }
            if (!positionGroups[posKey]) {
              positionGroups[posKey] = [];
            }
            positionGroups[posKey].push(memo);
          }
        });
        
        const filteredMemos = [];
        Object.entries(positionGroups).forEach(([posKey, memoGroup]) => {
          if (deletedPositions.has(posKey)) {
            return;
          }
          const sortedGroup = memoGroup.sort((a, b) => {
            if (a.updateDt && b.updateDt) {
              return new Date(b.updateDt) - new Date(a.updateDt);
            } else if (a.updateDt) return -1;
            else if (b.updateDt) return 1;
            else return new Date(b.registerDt) - new Date(a.registerDt);
          });
  
          const nonDeletedMemos = sortedGroup.filter(memo => 
            !(memo.threeMemo && memo.threeMemo.startsWith('!del!'))
          );
          
          if (nonDeletedMemos.length > 0) {
            filteredMemos.push(nonDeletedMemos[0]);
          }
        });
        
        const newAnnotations = [];
        for (const memo of filteredMemos) {
          const position = {
            x: parseFloat(memo.threeMemoPosX),
            y: parseFloat(memo.threeMemoPosY),
            z: parseFloat(memo.threeMemoPosZ)
          };
          
          const annotation = {
            id: memo.threeMemoNo,
            position: position,
            text: memo.threeMemo || '',
            createdAt: memo.registerDt,
            updatedAt: memo.updateDt,
            writerName: memo.registerName
          };
          
          if (viewerRef.current.addExistingAnnotation) {
            viewerRef.current.addExistingAnnotation(annotation);
            newAnnotations.push(annotation);
          }
        }
        
        setAnnotations(newAnnotations);
      }
    } catch (error) {
      console.error('Failed to load annotations from server:', error);
      showWarnSnackbar(isEnglish ? 'Failed to load annotations.' : '메모 불러오기에 실패했습니다.');
    }
  };
  
  const syncAnnotations = () => {
    if (viewerRef.current && viewerRef.current.getAnnotations) {
      const viewerAnnotations = viewerRef.current.getAnnotations();
      setAnnotations(viewerAnnotations);
      return viewerAnnotations;
    }
    return null;
  };
  
  const handleAnnotationSelect = (annotation, index) => {
    if (!isMemo) return;
    
    setSelectedAnnotation({ annotation, index });
    setAnnotationText(annotation.text);
    setShowAnnotationForm(true);
  };
  
  const handleAnnotationAdd = async (annotation, index) => {
    if (!isMemo) return;
    
    const currentAnnotations = syncAnnotations() || [];
    setLastAddedIndex(index);
    setSelectedAnnotation({ annotation, index });
    setAnnotationText('');
    setShowAnnotationForm(true);
  };
  
  const saveAnnotation = async () => {
    if (!isMemo) return;
    
    if (selectedAnnotation && viewerRef.current && viewerRef.current.updateAnnotation) {
      viewerRef.current.updateAnnotation(selectedAnnotation.index, annotationText);
      if (lastAddedIndex === selectedAnnotation.index) {
        setLastAddedIndex(null);
      }
      try {
        const annotation = selectedAnnotation.annotation;
        const body = {
          threeParentNo: null,
          threeMemo: annotationText,
          threeMemoPosX: annotation.position.x,
          threeMemoPosY: annotation.position.y,
          threeMemoPosZ: annotation.position.z
        };
        const response = await post3dMemo({ 
          threeFileNo: currentFileNo, 
          body 
        });
        if (response?.statusCode === 200) {
          if (viewerRef.current.updateAnnotationId) {
            viewerRef.current.updateAnnotationId(selectedAnnotation.index, response.data.threeMemoNo);
          }
          showSnackbar(isEnglish ? 'Annotation saved successfully.' : '메모가 저장되었습니다.');
          await loadAnnotationsFromServer();
        } else {
          showWarnSnackbar(isEnglish ? 'Failed to save annotation.' : '메모 저장에 실패했습니다.');
        }
      } catch (error) {
        console.error('Failed to save annotation to server:', error);
        showWarnSnackbar(isEnglish ? 'An error occurred while saving the annotation.' : '메모 저장 중 오류가 발생했습니다.');
      }
      setShowAnnotationForm(false);
    }
  };

  const deleteAnnotation = async () => {
    if (!isMemo) return;
    
    if (selectedAnnotation && viewerRef.current && viewerRef.current.deleteAnnotation) {
      const annotationToDelete = selectedAnnotation.annotation;
      try {
        if (annotationToDelete.id) {
          const body = {
            threeParentNo: null,
            threeMemo: `!del!${annotationToDelete.text}`,
            threeMemoPosX: annotationToDelete.position.x,
            threeMemoPosY: annotationToDelete.position.y,
            threeMemoPosZ: annotationToDelete.position.z
          };
          const response = await post3dMemo({
            threeFileNo: currentFileNo,
            body
          });
          if (response?.statusCode === 200) {
            showSnackbar(isEnglish ? 'Annotation deleted.' : '메모가 삭제되었습니다.');
          } else {
            showWarnSnackbar(isEnglish ? 'Failed to delete annotation.' : '메모 삭제에 실패했습니다.');
          }
        } else {
          showSnackbar(isEnglish ? 'New annotation canceled.' : '새 메모가 취소되었습니다.');
        }
      } catch (error) {
        console.error('Failed to delete annotation from server:', error);
        showWarnSnackbar(isEnglish ? 'An error occurred while deleting the annotation.' : '메모 삭제 중 오류가 발생했습니다.');
      }
      viewerRef.current.deleteAnnotation(selectedAnnotation.index);
      if (lastAddedIndex === selectedAnnotation.index) {
        setLastAddedIndex(null);
      }
      syncAnnotations();
      setSelectedAnnotation(null);
      setShowAnnotationForm(false);
    }
  };
  
  const cancelAnnotation = () => {
    if (!isMemo) return;
    
    if (selectedAnnotation && selectedAnnotation.annotation.text === '' && annotationText === '') {
      deleteAnnotation();
    } else {
      setShowAnnotationForm(false);
      setSelectedAnnotation(null);
    }
  };
  
  const handleTransparencyChange = (fileNo, value) => {
    setModelTransparency(prev => {
      if (prev[fileNo] === value) return prev;
      const updated = { ...prev, [fileNo]: value };
      if (viewerRef.current && viewerRef.current.setModelTransparency) {
        viewerRef.current.setModelTransparency(fileNo, value / 100);
      }
      return updated;
    });
  };

  const handleSliderClick = (e, fileNo) => {
    const sliderRect = e.currentTarget.getBoundingClientRect();
    const sliderWidth = sliderRect.width;
    const offsetX = e.clientX - sliderRect.left;
    let percentage = Math.round((offsetX / sliderWidth) * 100);
    percentage = Math.max(0, Math.min(100, percentage));
    handleTransparencyChange(fileNo, percentage);
  };
  
  const startDragging = (fileNo) => {
    setIsDragging(fileNo);
  };
  
  const toggleModelList = () => {
    setCollapsedModelList(prev => !prev);
    if (isMobile && showMemoList) {
      setShowMemoList(false);
    }
  };
  
  const toggleMemoList = () => {
    if (!isMemo) return;
    
    setShowMemoList(prev => !prev);
    if (isMobile && !collapsedModelList) {
      setCollapsedModelList(true);
    }
  };
  
  useEffect(() => {
    if (!isMemo) return;
    
    const handleClickForSync = () => {
      setTimeout(syncAnnotations, 10);
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('click', handleClickForSync);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('click', handleClickForSync);
      }
    };
  }, [isMemo]);
  
  const getBackgroundColor = (index) => {
    const colors = [
      '#e6b8b8',
      '#f9f5c8',
      '#b8e6c9',
      '#b8e6e6',
      '#e6b8b8',
      '#e6c8a9',
    ];
    return colors[index % colors.length];
  };
  
  const truncateText = (text, maxLength = 24) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };
  
  const styles = {
    topBar: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '40px',
      backgroundColor: '#ffffff',
      zIndex: 100,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      padding: isMobile ? '0 10px' : '0 40px'
    },
    iconButton: {
      cursor: 'pointer',
      padding: '5px 10px',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 5px',
    },
    backArrow: {
      cursor: 'pointer',
      fontSize: '24px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuButton: {
      cursor: 'pointer',
      fontSize: '24px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '5px 10px'
    },
    modelListPanel: {
      position: 'absolute',
      left: 0,
      top: '40px',
      width: isMobile ? '100%' : '440px',
      backgroundColor: isMobile ? '#fff' : 'transparent',
      zIndex: 90,
      overflowY: 'auto',
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.3s ease-out',
      transform: isMobile && collapsedModelList ? 'translateY(-100%)' : 'translateY(0)',
      boxShadow: isMobile ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
      maxHeight: isMobile ? 'auto' : 'calc(100vh - 40px)'
    },
    modelListHeader: {
      padding: '12px 15px',
      fontWeight: 'bold',
      backgroundColor: '#fff',
      color: 'black',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      width: isMobile ? '100%' : '350px'
    },
    headerArrow: {
      marginRight: '10px',
      fontSize: '12px',
      color: 'black',
      transform: collapsedModelList ? 'rotate(-90deg)' : 'rotate(0deg)',
      transition: 'transform 0.3s'
    },
    modelListContent: {
      display: collapsedModelList ? 'none' : 'block',
      width: isMobile ? '100%' : '350px',
      maxHeight: collapsedModelList ? '0px' : (isMobile ? 'none' : 'calc(100vh - 40px)'),
      overflow: isMobile ? 'visible' : 'hidden',
      transition: 'max-height 0.3s ease-out'
    },
    modelListItem: {
      padding: '10px 15px',
      display: 'flex',
      flexDirection: 'row',
      borderBottom: '1px solid #eee',
      alignItems: 'center',
      height: '50px'
    },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      width: isMobile ? 'calc(100% - 110px)' : '270px'
    },
    checkbox: {
      width: '20px',
      height: '20px',
      marginRight: '10px',
      accentColor: '#4a90e2',
      cursor: 'pointer'
    },
    modelLabel: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      fontSize: '14px'
    },
    sliderContainer: {
      position: 'relative',
      width: '100px',
      height: '20px',
      backgroundColor: 'transparent',
    },
    sliderTrack: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: '30px',
      backgroundColor: '#fff'
    },
    sliderThumb: (value) => ({
        position: 'absolute',
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        backgroundColor: '#333',
        left: `max(0px, calc(${value}% - 16px))`,
        top: '2px',
        cursor: 'pointer',
        zIndex: 2
      }),
    annotationPanel: {
      position: 'absolute',
      right: isMobile ? '0' : '20px',
      top: isMobile ? '40px' : '70px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
      borderRadius: isMobile ? '0' : '5px',
      padding: '15px',
      width: isMobile ? '100%' : '300px',
      maxHeight: isMobile ? 'auto' : '80vh',
      overflowY: 'auto',
      zIndex: 1000,
      transform: isMobile && !showMemoList ? 'translateX(100%)' : 'translateX(0)',
      transition: 'transform 0.3s ease-out',
      display: isMobile ? 'block' : (showMemoList ? 'block' : 'none')
    },
    memoPanelHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px'
    },
    memoCloseButton: {
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold'
    },
    annotationForm: {
      position: 'absolute',
      right: isMobile ? '10px' : '20px',
      bottom: isMobile ? '10px' : '20px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
      borderRadius: '5px',
      padding: '15px',
      width: isMobile ? 'calc(100% - 20px)' : '300px',
      zIndex: 1000
    },
    annotationList: {
      margin: '10px 0',
    },
    annotationItem: {
      padding: '8px',
      margin: '5px 0',
      backgroundColor: '#f5f5f5',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    annotationItemHover: {
      backgroundColor: '#e0e0e0'
    },
    annotationTextarea: {
      width: '100%',
      minHeight: '100px',
      padding: '8px',
      marginBottom: '10px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      resize: 'vertical'
    },
    formButtons: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    saveButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '8px 15px',
      cursor: 'pointer'
    },
    deleteButton: {
      backgroundColor: '#f44336',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '8px 15px',
      cursor: 'pointer'
    },
    cancelButton: {
      backgroundColor: '#9e9e9e',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '8px 15px',
      cursor: 'pointer'
    },
  };
  
  return (
    <div className="fullPop" style={{ display: 'block', width: '100%', position: 'relative' }}>
      <div 
        ref={containerRef} 
        style={{ width: '100%', height: '100%', minHeight: isMobile ? '100vh' : '100vh' }}
      />
      <div style={styles.topBar}>
        <div style={{ display: 'flex' }}>
          {isMobile ? (
            <div 
              style={styles.backArrow}
              onClick={onClose}
            >
              ←
            </div>
          ) : (
            <div></div>
          )}
        </div>
        
        <div style={{ display: 'flex' }}>
          {isMemo && (
            <div 
              style={styles.iconButton}
              onClick={toggleMemoList}
            >
              <MemoListSVG width={24} height={24} fill="#000" />
            </div>
          )}
          
          {isMobile ? (
            <div
              style={styles.menuButton}
              onClick={toggleModelList}
            >
              ☰
            </div>
          ) : (
            <BaseButton 
              label={isEnglish ? 'Close' : '닫기'} 
              className={'btnPClose'} 
              onClick={onClose} 
            />
          )}
        </div>
      </div>
      
      <div style={styles.modelListPanel}>
        <div style={styles.modelListHeader} onClick={toggleModelList}>
          <div style={styles.headerArrow}>▼</div>
          {isEnglish ? 'Scan Data List' : '스캔 데이터 목록'}
        </div>
        
        <div style={styles.modelListContent}>
          {fileList && fileList.map((file, index) => (
            <div 
              key={file.threeFileNo || `file-${index}`} 
              style={{
                ...styles.modelListItem,
                backgroundColor: getBackgroundColor(index)
              }}
            >
              <div style={styles.checkboxContainer}>
                <input 
                  type="checkbox" 
                  id={`model-${file.threeFileNo}`} 
                  checked={modelVisibility[file.threeFileNo] === undefined ? (index === 0) : modelVisibility[file.threeFileNo]}
                  onChange={(e) => {
                    if (viewerRef.current && viewerRef.current.setModelVisibility) {
                      viewerRef.current.setModelVisibility(file.threeFileNo, e.target.checked);
                      setModelVisibility(prev => ({
                        ...prev,
                        [file.threeFileNo]: e.target.checked
                      }));
                    }
                  }}
                  style={styles.checkbox}
                />
                <label 
                  htmlFor={`model-${file.threeFileNo}`}
                  style={styles.modelLabel}
                >
                  {truncateText(`2024-10-10_Dentmer-Analysis_${index + 1}`, isMobile ? 20 : 24)}
                </label>
              </div>
              
              <div 
                style={styles.sliderContainer}
                id={`slider-track-${file.threeFileNo}`}
              >
                <div 
                  style={styles.sliderTrack} 
                  onClick={(e) => handleSliderClick(e, file.threeFileNo)}
                ></div>
                <div 
                  style={styles.sliderThumb(modelTransparency[file.threeFileNo] || 100)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    startDragging(file.threeFileNo);
                  }}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    startDragging(file.threeFileNo);
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {isMemo && annotations.length > 0 && (
        <div style={styles.annotationPanel}>
          <div style={styles.memoPanelHeader}>
            <h3 style={{ margin: 0 }}>{isEnglish ? 'Memo List' : '메모 목록'}</h3>
            <div 
              style={styles.memoCloseButton}
              onClick={toggleMemoList}
            >
              ✕
            </div>
          </div>
          <div style={styles.annotationList}>
            {annotations.map((annotation, index) => (
              <div 
                key={`memo-${annotation.id || index}-${annotation.position.x}-${annotation.position.y}-${annotation.position.z}`}
                style={{
                  ...styles.annotationItem,
                  backgroundColor: selectedAnnotation?.index === index ? '#e0e0e0' : '#f5f5f5'
                }}
                onClick={() => {
                  if (viewerRef.current) {
                    if (viewerRef.current.focusOnAnnotation) {
                      viewerRef.current.focusOnAnnotation(index);
                    }
                    handleAnnotationSelect(annotation, index);
                  }
                }}
              >
                <div style={{ fontWeight: 'bold' }}>#{index + 1}</div>
                <div>{annotation.text.substring(0, 50)}{annotation.text.length > 50 ? '...' : ''}</div>
                <div style={{ fontSize: '0.8em', color: '#777' }}>
                  {annotation.writerName && (
                    <span style={{ marginRight: '10px', color:'#4b72fe' }}>{annotation.writerName}</span>
                  )}
                  {new Date(annotation.updatedAt || annotation.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {isMemo && showAnnotationForm && (
        <div style={styles.annotationForm}>
          <h3>
            {selectedAnnotation?.annotation.text 
              ? (isEnglish ? 'Edit Annotation' : '메모 수정하기')
              : (isEnglish ? 'Add New Annotation' : '새 메모 추가하기')}
          </h3>
          <br/>
          
          <textarea
            style={styles.annotationTextarea}
            value={annotationText}
            onChange={(e) => setAnnotationText(e.target.value)}
            placeholder={isEnglish ? 'Enter your annotation for this point...' : '이 지점에 대한 메모를 입력하세요...'}
          />
          
          <div style={styles.formButtons}>
            <div>
              <button 
                onClick={saveAnnotation}
                style={styles.saveButton}
              >
                {isEnglish ? 'Save' : '저장'}
              </button>
            </div>
            
            <div>
              {selectedAnnotation?.annotation.text && (
                <button 
                  onClick={deleteAnnotation}
                  style={styles.deleteButton}
                >
                  {isEnglish ? 'Delete' : '삭제'}
                </button>
              )}
              
              <button 
                onClick={cancelAnnotation}
                style={{...styles.cancelButton, marginLeft: '5px'}}
              >
                {isEnglish ? 'Cancel' : '취소'}
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default ThreeDViewer;