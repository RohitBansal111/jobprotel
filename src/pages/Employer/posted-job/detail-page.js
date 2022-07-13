import React from "react";
import Layout from "../../../components/Layout";
import VerifiedIcon from "./../../../assets/icons/verify.png";
import LocationIcon from "./../../../assets/icons/loc-ico.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const EmployerJobDetailsPage = () => {

  const navigate = useNavigate()

  const handleApplicationReceived = () => {
    navigate('/review-applications')
  }
  return (
    <Layout>
      <section className="job-details-wrapper">
        <div className="container">
          <h1>Job Details</h1>
          <div className="row">
            <div className="col-12 col-md-9">
              <div className="details-card">
                <div className="head43">
                  <h2>
                    React Js Developer
                    <span>Posted 8 hours ago</span>
                  </h2>
                  <p>Mobile/Tablet Front-End Developer</p>
                </div>
                <div className="job-description">
                  <p>
                    I need help with the html and css for the attached image.
                  </p>
                  <p>
                    The coding must be responsive, so even on a mobile phone the
                    2 images overlap.
                  </p>
                  <p>Should be separate images.</p>
                  <p>
                    The button should be perfectly centered horizontally and
                    vertically.
                  </p>
                  <p>
                    If needed on screens under 450px, we can remove order and
                    text decorate underline.
                  </p>
                  <p>**I do not need coding for the top 3 lines of text:</p>
                  <p>
                    Beautiful woven collection of classic motifs: buffalo plaid,
                    paisley, ticking stripes & more.
                  </p>
                </div>
                <div className="education-info">
                  <p><b>Experience: </b> 5 Year 7 Months</p>
                  <p><b>Education:</b> B.Sc Computer Science</p>
                  <p><b>SKills: </b> Html, Css, Scss, Bootstrap, Material, React js, Angular js UI</p>
                  <p><b>Job Location: </b> Gurgaon</p>
                  <p><b>Hour/day: </b> 34hr</p>
                  <p><b>Days / Week: </b> 5days</p>
                  <p><b>Job Timings/days: </b>9:00AM - 6:00PM</p>
                  <p><b>Time Zone: </b> India Standard Time (IST) is 5:30 hours</p>
                  <p><b>Category: </b> Web Development</p>
                  <p><b>Salary: </b> 8LPA</p>
                  <p><b>Tags:</b> react, flutter, angular, figma</p>
                </div>
                <div className="inner-info-section">
                  <h3>Skills and Expertise</h3>
                  <ul className="feeds-ul">
                    <li>
                      <Link to="#">API </Link>
                    </li>
                    <li>
                      <Link to="#">Web Application </Link>
                    </li>
                    <li>
                      <Link to="#">Wearable Technology </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <div className="details-right-sidebar">
                <div className="post-action">
                  <button type="button" onClick={handleApplicationReceived} className="btn btn-primary">
                    Applications received (17)
                  </button>
                  <button type="button" className="btn btn-primary-outline">
                    Invitation accepted (12)
                  </button>
                </div>
                <div className="connects-info">
                  <p>Required Connects to submit a proposal: <b>2</b> </p>
                  <p>Available Connects: <b>14</b></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EmployerJobDetailsPage;