import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseButton } from '@components/common';
import { useSnack } from '@components/hooks';
import { get3dMemo, post3dMemo } from '@api/Payment';
import * as THREE from 'three';

const ThreeDViewer = ({ onClose, fileList, requestFormNo, threeInfoNo, threeSj }) => {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === 'en' || i18n.language === 'en-US';
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const { showSnackbar, showWarnSnackbar } = useSnack();
  
  // State for annotation management
  const [annotations, setAnnotations] = useState([]);
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);
  const [showAnnotationForm, setShowAnnotationForm] = useState(false);
  const [annotationText, setAnnotationText] = useState('');
  const [currentFileNo, setCurrentFileNo] = useState(null);
  
  // Track the last added annotation index
  const [lastAddedIndex, setLastAddedIndex] = useState(null);
  
  useEffect(() => {
    // Set model data
    window.threeDViewerData = {
      fileList,
      requestFormNo,
      threeInfoNo,
      threeSj
    };
    
    // Set current file number from the first file in the list
    if (fileList && fileList.length > 0) {
      setCurrentFileNo(fileList[0].threeFileNo);
    }
    
    const loadViewer = async () => {
      try {
        // Dynamically import viewer.js module
        const viewerModule = await import('/src/viewer.js');
        
        // Clean up previous viewer if exists
        if (viewerRef.current && viewerRef.current.cleanupViewer) {
          viewerRef.current.cleanupViewer();
        }
        
        // Initialize new viewer
        if (containerRef.current) {
          viewerRef.current = viewerModule;
          
          // Initialize the viewer with annotation callbacks
          viewerModule.initViewer(
            containerRef.current, 
            window.threeDViewerData,
            handleAnnotationSelect,  // Select callback
            handleAnnotationAdd      // Add callback
          );
        }
      } catch (error) {
        console.error('Failed to load viewer:', error);
        showWarnSnackbar(isEnglish ? 'Failed to load viewer.' : '뷰어 로드에 실패했습니다.');
      }
    };
    
    loadViewer();
    
    // Load existing annotations from the server
    loadAnnotationsFromServer();
    
    // Cleanup function
    return () => {
      if (viewerRef.current && viewerRef.current.cleanupViewer) {
        viewerRef.current.cleanupViewer();
      }
      
      // Clean up global data
      delete window.threeDViewerData;
    };
  }, [fileList, requestFormNo, threeInfoNo, threeSj]);
  
  // Function to load annotations from server
  const loadAnnotationsFromServer = async () => {
    if (!fileList || fileList.length === 0) return;
    
    try {
      const fileNo = fileList[0].threeFileNo;
      if (!fileNo) return;
      
      setCurrentFileNo(fileNo);
      
      // Fetch memos from server
      const response = await get3dMemo(fileNo);
      
      if (response?.data && viewerRef.current) {
        // Filter parent memos (those without a parent)
        const parentMemos = response.data.filter(memo => !memo.threeParentNo);
        
        console.log('Loaded memos from server:', parentMemos);
        
        // Loop through each memo and add it to the viewer
        for (const memo of parentMemos) {
          if (memo.threeMemoPosX !== undefined && 
              memo.threeMemoPosY !== undefined && 
              memo.threeMemoPosZ !== undefined) {
            
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
            }
          }
        }
        
        // Sync annotations from viewer
        syncAnnotations();
      }
    } catch (error) {
      console.error('Failed to load annotations from server:', error);
      showWarnSnackbar(isEnglish ? 'Failed to load annotations.' : '메모 불러오기에 실패했습니다.');
    }
  };
  
  // Synchronize annotations
  const syncAnnotations = () => {
    if (viewerRef.current && viewerRef.current.getAnnotations) {
      const viewerAnnotations = viewerRef.current.getAnnotations();
      setAnnotations(viewerAnnotations);
      return viewerAnnotations;
    }
    return null;
  };
  
  // Handle when annotation is selected in the viewer
  const handleAnnotationSelect = (annotation, index) => {
    setSelectedAnnotation({ annotation, index });
    setAnnotationText(annotation.text);
    setShowAnnotationForm(true);
  };
  
  // Handle when a new annotation is added in the viewer
  const handleAnnotationAdd = async (annotation, index) => {
    // Synchronize annotations list
    const currentAnnotations = syncAnnotations() || [];

    // Update last added index
    setLastAddedIndex(index);
    
    // Select new annotation
    setSelectedAnnotation({ annotation, index });
    setAnnotationText('');
    setShowAnnotationForm(true);
  };
  
  // Save the current annotation text
  const saveAnnotation = async () => {
    if (selectedAnnotation && viewerRef.current && viewerRef.current.updateAnnotation) {
      // Update the annotation in the viewer
      viewerRef.current.updateAnnotation(selectedAnnotation.index, annotationText);
      
      // Reset lastAddedIndex if saving this annotation
      if (lastAddedIndex === selectedAnnotation.index) {
        setLastAddedIndex(null);
      }
      
      try {
        const annotation = selectedAnnotation.annotation;
        
        // Prepare data for server
        const body = {
          threeParentNo: null, // For new top-level annotations
          threeMemo: annotationText,
          threeMemoPosX: annotation.position.x,
          threeMemoPosY: annotation.position.y,
          threeMemoPosZ: annotation.position.z
        };
        
        // Send to server
        const response = await post3dMemo({ 
          threeFileNo: currentFileNo, 
          body 
        });
        
        if (response?.statusCode === 200) {
          // Update annotation with server ID
          if (viewerRef.current.updateAnnotationId) {
            viewerRef.current.updateAnnotationId(selectedAnnotation.index, response.data.threeMemoNo);
          }
          
          showSnackbar(isEnglish ? 'Annotation saved successfully.' : '메모가 저장되었습니다.');
        } else {
          showWarnSnackbar(isEnglish ? 'Failed to save annotation.' : '메모 저장에 실패했습니다.');
        }
      } catch (error) {
        console.error('Failed to save annotation to server:', error);
        showWarnSnackbar(isEnglish ? 'An error occurred while saving the annotation.' : '메모 저장 중 오류가 발생했습니다.');
      }
      
      // Synchronize annotations list
      syncAnnotations();
      
      setShowAnnotationForm(false);
    }
  };
  
  // Delete the selected annotation
  const deleteAnnotation = async () => {
    if (selectedAnnotation && viewerRef.current && viewerRef.current.deleteAnnotation) {
      // Get the annotation data before deleting
      const annotationToDelete = selectedAnnotation.annotation;
      
      // Delete from viewer
      viewerRef.current.deleteAnnotation(selectedAnnotation.index);
      
      // Reset lastAddedIndex if deleting this annotation
      if (lastAddedIndex === selectedAnnotation.index) {
        setLastAddedIndex(null);
      }
      
      try {
        // If this is a saved annotation with an ID, delete from server
        if (annotationToDelete.id) {
          console.warn('Delete API not implemented, annotation only removed from UI');
          showSnackbar(isEnglish 
            ? 'Annotation deleted. (Server deletion not implemented)' 
            : '메모가 삭제되었습니다. (서버 삭제 기능은 구현되지 않았습니다)');
        } else {
          showSnackbar(isEnglish ? 'New annotation canceled.' : '새 메모가 취소되었습니다.');
        }
      } catch (error) {
        console.error('Failed to delete annotation from server:', error);
        showWarnSnackbar(isEnglish ? 'An error occurred while deleting the annotation.' : '메모 삭제 중 오류가 발생했습니다.');
      }
      
      // Synchronize annotations list
      syncAnnotations();
      
      setSelectedAnnotation(null);
      setShowAnnotationForm(false);
    }
  };
  
  // Cancel annotation editing
  const cancelAnnotation = () => {
    // If it's a new annotation with no text, delete it
    if (selectedAnnotation && selectedAnnotation.annotation.text === '' && annotationText === '') {
      deleteAnnotation();
    } else {
      setShowAnnotationForm(false);
      setSelectedAnnotation(null);
    }
  };
  
  // Add event listener to synchronize annotations list on click
  useEffect(() => {
    const handleClickForSync = () => {
      // Add a slight delay to ensure viewer.js processing is complete
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
  }, []);
  
  // CSS styles for annotation UI
  const styles = {
    annotationPanel: {
      position: 'absolute',
      right: '20px',
      top: '70px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
      borderRadius: '5px',
      padding: '15px',
      width: '300px',
      maxHeight: '80vh',
      overflowY: 'auto',
      zIndex: 1000
    },
    annotationForm: {
      position: 'absolute',
      right: '20px',
      bottom: '20px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
      borderRadius: '5px',
      padding: '15px',
      width: '300px',
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
    }
  };
  
  return (
    <div className="fullPop" style={{ display: 'block', width: '100%', position: 'relative' }}>
      <BaseButton 
        label={isEnglish ? 'Close' : '닫기'} 
        className={'btnPClose'} 
        onClick={onClose} 
      />
      
      {/* Annotation List Panel */}
      {annotations.length > 0 && (
        <div style={styles.annotationPanel}>
          <h3>{isEnglish ? 'Annotation List' : '메모 목록'}</h3>
          <div style={styles.annotationList}>
            {annotations.map((annotation, index) => (
            <div 
            key={annotation.id || `temp-${index}`} 
            style={{
              ...styles.annotationItem,
              backgroundColor: selectedAnnotation?.index === index ? '#e0e0e0' : '#f5f5f5'
            }}
            onClick={() => {
              if (viewerRef.current) {
                // First focus the camera on the marker
                if (viewerRef.current.focusOnAnnotation) {
                  viewerRef.current.focusOnAnnotation(index);
                }
                
                // Then call the existing selection handler
                handleAnnotationSelect(annotation, index);
              }
            }}
          >
            <div style={{ fontWeight: 'bold' }}>#{index + 1}</div>
            <div>{annotation.text.substring(0, 50)}{annotation.text.length > 50 ? '...' : ''}</div>
            <div style={{ fontSize: '0.8em', color: '#777' }}>
              {annotation.writerName && (
                <span style={{ marginRight: '10px' }}>{annotation.writerName}</span>
              )}
              {new Date(annotation.updatedAt || annotation.createdAt).toLocaleDateString()}
            </div>
          </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Annotation Form */}
      {showAnnotationForm && (
        <div style={styles.annotationForm}>
          <h3>
            {selectedAnnotation?.annotation.text 
              ? (isEnglish ? 'Edit Annotation' : '메모 수정하기')
              : (isEnglish ? 'Add New Annotation' : '새 메모 추가하기')}
          </h3>
          
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
      
      <div 
        ref={containerRef} 
        style={{ width: '100%', height: '100%', minHeight: '800px' }}
      />
    </div>
  );
};

export default ThreeDViewer;