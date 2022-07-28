import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export const Loader = () => {
  let [loading, setLoading] = useState(true);
  return (
    
      <ClipLoader loading={loading} size={50} />
      
  );
};
