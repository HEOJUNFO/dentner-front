import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseButton } from '@components/common';
import { useSnack } from '@components/hooks';
import { get3dMemo, post3dMemo } from '@api/Payment';
import * as THREE from 'three';
import MemoListSVG from '../../svg/MemoListSVG';

const ThreeDViewer = ({ onClose, fileList, requestFormNo, threeInfoNo, threeSj }) => {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === 'en' || i18n.language === 'en-US';
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const { showSnackbar, showWarnSnackbar } = useSnack();
  
  // State for responsive design
  const [isMobile, setIsMobile] = useState(false);
  
  // State for annotation management
  const [annotations, setAnnotations] = useState([]);
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);
  const [showAnnotationForm, setShowAnnotationForm] = useState(false);
  const [annotationText, setAnnotationText] = useState('');
  const [currentFileNo, setCurrentFileNo] = useState(null);
  
  // Track the last added annotation index
  const [lastAddedIndex, setLastAddedIndex] = useState(null);
  
  // State for UI controls
  const [collapsedModelList, setCollapsedModelList] = useState(false);
  const [showMemoList, setShowMemoList] = useState(!isMobile); // Show memo list by default only in PC mode
  const [modelTransparency, setModelTransparency] = useState({});
  
  // State for slider drag operations
  const [isDragging, setIsDragging] = useState(null);
  
  // Check for mobile view on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      const newIsMobile = window.innerWidth <= 768;
      setIsMobile(newIsMobile);
      
      // Adjust panel visibility when switching between mobile and PC mode
      if (newIsMobile) {
        // When switching to mobile, close memo list and open model list
        setShowMemoList(false);
        setCollapsedModelList(false);
      } else {
        // When switching to PC, show both panels
        setShowMemoList(true);
      }
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Width for the model list panel - only collapse content, not header
  const modelListContentWidth = collapsedModelList ? '0' : (isMobile ? '100%' : '440px');
  
  // Main effect for initializing the viewer - does NOT depend on dragging state
  useEffect(() => {
    // Initialize transparency values for each model
    if (fileList && fileList.length > 0) {
      const initialTransparency = {};
      fileList.forEach(file => {
        initialTransparency[file.threeFileNo] = 100; // 100% opacity by default
      });
      setModelTransparency(initialTransparency);
    }
    
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
  }, [fileList, requestFormNo, threeInfoNo, threeSj]); // Removed isDragging dependency
  
  // Separate effect for drag operations - this won't reload the viewer when dragging
  useEffect(() => {
    // Add global mouse move and mouse up event listeners for drag operations
    const handleMouseMove = (e) => {
      if (isDragging) {
        const sliderRect = document.getElementById(`slider-track-${isDragging}`).getBoundingClientRect();
        const sliderWidth = sliderRect.width;
        const offsetX = e.clientX - sliderRect.left;
        
        // Calculate percentage (0-100)
        let percentage = Math.round((offsetX / sliderWidth) * 100);
        percentage = Math.max(0, Math.min(100, percentage));
        
        // Update the transparency
        handleTransparencyChange(isDragging, percentage);
      }
    };
    
    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(null);
      }
    };
    
    // Also handle touch events for mobile
    const handleTouchMove = (e) => {
      if (isDragging && e.touches && e.touches[0]) {
        const touch = e.touches[0];
        const sliderRect = document.getElementById(`slider-track-${isDragging}`).getBoundingClientRect();
        const sliderWidth = sliderRect.width;
        const offsetX = touch.clientX - sliderRect.left;
        
        // Calculate percentage (0-100)
        let percentage = Math.round((offsetX / sliderWidth) * 100);
        percentage = Math.max(0, Math.min(100, percentage));
        
        // Update the transparency
        handleTransparencyChange(isDragging, percentage);
        e.preventDefault(); // Prevent scrolling while dragging
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
    
    // Cleanup function for event listeners only
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
      
      // Fetch memos from server
      const response = await get3dMemo(fileNo);
      
      if (response?.data && viewerRef.current) {
        // Filter parent memos (those without a parent)
        const parentMemos = response.data.filter(memo => !memo.threeParentNo);
        
        console.log('Loaded memos from server:', parentMemos);
        
        // Group memos by position
        const positionGroups = {};
        const deletedPositions = new Set();
        
        // First pass: Create position groups and identify deleted positions
        parentMemos.forEach(memo => {
          if (memo.threeMemoPosX !== undefined && 
              memo.threeMemoPosY !== undefined && 
              memo.threeMemoPosZ !== undefined) {
                
            // Create a position key for grouping
            const posKey = `${memo.threeMemoPosX},${memo.threeMemoPosY},${memo.threeMemoPosZ}`;
            
            // Check if this memo is marked as deleted
            if (memo.threeMemo && memo.threeMemo.startsWith('!del!')) {
              // Mark this position as deleted
              deletedPositions.add(posKey);
            }
            
            if (!positionGroups[posKey]) {
              positionGroups[posKey] = [];
            }
            
            positionGroups[posKey].push(memo);
          }
        });
        
        // Get the most recent memo for each position that isn't marked as deleted
        const filteredMemos = [];
        Object.entries(positionGroups).forEach(([posKey, memoGroup]) => {
          // Skip this position group if it's in the deleted set
          if (deletedPositions.has(posKey)) {
            console.log(`Skipping position ${posKey} as it contains a deleted memo`);
            return;
          }
          
          // Sort by update date descending, then by register date descending
          const sortedGroup = memoGroup.sort((a, b) => {
            // If updateDt exists for both, compare them
            if (a.updateDt && b.updateDt) {
              return new Date(b.updateDt) - new Date(a.updateDt);
            }
            // If only one has updateDt, that one is more recent
            else if (a.updateDt) return -1;
            else if (b.updateDt) return 1;
            // If neither has updateDt, compare registerDt
            else return new Date(b.registerDt) - new Date(a.registerDt);
          });

          const nonDeletedMemos = sortedGroup.filter(memo => 
            !(memo.threeMemo && memo.threeMemo.startsWith('!del!'))
          );
          
          if (nonDeletedMemos.length > 0) {
            filteredMemos.push(nonDeletedMemos[0]);
          }
          
        });
        
        console.log('Filtered to most recent non-deleted memos only:', filteredMemos);
        
        // Loop through each filtered memo and add it to the viewer
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
      
      try {
        // If this is a saved annotation with an ID, mark as deleted in server
        if (annotationToDelete.id) {
          // Prepare deletion data - mark with "del" prefix
          const body = {
            threeParentNo: null,
            threeMemo: `!del!${annotationToDelete.text}`, // Add "del" prefix to mark as deleted
            threeMemoPosX: annotationToDelete.position.x,
            threeMemoPosY: annotationToDelete.position.y,
            threeMemoPosZ: annotationToDelete.position.z
          };
          
          // Send to server
          const response = await post3dMemo({
            threeFileNo: currentFileNo,
            body
          });
          
          if (response?.statusCode === 200) {
            showSnackbar(isEnglish 
              ? 'Annotation deleted.' 
              : '메모가 삭제되었습니다.');
          } else {
            showWarnSnackbar(isEnglish ? 'Failed to delete annotation.' : '메모 삭제에 실패했습니다.');
          }
        } else {
          // For unsaved annotations, just notify
          showSnackbar(isEnglish ? 'New annotation canceled.' : '새 메모가 취소되었습니다.');
        }
      } catch (error) {
        console.error('Failed to delete annotation from server:', error);
        showWarnSnackbar(isEnglish ? 'An error occurred while deleting the annotation.' : '메모 삭제 중 오류가 발생했습니다.');
      }
      
      // Delete from viewer UI
      viewerRef.current.deleteAnnotation(selectedAnnotation.index);
      
      // Reset lastAddedIndex if deleting this annotation
      if (lastAddedIndex === selectedAnnotation.index) {
        setLastAddedIndex(null);
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
  
  // Handle transparency change for a model
  const handleTransparencyChange = (fileNo, value) => {
    // Update state without triggering unnecessary re-renders
    setModelTransparency(prev => {
      // Only update if value has changed
      if (prev[fileNo] === value) return prev;
      
      const updated = { ...prev, [fileNo]: value };
      
      // Update model transparency in the viewer
      if (viewerRef.current && viewerRef.current.setModelTransparency) {
        // Call the 3D viewer's function to update transparency without reloading
        viewerRef.current.setModelTransparency(fileNo, value / 100);
      }
      
      return updated;
    });
  };

  // 새로 추가: 슬라이더 트랙 클릭 시 투명도 변경 핸들러
  const handleSliderClick = (e, fileNo) => {
    const sliderRect = e.currentTarget.getBoundingClientRect();
    const sliderWidth = sliderRect.width;
    const offsetX = e.clientX - sliderRect.left;
    let percentage = Math.round((offsetX / sliderWidth) * 100);
    percentage = Math.max(0, Math.min(100, percentage));
    handleTransparencyChange(fileNo, percentage);
  };
  
  // Start dragging the slider thumb
  const startDragging = (fileNo) => {
    setIsDragging(fileNo);
  };
  
  // Toggle model list collapse state
  const toggleModelList = () => {
    setCollapsedModelList(prev => !prev);
    
    // On mobile, ensure only one panel is open at a time
    if (isMobile && showMemoList) {
      setShowMemoList(false);
    }
  };
  
  // Toggle memo list visibility
  const toggleMemoList = () => {
    setShowMemoList(prev => !prev);
    
    // On mobile, ensure only one panel is open at a time
    if (isMobile && !collapsedModelList) {
      setCollapsedModelList(true);
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
  
  // Generate background colors for model list items based on index
  const getBackgroundColor = (index) => {
    const colors = [
      '#e6b8b8', // light pink
      '#f9f5c8', // light yellow
      '#b8e6c9', // light green
      '#b8e6e6', // light cyan
      '#e6b8b8', // light pink
      '#e6c8a9', // light orange
    ];
    return colors[index % colors.length];
  };
  
  // Truncate text with ellipsis
  const truncateText = (text, maxLength = 24) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };
  
  // CSS styles for UI elements
  const styles = {
    // Top bar styles
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
    
    // Button styles
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
    
    // Back arrow for mobile
    backArrow: {
      cursor: 'pointer',
      fontSize: '24px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    // Hamburger menu button for mobile
    menuButton: {
      cursor: 'pointer',
      fontSize: '24px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '5px 10px'
    },
    
    // Model list panel styles - adjusted for mobile
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
    
    // Model list header
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
    
    // Down arrow for header
    headerArrow: {
      marginRight: '10px',
      fontSize: '12px',
      color: 'black',
      transform: collapsedModelList ? 'rotate(-90deg)' : 'rotate(0deg)',
      transition: 'transform 0.3s'
    },
    
    // Model list items container
    modelListContent: {
      display: collapsedModelList ? 'none' : 'block',
      width: isMobile ? '100%' : '350px',
      maxHeight: collapsedModelList ? '0px' : (isMobile ? 'none' : 'calc(100vh - 40px)'),
      overflow: isMobile ? 'visible' : 'hidden',
      transition: 'max-height 0.3s ease-out'
    },
    
    // Model list item
    modelListItem: {
      padding: '10px 15px',
      display: 'flex',
      flexDirection: 'row',
      borderBottom: '1px solid #eee',
      alignItems: 'center',
      height: '50px'
    },
    
    // Checkbox label container
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      width: isMobile ? 'calc(100% - 110px)' : '270px'
    },
    
    // Checkbox style
    checkbox: {
      width: '20px',
      height: '20px',
      marginRight: '10px',
      accentColor: '#4a90e2',
      cursor: 'pointer'
    },
    
    // Label with truncation
    modelLabel: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      fontSize: '14px'
    },
    
    // Slider container
    sliderContainer: {
      position: 'relative',
      width: '100px',
      height: '20px',
      backgroundColor: 'transparent',
    },
    
    // Slider track - white background; onClick 핸들러 추가
    sliderTrack: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: '30px',
      backgroundColor: '#fff'
    },
    
    // Slider thumb - black circle
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
    
    // Memo panel styles - adjusted for mobile
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
    
    // Memo panel header
    memoPanelHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px'
    },
    
    // Close button for memo panel
    memoCloseButton: {
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold'
    },
    
    // Annotation form styles - adjusted for mobile
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
          {/* Mobile back arrow button OR desktop model list toggle */}
          {isMobile ? (
            <div 
              style={styles.backArrow}
              onClick={onClose}
            >
              ←
            </div>
          ) : (
            /* Empty div for desktop to maintain layout */
            <div></div>
          )}
        </div>
        
        <div style={{ display: 'flex' }}>
          {/* Memo list toggle button */}
          <div 
            style={styles.iconButton}
            onClick={toggleMemoList}
          >
            <MemoListSVG width={24} height={24} fill="#000" />
          </div>
          
          {/* Mobile hamburger menu OR desktop close button */}
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
                  defaultChecked={true}
                  onChange={(e) => {
                    if (viewerRef.current && viewerRef.current.setModelVisibility) {
                      viewerRef.current.setModelVisibility(file.threeFileNo, e.target.checked);
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
                {/* 슬라이더 트랙에 클릭 이벤트 추가 */}
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
      
      {annotations.length > 0 && (
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
                  <span style={{ marginRight: '10px',color:'#4b72fe' }}>{annotation.writerName}</span>
                )}
                {new Date(annotation.updatedAt || annotation.createdAt).toLocaleDateString()}
              </div>
            </div>
            ))}
          </div>
        </div>
      )}
      
      {showAnnotationForm && (
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
