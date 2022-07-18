const KycValidator = (values) => { 
     const error = {}
     if(!values.documentTitle){ 
          error.documentTitle = "Required Document Title"
     }
     if(!values.remarks){ 
          error.remarks = "Remarks required"
     }
     // if(!values.frontId){ 
     //      error.frontId = "Required Front Id Proof Photo"
     // }
     // if(!values.backId){ 
     //      error.backId = "Required Back Id Proof Photo"
     // }
     // if(!values.candidateName){ 
     //      error.candidateName = "Required candidate name"
     // }
     return error;
   }
   
   export default KycValidator