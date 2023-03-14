import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import patient from "../../assets/images/patient.jpg";
import doc from "../../assets/images/doc.jpg";
// import PatientRegistration from "./PatientRegistration";

import RegisterDoctor from "./RegisterDoctor";
import RegisterPatient from "./RegisterPatient";

const AccountCreator = () => {
  const navigate = useNavigate();
  const { type } = useParams();

  if (type === "patient") {
    return <RegisterPatient />;
  }

  if (type === "doctor") {
    return <RegisterDoctor />;
  }

  return (
    <div className="h-screen pt-14">
      <h1 className="text-center my-2 text-2xl">Continue as Doctor...</h1>
      <div className="flex justify-evenly ">
        {/* <div
          onClick={() => navigate("/register/patient")}
          className="flex flex-col justify-between transition-all rounded-lg p-5 border border-white hover:border-primary hover:shadow-2xl hover:scale-105 group"
        >
          <img className="h-5/6" src={patient} alt="" />
          <p className="text-center text-3xl">Patient</p>
        </div> */}
        <div
          onClick={() => navigate("/register/doctor")}
          className="flex flex-col justify-between transition-all rounded-lg p-5 border border-white hover:border-primary hover:shadow-2xl hover:scale-105 group"
        >
          <img className="h-[77%]" src={doc} alt="" />
          <p className="text-center text-3xl">Doctor</p>
        </div>
      </div>
    </div>
  );
};

export default AccountCreator;
