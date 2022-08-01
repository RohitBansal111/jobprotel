import React, { useEffect } from "react";
import { useParams } from "react-router";

const InviteWithStatus = () => {
  const parmams = useParams();

  useEffect(() => {
    console.log(parmams)
  }, [parmams])
  
  return (
    <>
      <button type="button" className="btn submit-btn">
        Accept
      </button>
      <button type="button" className="btn submit-btn">
        Reject
      </button>
    </>
  );
};

export default InviteWithStatus;
