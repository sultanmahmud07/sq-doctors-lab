import React from 'react';

const ConfirmationModal = ({title, message, closeModal, successAction, successButton, modalData}) => {
  return (
    <div>
     

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
      <div className="modal text-center">
        <div className="modal-box">
          <h3 className="font-bold text-2xl text-yellow-400">{title}</h3>
          <p className="py-4">{message}</p>
          <div className='flex justify-end items-end py-4'>
          <button onClick={closeModal} className="btn btn-sm btn-outline btn-success">Cancel</button>
          <label htmlFor="confirmation-modal" onClick={() => successAction(modalData)} className="btn btn-sm btn-outline btn-error ml-4">{successButton}</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;