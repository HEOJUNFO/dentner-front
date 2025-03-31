import { ReactNode } from 'react';
import ReactDOM from 'react-dom';


function ModalPortal( {children} ) {
  const modalRoot = document.getElementById('modal-root') as HTMLElement;
  return ReactDOM.createPortal(children, modalRoot);
}

export default ModalPortal;