import React from "react";
import { Modal } from "react-responsive-modal";


const EmailVerificationModal = ({ emailVerifyModal, setEmailVerifyModal }) => {
  const onCloseModal = () => setEmailVerifyModal(false);
 
  return (
    <Modal open={emailVerifyModal} onClose={onCloseModal} center>
      <div className="modal-dialog verification-modal react-theme-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Verify Email Address</h5>
          </div>
          <div className="modal-body p-5">
              <p className="text-grey mb-1">Thanks for signing up, Please confirm your email</p>
              <p className="text-grey">we've emaild you a confirmation link. Once  you confirm your email you can continue to login process.</p>
              <div className="modal-action d-flex justify-content-center mt-5">
                <button type="button" className="btn btn-primary px-5">We'hv sent confirmation link. please check your email</button>
              </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EmailVerificationModal;
