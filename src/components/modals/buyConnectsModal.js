import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import { postPaymentdetails } from "../../services/paytemService";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
  BraintreePayPalButtons,
} from "@paypal/react-paypal-js";
import toast from "toastr";

const style = { layout: "horizontal" };

const ButtonWrapper = ({
  currency,
  showSpinner,
  amount,
  onCloseModal,
  dataConnects,
}) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(async function (check) {
            const {
              create_time,
              status,
              id,
              intent,
              payer: {
                email_address,
                payer_id,
                name: { given_name },
                phone: {
                  phone_number: { national_number },
                },
              },
              purchase_units,
            } = check;

            let data_payload = {
              subscription_Name: dataConnects.sub_name,
              buyConnects: String(dataConnects.buy_connects),
              transaction_Id: id,
              intent: intent,
              payer_Email_Address: email_address,
              payer_Name: given_name,
              payer_Id: payer_id,
              currency_Code: purchase_units[0]?.amount?.currency_code,
              amount: purchase_units[0]?.amount?.value,
              transaction_Time: create_time,
              payer_Phoneno: national_number,
              status: status,
            };
            const res = await postPaymentdetails(data_payload);
            if (res.status == 200) {
              toast.success("Payment Successfull");
              setTimeout(() => {
                window.location.reload();
              }, [1000]);
              const response = res.data.data;
              if (status == "COMPLETED") {
                onCloseModal();
              }
            } else {
              toast.error("Something went wrong");
            }
          });
        }}
        onError={(err) => {
          console.error("PayPal Checkout onError", err);
        }}
        onCancel={() => {
          // Display cancel message, modal or redirect user to cancel page or back to cart
          console.log("order Canceled");
        }}
      />
    </>
  );
};

const BuyConnectsModal = ({
  showBuyConnectModal,
  setShowBuyConnectModal,
  connects,
}) => {
  const onCloseModal = () => setShowBuyConnectModal(false);
  const [data, setData] = useState({
    available_connects: 0,
    buy_connects: 0,
    connect_amount: 0,
    sub_name: "",
  });
  let OptionsData = [
    {
      connects: 0,
      price: 0,
      value: "Select",
    },
    {
      connects: 20,
      price: 10,
      value: "10$ for 20 connects",
    },
    {
      connects: 40,
      price: 18,
      value: "18$ for 40 connects",
    },
  ];
  const [err, setErr] = useState([]);

  const Validation = () => {
    const error = {};
    let isValid = true;
    if (
      data?.buy_connects == 0 &&
      data?.connect_amount == 0 &&
      data?.sub_name == "Select"
    ) {
      isValid = false;
      error["connects"] = "Please select connects to buy";
    } else {
      error = {};
      isValid = true;
    }
    setErr(error);
    return isValid;
  };

  useEffect(() => {
    setData({
      ...data,
      available_connects: connects,
      buy_connects: OptionsData[0].connects,
      connect_amount: OptionsData[0].price,
      sub_name: OptionsData[0].value,
    });
  }, [showBuyConnectModal, connects]);

  const HandleSelect = (e) => {
    let getAmount = null;
    let getSub = null;

    OptionsData?.map((w) => {
      if (e.target.value == w.connects) {
        getAmount = w.price;
        getSub = w.value;
      }
    });

    setData({
      ...data,
      buy_connects: e.target.value,
      connect_amount: getAmount,
      available_connects: Number(connects) + Number(e.target.value),
      sub_name: getSub,
    });
  };
  return (
    <Modal open={showBuyConnectModal} onClose={onCloseModal} center>
      <div className="modal-dialog react-theme-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Buy Connects</h5>
          </div>
          <div className="modal-body">
            <div className="buy-connect-form px-4">
              <form className="form-field-group mt-2">
                <div className="form-field flex100">
                  <label>Your available Connects</label>
                  <span>{data.available_connects}</span>
                </div>

                <div className="form-field flex100">
                  <label>Select the amount to buy</label>
                  <div className="render-select">
                    <select
                      className="form-control"
                      value={data.buy_connects}
                      onChange={HandleSelect}
                    >
                      {OptionsData.map((w, index) => {
                        return (
                          <option key={index} value={w.connects}>
                            {w.value}
                          </option>
                        );
                      })}
                    </select>
                    <p style={{ color: "red" }}>{err?.connects}</p>
                  </div>
                </div>

                <div className="form-field flex100">
                  <label>Your account will be charged</label>
                  <span>${data.connect_amount}</span>
                </div>

                <div className="form-field flex100">
                  <label>Your new connects balance will be</label>
                  <span>
                    {Number(data.available_connects) +
                      Number(data.buy_connects)}
                  </span>
                </div>

                <div className="form-field flex100">
                  <label>These connects will expire on</label>
                  <span>08/04/2023</span>
                </div>

                <div class="form-field mt-5 flex100 d-flex justify-content-center">
                  <button
                    type="button"
                    onClick={onCloseModal}
                    class="btn btn-secondary me-3"
                  >
                    Cancel
                  </button>
                  {console.log("data", data)}
                  <button
                    type="button"
                    class="btn btn-primary button-submit"
                    onClick={() => {
                      Validation();
                    }}
                  >
                    {data?.buy_connects == 0 &&
                    data?.connect_amount == 0 &&
                    data?.sub_name == "Select" ? (
                      "Pay Now"
                    ) : (
                      <PayPalScriptProvider
                        options={{
                          "client-id": "test",
                          components: "buttons",
                          currency: "USD",
                          //"data-client-token": "abc123xyz==",
                        }}
                      >
                        <ButtonWrapper
                          currency="USD"
                          showSpinner={false}
                          amount={data.connect_amount}
                          onCloseModal={onCloseModal}
                          dataConnects={data}
                        />
                      </PayPalScriptProvider>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BuyConnectsModal;
