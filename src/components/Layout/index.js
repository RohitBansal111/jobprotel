import Footer from "../Footer";
import Header from "../Header";

const Layout = ({ children, companyLogo }) => {
  return (
    <div className="page-wrapper">
      <Header companyLogo={companyLogo} />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
