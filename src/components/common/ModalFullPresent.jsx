import React from 'react';
import ModalPortal from './ModalPortal';

const ModalFullPresent = ( {children} ) => {

    return (
        <ModalPortal>
            <div className='popFDim' >
                {children}
            </div>
        </ModalPortal>
    )
}

export default ModalFullPresent;
