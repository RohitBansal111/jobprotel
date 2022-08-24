import { useState  ,useEffect } from "react";
import InvitationCard from "../../../components/Employer/invitationCard";
import Layout from "../../../components/Layout";
import Pagination from "react-js-pagination";
import { useParams } from "react-router";
import * as invitationService from '../../../services/jobsInvitationServices'
const InvitationAccepted = () => {
  const [invitationData, setInvitationDats]=useState([])
  const [totalRecords, setTotalRecords] = useState(0);

  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(true);
   const [pageNumber, setPageNumber] = useState(1);
   const { jobid } = useParams();

  useEffect(() => {
    getInvitationRecord(jobid, pageNumber);
  }, [jobid]);

  const getInvitationRecord = async (jobid, pageNumber = pageNumber) => {
    const payload = {
      jobId: jobid,
      pageNumber: pageNumber,
      pageSize: pageSize,
    };
    const resp = await invitationService.getJobInvitationlist(payload);
    console.log(resp, "::")
    if (resp.status == 200) {
      setTotalRecords(resp.data?.totalCount||3);
      setInvitationDats(resp.data?.data[0]?.users);
      setLoading(false);
    }
  };
  const handlePageChange = (pageNumber) => {
    setPageNumber(pageNumber);
    getInvitationRecord(jobid, pageNumber);
  };

 


  return (
    <Layout>
      <div className="inner-page-wrapper">
        <section className="topbg-banner">
          <div className="container">
            <div className="innerbg-banner"></div>
          </div>
        </section>
        <section className="job-feeds-wrapper">
          <div className="container">
            <h4 className="text-white mb-3">Invitation Accepted</h4>
            <div className="application-list-card common-inner-sec">
              <ul>
                <li>
                  <div className="default-feeds-search">
                    <InvitationCard />
                    <InvitationCard />
                    <InvitationCard />

                    {totalRecords > 5 && (
                    <Pagination
                      activePage={pageNumber}
                      itemsCountPerPage={pageSize}
                      totalItemsCount={totalRecords}
                      pageRangeDisplayed={4}
                      onChange={handlePageChange}
                    />
                  )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default InvitationAccepted;
