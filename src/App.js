import "./App.css";
import Navbar from "./Pages/Shared/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Login from "./Pages/Login/Login";
import Appointment from "./Pages/Appointment/Appointment";
import SignUp from "./Pages/Login/SignUp";
import RequireAuth from "./Pages/Login/RequireAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import MyAppointments from "./Pages/Dashboard/MyAppointments";
import MyReview from "./Pages/Dashboard/MyReview";
import MyHistory from "./Pages/Dashboard/MyHistory";
import Users from "./Pages/Dashboard/Users";
import RequireAdmin from "./Pages/Login/RequireAdmin";
import Doctor from "./Pages/Dashboard/Doctor";
import ManageAllDoctors from "./Pages/Dashboard/ManageAllDoctors";
import Payment from "./Pages/Dashboard/Payment";
import Contact from "./Pages/Contact/Contact";
import Reviews from "./Pages/Review/Reviews";
import AllPatients from "./Pages/Dashboard/AllPatients";
import Doctors from "./Pages/Doctors/Doctors";
import MyProfile from "./Pages/Dashboard/MyProfile";
import Register from "./Pages/Register/Registration";
import Registration from "./Pages/Register/Registration";
import RegisterDoctor from "./Pages/Register/RegisterDoctor";
import RegisterPatient from "./Pages/Register/RegisterPatient";
import DoctorPage from "./Pages/Dashboard/DoctorPage";
import Prescription from "./Pages/Dashboard/Prescription";

// import Footer from './Pages/Shared/Footer';

function App() {
  return (
    <div className="max-w-screen-xl mx-auto px-12">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="registration" element={<Registration />} />
        <Route path="register/doctor" element={<RegisterDoctor />} />
        <Route path="register/patient" element={<RegisterPatient />} />
        <Route path="contact" element={<Contact />} />
        <Route path="user-review" element={<Reviews />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="prescription" element={<Prescription />} />
        <Route
          path="appointment"
          element={
            <RequireAuth>
              <Appointment />
            </RequireAuth>
          }
        />
        <Route
          path="dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route index element={<MyAppointments></MyAppointments>}></Route>
          <Route path="myProfile" element={<MyProfile></MyProfile>}></Route>
          <Route path="review" element={<MyReview></MyReview>}></Route>
          <Route path="history" element={<MyHistory></MyHistory>}></Route>
          <Route path="doctorPage" element={<DoctorPage></DoctorPage>}></Route>
          <Route path="payment/:id" element={<Payment></Payment>}></Route>
          <Route
            path="users"
            element={
              <RequireAdmin>
                <Users></Users>
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="allPatients"
            element={
              <RequireAdmin>
                <AllPatients></AllPatients>
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="doctor"
            element={
              <RequireAdmin>
                <Doctor></Doctor>
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="manageAllDoctor"
            element={
              <RequireAdmin>
                <ManageAllDoctors></ManageAllDoctors>
              </RequireAdmin>
            }
          ></Route>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
      <ToastContainer />
      {/* <Footer></Footer> */}
    </div>
  );
}

export default App;
