import { Link } from "react-router-dom";
import LocationIcon from "./../../assets/icons/loc-ico.png";
import StudentProfile from "./../../assets/images/feed-logo.png";

const InvitationCard = () => {
  // const navigate = useNavigate();
  // const [showAcceptInvitation, setshowAcceptInvitation] = useState(true);
  // const [showRejectedView, setshowRejectedView] = useState(true);
  // const [userData, setUserData] = useState([]);
  // const [id, setId] = useState("");

  // // console.log(user, "::");

  // const handleInvitation = async(status) => {
  //   setshowAcceptInvitation(false);
  //   if(id) {
  //     let data = {
  //       applayJobId: id,
  //       appiledJobStatusByEmployer: status,
  //     };
  //     const resp = await appliedJobServices.updateAppliedJobs(data)
  //     console.log(resp);

  //     if(resp.status == 200) {
  //       toast.success(
  //         resp.data.message ? resp.data.message : "Something went wrong"
  //       );
  //     }
  //   }
  // };

  // const handleRejected = () => setshowRejectedView(false);
  // const handleChatNow = () => navigate("/employer-inbox");

  // useEffect(() => {
  //   if (user) {
  //     setUserData(user);
  //   }
  // }, [user]);

  // useEffect(()=> {
  //   setId(jobid)
  // }, [jobid])
  return (
  
      <div className="feeds-search-coll">
        <div className="feeds-search-head">
          <div className="feeds-head-left">
            <div className="feeds-s-logo">
              <Link to="">
                <img
                  src={StudentProfile}
                  style={{ height: "60px", width: "60px", borderRadius: "50%" }}
                  alt="profile image2"
                />
              </Link>
            </div>
            <div className="feeds-s-name">
              <h2>
                <Link to="">Rahul Singh</Link>{" "}
              </h2>
              <ul className="feeds-s-ul mb-2">
                <li>
                  <img src={LocationIcon} alt="Location" />
                  New Delhi
                </li>
              </ul>
              <p className="mb-1"><b>Role:</b> React Js Developer</p>
              <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</p>
            </div>
          </div>
          <div className="feeds-s-name"></div>
        </div>
      </div>
    )
};

export default InvitationCard;
