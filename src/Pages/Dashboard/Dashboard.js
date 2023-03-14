import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "../../hooks/useAdmin";
import useUserRole from "../../hooks/useUserRole";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const isDoctor = useUserRole(user);

  return (
    <div className="drawer drawer-mobile">
      <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <h2 className="text-2xl font-bold text-sky-600">
          Welcome To Your Dashboard
        </h2>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-60  text-base-content">
          {/* <!-- Sidebar content here --> */}
          <li>
            <Link to="/dashboard">My Appointments</Link>
          </li>
          <li>
            <Link to="/dashboard/myProfile">My Profile</Link>
          </li>
          {!admin && !isDoctor && (
            <li>
              <Link to="/dashboard/review">Post Review</Link>
            </li>
          )}
          <li>
            <Link to="/dashboard/history">My History</Link>
          </li>

          {isDoctor && (
            <li>
              <Link to="/dashboard/doctorPage">My schedule</Link>
            </li>
          )}

          {admin && (
            <>
              <li>
                <Link to="/dashboard/users">All User</Link>
              </li>
              <li>
                <Link to="/dashboard/allPatients">All patients</Link>
              </li>
              {/* <li>
                <Link to="/dashboard/doctor">Add Doctor</Link>
              </li> */}
              <li>
                <Link to="/dashboard/manageAllDoctor">All Doctors</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
