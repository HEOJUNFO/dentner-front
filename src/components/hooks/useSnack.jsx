import { useSnackbar } from 'react-simple-snackbar';

const options = {
  position: 'bottom-right',
  style: {
    zIndex: 9999,
    backgroundColor: 'midnightblue',
    border: '2px solid lightgreen',
    color: 'lightblue',
    fontFamily: 'Menlo, monospace',
    fontSize: '20px',
    textAlign: 'center',
  },
  closeStyle: {
    color: 'lightcoral',
    fontSize: '16px',
  },
};

const warningSnackbarOptions = {
  position: 'bottom-center',
  style: {
    backgroundColor: '#F74271',
    color: 'white',
    //fontFamily: 'Menlo, monospace',
    //fontSize: '20px',
    textAlign: 'center',
    //marginBottom: '60px', // Adjust this value to move the snackbar slightly above the bottom of the screen
  },
  closeStyle: {
    color: 'white',
    fontSize: '16px',
  },
};

const useSnack = () => {
  const [openSnackbar, closeSnackbar] = useSnackbar();
  const [openWarnSnackbar, closeWarnSnackbar] = useSnackbar(warningSnackbarOptions);

  const showSnackbar = (message) => {
    openSnackbar(message);
  };

  const showWarnSnackbar = (message) => {
    openWarnSnackbar(message);
  };

  return { showSnackbar, showWarnSnackbar };
};

export default useSnack;
