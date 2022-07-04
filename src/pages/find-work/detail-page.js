import React from "react";
import Layout from "../../components/Layout";
import VerifiedIcon from "./../../assets/icons/verify.png";
import LocationIcon from "./../../assets/icons/loc-ico.png";
import { Link } from "react-router-dom";

const DetailsPage = () => {
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
                    Fullstack project assessment & advice{" "}
                    <span>Posted 8 hours ago</span>
                  </h2>
                  <ul className="feeds-s-ul">
                    <li>
                      <img src={LocationIcon} alt="Location" />
                      United States
                    </li>
                    <li>
                      <img src={VerifiedIcon} alt="Company Verified" />
                      Verified post
                    </li>
                  </ul>
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
                  <button type="button" className="btn btn-primary">
                    Apply Now
                  </button>
                  <button type="button" className="btn btn-primary-outline">
                    Saved Job
                  </button>
                </div>
                <div className="connects-info">
                  <p>Required Connects to submit a proposal: 2 </p>
                  <p>Available Connects: 14</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DetailsPage;
