import { toast } from 'react-hot-toast';

const useSnack = () => {
  const showSnackbar = (message) => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        }`}
        style={{
          zIndex: 9999,
          width: '20%',
          maxWidth: '672px',
          backgroundColor: '#5C7CFA', // Blue color like in image
          color: 'white',
          padding: '16px 24px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '16px'
        }}
      >
        <span style={{ 
          fontWeight: '500', 
          fontSize: '16px',
           color: 'white'
        }}>
          {message}
        </span>
        <button 
          onClick={() => toast.dismiss(t.id)} 
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            marginLeft: '20px'
          }}
        >
          ✕
        </button>
      </div>
    ), {
      position: 'bottom-center',
      duration: 3000,
    });
  };

  const showWarnSnackbar = (message) => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        }`}
        style={{
          zIndex: 9999,
          width: '20%',
          maxWidth: '672px',
          backgroundColor: '#F74271',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '16px'
        }}
      >
        <span style={{ 
          fontWeight: '500', 
          fontSize: '16px',
          color: 'white'
        }}>
          {message}
        </span>
        <button 
          onClick={() => toast.dismiss(t.id)} 
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            marginLeft: '20px'
          }}
        >
          ✕
        </button>
      </div>
    ), {
      position: 'bottom-center',
      duration: 3000,
    });
  };

  return { showSnackbar, showWarnSnackbar };
};

export default useSnack;