import { Link } from "react-router-dom";
import LocationIcon from "./../../assets/icons/loc-ico.png";
import StudentProfile from "./../../assets/images/feed-logo.png";
import UserAvatar from "../../assets/images/demo.png"
const InvitationCard = ({data}) => {
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
console.log(data, "::::");
  return (
  
      <div className="feeds-search-coll">
        <div className="feeds-search-head">
          <div className="feeds-head-left">
            <div className="feeds-s-logo">
              <Link to={`/public/${data?.userId}`}>
                <img
                  src={data?.pictureUrl !== null ? `${process.env.REACT_APP_IMAGE_API_URL}/${data.pictureUrl}`: UserAvatar}
                  style={{ height: "60px", width: "60px", borderRadius: "50%" }}
                  alt="profile image2"
                />

{/* {
                    user?.studentDetails !== null &&
                    user?.studentDetails?.pictureUrl !== null
                      ? `${process.env.REACT_APP_IMAGE_API_URL}${user?.studentDetails?.pictureUrl}`
                      : UserAvatar
                  } */}
              </Link>
            </div>
            <div className="feeds-s-name">
              <h2>
                <Link to={`/public/${data?.userId}`}>{data?.firstName}  {data?.lastName}</Link>{" "}
              </h2>
              <ul className="feeds-s-ul mb-2">
                <li>
                  <img src={LocationIcon} alt="Location" />
                 {data?.cityName}
                </li>
              </ul>
              <p className="mb-1"><b>Role:</b>{data?.skills}</p>
              <p>{data?.description}</p>
            </div>
          </div>
          <div className="feeds-s-name"></div>
        </div>
      </div>
    )
};

export default InvitationCard;
