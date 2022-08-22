const KycValidator = (values) => {
  const error = {};
  if (!values.documentTitle) {
    error.documentTitle = "Required Document Title";
  }
  // if (!values.remarks) {
  //   error.remarks = "Remarks required";
  // }
  return error;
};

export default KycValidator;
