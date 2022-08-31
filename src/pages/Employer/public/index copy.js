import { Link } from "react-router-dom";
import Layout from "../../../components/Layout";
import UserAvtar from "./../../../assets/images/profile-img.jpg";
import ConnectIcon from "./../../../assets/icons/connect.png";
import CompanyLogo from "../../../assets/images/company-logo2.jpeg";

const PublicProfile = () => {
  return (
    <Layout>
      <div className="inner-page-wrapper">
        <section className="topbg-banner">
          <div className="container">
            <div className="innerbg-banner">
              <div className="banner-edit"></div>
            </div>
          </div>
        </section>
        <section className="job-feeds-wrapper">
          <div className="container">
            <div className="profile-feed-inner">
              <div className="user-profile-left">
                <div className="user-profile-coll">
                  <div className="user-profile-detail">
                    <div
                      className="profile-pic-progress"
                      role="progressbar"
                      aria-valuenow="60"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <span className="profile-img">
                        <img src={UserAvtar} alt="user profile" />
                      </span>
                    </div>
                    <h3>Michael Taylor</h3>
                    <p>Washington United States</p>
                  </div>
                  <div className="profile-connect">
                    <div className="profile-con">
                      <img src={ConnectIcon} alt="Connect" />
                      <span className="conn-count">20</span>
                    </div>
                    <h4>Available Connects</h4>
                  </div>
                  <div className="user-prof-info">
                    <ul className="prof-info-ul">
                      <li>
                        Experience <span className="result">5+ Years</span>
                      </li>
                      <li>
                        College / University{" "}
                        <span className="result">Toronto</span>
                      </li>
                      <li>
                        Education <span className="result">M-Bio Sci.</span>
                      </li>
                      <li>
                        Hours / day <span className="result">8 Hours/day</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="jobs-feeds-sec">
                <div className="jobs-com-profile">
                  <div className="profile-update">
                    <p className="mailto:michael-taylor028@gmail.com">
                      michael-taylor028@gmail.com
                    </p>
                  </div>
                  <div className="profile-strength">
                    <div className="profile-strength-inner">
                      <h3>
                        Profile strength:{" "}
                        <span className="profile-completed">60% Completed</span>
                      </h3>
                      <div className="profile-strength-bar">
                        <p
                          className="profile-progress"
                          style={{ width: "60%" }}
                        ></p>
                        <div className="profile-complete-bar">
                          <span
                            className="complete-bar completed"
                            style={{ left: "25%" }}
                          ></span>
                          <span
                            className="complete-bar completed"
                            style={{ left: "50%" }}
                          ></span>
                          <span
                            className="complete-bar"
                            style={{ left: "75%" }}
                          ></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <section className="profile-information-view">
                  <div className="profile-information-coll">
                    <div className="profile-card-head">
                      <h3>Personal information</h3>
                    </div>
                    <div className="profile-info-list">
                      <ul className="info-list-li">
                        <li>
                          <span className="plabel">Age</span>{" "}
                          <span className="result">30 years old</span>
                        </li>
                        <li>
                          <span className="plabel">Gender </span>
                          <span className="result">Male</span>
                        </li>
                        <li>
                          <span className="plabel">Qualification</span>{" "}
                          <span className="result">
                            Master in bio technology
                          </span>
                        </li>
                        <li>
                          <span className="plabel">Interested area </span>
                          <div className="result">
                            <ul className="tags">
                              <li>Reading books</li>
                              <li>Suffering internet</li>
                              <li>Traveling</li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <span className="plabel">Time zone </span>
                          <span className="result">India (GMT+5:30)</span>
                        </li>
                        <li>
                          <span className="plabel">Address </span>
                          <span className="result">
                            913 Black Oak Hollow Road, San Jose, California,
                            United States, 95110
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
                <section className="profile-information-view">
                  <div className="profile-information-coll">
                    <div className="profile-card-head">
                      <h3>Professional information</h3>
                    </div>
                    <div className="profile-info-list">
                      <ul className="info-list-li">
                        <li>
                          <span className="plabel">Hours / day</span>{" "}
                          <span className="result">8 hours / day</span>
                        </li>
                        <li>
                          <span className="plabel">Expected salary </span>
                          <span className="result">$20 / hours</span>
                        </li>
                        <li>
                          <span className="plabel">Total Experience</span>{" "}
                          <span className="result">5 Years</span>
                        </li>
                        <li>
                          <span className="plabel">Working</span>{" "}
                          <span className="result">Onsite</span>
                        </li>
                        <li>
                          <span className="plabel">Resume </span>
                          <span className="result">
                            <ul className="tags">
                              <li>
                                <Link
                                  target="_blank"
                                  to="https://www.coolfreecv.com/images/modern_resume_with_photo01.jpg"
                                  download
                                >
                                  My-resumefile.pdf
                                </Link>
                              </li>
                            </ul>
                          </span>
                        </li>
                        <li>
                          <span className="plabel">Extra certificates </span>
                          <span className="result">
                            <ul className="tags">
                              <li>
                                <Link
                                  target="_blank"
                                  to="https://www.coolfreecv.com/images/modern_resume_with_photo01.jpg"
                                  download
                                >
                                  Master-of-science.pdf
                                </Link>
                              </li>
                              <li>
                                <Link
                                  target="_blank"
                                  to="https://www.coolfreecv.com/images/modern_resume_with_photo01.jpg"
                                  download
                                >
                                  Certificate of .net technology
                                </Link>
                              </li>
                            </ul>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
                <section className="profile-information-view">
                  <div className="profile-information-coll">
                    <div className="profile-card-head">
                      <h3>Employment Details</h3>
                    </div>
                    <div className="profile-info-list">
                      <ul className="info-list-li additional-box">
                        <li>
                          <div className="designation-list-item">
                            <div className="company-logo">
                              <img src={CompanyLogo} alt="Logo" />
                            </div>
                            <div className="employer-sort-info">
                              <h4>Front End - Team Lead </h4>
                              <p>Eminence Technology</p>
                              <p className="dateP">
                                August 2021 - Current working
                              </p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="designation-list-item">
                            <div className="company-logo">
                              <img src={CompanyLogo} alt="Logo" />
                            </div>
                            <div className="employer-sort-info">
                              <h4>React JS UI developer</h4>
                              <p>Eminence Technology</p>
                              <p className="dateP">August 2020 - July 2021</p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
                <section className="profile-information-view">
                  <div className="Project-information-coll">
                    <div className="profile-card-head">
                      <h3>Project history</h3>
                    </div>
                    <div className="Project-info-list">
                      <div className="project-detail-list">
                        <div className="project-dbox">
                          <h2 className="prname">
                            Front-End Sketch to Tailwind
                          </h2>
                          <div className="prd-buget-column">
                            <div className="project-tenure-skills">
                              <span className="prdate">
                                JAN 05, 2022 - JAN 15, 2022
                              </span>
                              <ul className="tech-links">
                                <li>react-redux</li>
                                <li>flutter</li>
                                <li>native</li>
                              </ul>
                            </div>
                          </div>
                          <button
                            type="button"
                            data-bs-toggle="collapse"
                            href="#collapseExample"
                            role="button"
                            aria-expanded="false"
                            aria-controls="collapseExample"
                            className="btn btn-view-more"
                          >
                            View More
                          </button>
                          <div
                            className="full-project-details collapse"
                            id="collapseExample"
                          >
                            <p>
                              Skills And Qualifications I want the design
                              completed with Sketch to into tailwind if you
                              contact to me I show you all details psi: My
                              request from you is to show your projects that you
                              have done with tailwind before.
                            </p>
                            <p>
                              <b>Link:</b>{" "}
                              <Link to="/">https://bit.ly/3HAAMCF</Link>
                            </p>
                            <p>
                              <b>Attachment:</b>
                            </p>
                            <p className="attachment">
                              <i class="fas fa-file"></i>
                              <Link
                                to="https://blog.undraw.co/static/76e3dd339b3bcf646b0cb79ecec6a04c/tailwindcss_sketch_ui.png"
                                target="_blank"
                                download
                              >
                                Home (5).jpg (1 KB)
                              </Link>
                            </p>
                          </div>
                        </div>
                        <div className="project-dbox">
                          <h2 className="prname">
                            Fullstack project assessment &amp; advice
                          </h2>
                          <div className="prd-buget-column">
                            <div className="project-tenure-skills">
                              <span className="prdate">
                                JAN 05, 2022 - JAN 15, 2022
                              </span>
                              <ul className="tech-links">
                                <li>react-redux</li>
                                <li>flutter</li>
                                <li>native</li>
                              </ul>
                            </div>
                          </div>
                          <button
                            type="button"
                            data-bs-toggle="collapse"
                            href="#collapseExample1"
                            aria-expanded="false"
                            aria-controls="collapseExample1"
                            className="btn btn-view-more"
                          >
                            View More
                          </button>
                          <div
                            className="full-project-details collapse"
                            id="collapseExample1"
                          >
                            <p>
                              Skills And Qualifications I want the design
                              completed with Sketch to into tailwind if you
                              contact to me I show you all details psi: My
                              request from you is to show your projects that you
                              have done with tailwind before.
                            </p>
                            <p>
                              <b>Link:</b>{" "}
                              <Link to="/">https://bit.ly/3HAAMCF</Link>
                            </p>
                            <p>
                              <b>Attachment:</b>
                            </p>
                            <p className="attachment">
                              <i class="fas fa-file"></i>
                              <Link
                                to="https://blog.undraw.co/static/76e3dd339b3bcf646b0cb79ecec6a04c/tailwindcss_sketch_ui.png"
                                target="_blank"
                                download
                              >
                                Home (5).jpg (1 KB)
                              </Link>
                            </p>
                          </div>
                        </div>
                        <div className="project-dbox">
                          <h2 className="prname">
                            Fullstack project assessment &amp; advice
                          </h2>
                          <div className="prd-buget-column">
                            <div className="project-tenure-skills">
                              <span className="prdate">
                                JAN 05, 2022 - JAN 15, 2022
                              </span>
                              <ul className="tech-links">
                                <li>react-redux</li>
                                <li>flutter</li>
                                <li>native</li>
                              </ul>
                            </div>
                          </div>
                          <button
                            type="button"
                            data-bs-toggle="collapse"
                            href="#collapseExample2"
                            aria-expanded="false"
                            aria-controls="collapseExample2"
                            className="btn btn-view-more"
                          >
                            View More
                          </button>
                          <div
                            className="full-project-details collapse"
                            id="collapseExample2"
                          >
                            <p>
                              Skills And Qualifications I want the design
                              completed with Sketch to into tailwind if you
                              contact to me I show you all details psi: My
                              request from you is to show your projects that you
                              have done with tailwind before.
                            </p>
                            <p>
                              <b>Link:</b>{" "}
                              <Link to="/">https://bit.ly/3HAAMCF</Link>
                            </p>
                            <p>
                              <b>Attachment:</b>
                            </p>
                            <p className="attachment">
                              <i class="fas fa-file"></i>
                              <Link
                                to="https://blog.undraw.co/static/76e3dd339b3bcf646b0cb79ecec6a04c/tailwindcss_sketch_ui.png"
                                target="_blank"
                                download
                              >
                                Home (5).jpg (1 KB)
                              </Link>
                            </p>
                          </div>
                        </div>
                        <div className="project-pagination">
                          <ul className="pagination">
                            <li className="page-item">
                              <Link className="page-link" to="/">
                                Prev
                              </Link>
                            </li>
                            <li className="page-item">
                              <Link className="page-link" to="/">
                                1
                              </Link>
                            </li>
                            <li className="page-item active">
                              <Link className="page-link" to="/">
                                2
                              </Link>
                            </li>
                            <li className="page-item">
                              <Link className="page-link" to="/">
                                3
                              </Link>
                            </li>
                            <li className="page-item">
                              <Link className="page-link" to="/">
                                4
                              </Link>
                            </li>
                            <li className="page-item">
                              <Link className="page-link" to="/">
                                5
                              </Link>
                            </li>
                            <li className="page-item">
                              <Link className="page-link" to="/">
                                Next
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default PublicProfile;
