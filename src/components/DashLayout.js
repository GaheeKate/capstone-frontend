import { Link, Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";

const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <div className="dash-container">
        <Outlet />
      </div>
      <div className="">
        <Link to={"/"}>Back to home</Link>
      </div>
    </>
  );
};
export default DashLayout;
