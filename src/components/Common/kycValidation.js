const KycValidator = (values) => { 
     const error = {}
     if(!values.firstname){ 
          error.firstname = "Required First Name"
     }
     if(!values.email){ 
          error.email = "Required Email Address"
     }
     if(!values.frontId){ 
          error.frontId = "Required Front Id Proof Photo"
     }
     if(!values.backId){ 
          error.backId = "Required Back Id Proof Photo"
     }
     if(!values.candidateName){ 
          error.candidateName = "Required candidate name"
     }
     return error;
   }
   
   export default KycValidator