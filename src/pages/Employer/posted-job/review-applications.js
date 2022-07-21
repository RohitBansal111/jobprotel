import EmployerReviewCard from "../../../components/Employer/reviewListing"
import Layout from "../../../components/Layout"
import * as jobServices from "../../../services/jobServices";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { Loader } from "../../../components/Loader/Loader";
import Pagination from "react-js-pagination";

const ReviewApplications = () => {
   const { jobid } = useParams();
   const [users , setUsers]=useState([])
   const [loading, setLoading] = useState(true);
   const [pageNumber, setPageNumber] = useState(1);
   const [pageSize, setPageSize] = useState(10);
   const [totalRecords, setTotalRecords]=useState(10)

  useEffect(() => {
    console.log("jobid",jobid)
    getUsers(jobid,pageNumber);
  }, [jobid]);

  const getUsers=async (jobid,pageNumber=pageNumber)=>{
     const payload = {
          jobId: jobid,
          pageNumber: pageNumber,
          pageSize:pageSize
      }
    const resp = await jobServices.getReviewJobsByJobId(payload)
    console.log(resp,"data")
    if (resp.status == 200) {
      setUsers(resp?.data?.data[0]?.users)
      setLoading(false)
    }
  }
  const handlePageChange = (pageNumber) => {
     console.log(`active page is ${pageNumber}`);
     setPageNumber(pageNumber);
     setLoading(true);
     getUsers(jobid,pageNumber);
   };
     return (
          <Layout>
               <div className="inner-page-wrapper">
                    <section className="topbg-banner">
                         <div className="container">
                              <div className="innerbg-banner">
                              </div>
                         </div>
                    </section>
                    <section className="job-feeds-wrapper">
                         <div className="container">
                              <h4 className="text-white mb-3">Review Applications</h4>
                              <div className="application-list-card mb-5">
                                   <ul>
                                        <li>
                                             <div className="default-feeds-search">
                                             {users && users.length> 0 && users.map((data)=>
                                               <EmployerReviewCard user={data}/>
                                             )}
                                                  
                                             </div>
                                             {users && users.length >10 &&
                                             <Pagination
                                                  activePage={pageNumber}
                                                  itemsCountPerPage={pageSize}
                                                  totalItemsCount={totalRecords}
                                                  pageRangeDisplayed={totalRecords / pageSize}
                                                  onChange={handlePageChange}
                                             />
                                              }
                                        </li>
                                   </ul>
                              </div>
                         </div>
                    </section>
               </div>
          </Layout>
     )
}

export default ReviewApplications
