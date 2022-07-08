import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";

const RenderPhoneInput = ({ label }) => {
  const [phoneNumberFlag, setphoneNumberFlag] = useState();
  return (
    <div className="field-render-main">
      <label> {label} </label>
      <PhoneInput
        placeholder="Enter Company Phone Number"
        value={phoneNumberFlag}
        onChange={setphoneNumberFlag}
      />
    </div>
  );
};

export default RenderPhoneInput;
