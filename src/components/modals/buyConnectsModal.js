import React from 'react'
import { Modal } from 'react-responsive-modal';

const BuyConnectsModal = ({showBuyConnectModal,setShowBuyConnectModal}) => {
    const onCloseModal = () => setShowBuyConnectModal(false)
  return (
    <Modal open={showBuyConnectModal} onClose={onCloseModal} center>
        <div className="modal-dialog react-theme-modal">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title">Buy Connects</h5>
                </div>
                <div className="modal-body">
                    <div className='buy-connect-form px-4'>
                        <form className='form-field-group mt-2'>
                            <div className='form-field flex100'>
                                <label>Your available Connects</label>
                                <span>23</span>
                            </div>
                            <div className='form-field flex100'>
                                <label>Select the amount to buy</label>
                                <div className='render-select'>
                                    <select className='form-control'>
                                        <option>10 for $1.5</option>
                                        <option>20 for $3</option>
                                        <option>40 for $6</option>
                                        <option>60 for $9</option>
                                        <option>80 for $12</option>
                                        <option>150 for $22.5</option>
                                    </select>
                                </div>
                            </div>
                            <div className='form-field flex100'>
                                <label>Your account will be charged</label>
                                <span>$1.5</span>
                            </div>
                            <div className='form-field flex100'>
                                <label>Your new connects balance will be</label>
                                <span>33</span>
                            </div>
                            <div className='form-field flex100'>
                                <label>These connects will expire on</label>
                                <span>08/04/2023</span>
                            </div>
                            <div class="form-field mt-5 flex100 d-flex justify-content-center">
                                <button type="button" onClick={onCloseModal} class="btn btn-secondary me-3">Cancel</button>
                                <button type="submit" class="btn btn-primary button-submit">Post Now</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </Modal>
  )
}

export default BuyConnectsModal