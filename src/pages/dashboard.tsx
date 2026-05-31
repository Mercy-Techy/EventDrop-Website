import SideBar from "../components/sidebar";
import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div className="w-full bg-neutral-900">
      <SideBar />
      <div className="bg-gray-50 lg:bg-neutral-900 pt-10 lg:ml-[20%] lg:mr-5 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
