import InvitationCard from "../../../components/Employer/invitationCard";
import Layout from "../../../components/Layout";

const InvitationAccepted = () => {
  // const { jobid } = useParams();
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [pageNumber, setPageNumber] = useState(1);
  // const [pageSize, setPageSize] = useState(5);
  // const [totalRecords, setTotalRecords] = useState(0);
  // const [activePage, setActivePage] = useState(1);

  // useEffect(() => {
  //   getUsers(jobid, pageNumber);
  // }, [jobid]);

  // const getUsers = async (jobid, pageNumber = pageNumber) => {
  //   const payload = {
  //     jobId: jobid,
  //     pageNumber: pageNumber,
  //     pageSize: pageSize,
  //   };
  //   const resp = await jobServices.getReviewJobsByJobId(payload);
  //   console.log(resp, "::")
  //   if (resp.status == 200) {
  //     setTotalRecords(resp.data?.totalCount);
  //     setUsers(resp.data?.data[0]?.users);
  //     setLoading(false);
  //   }
  // };
  // const handlePageChange = (pageNumber) => {
  //   setPageNumber(pageNumber);
  //   // setLoading(true);
  //   getUsers(jobid, pageNumber);
  // };

  // const handlePageChangeReview = (pageNumber) => {
  //   setActivePage(pageNumber);
  //   // setLoading(true);
  //   getUsers(jobid, pageNumber);
  // };
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
