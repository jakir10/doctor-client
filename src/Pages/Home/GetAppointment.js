import React from "react";
import doctor from "../../assets/images/doctor.png";
import appointment from "../../assets/images/appointment.jpg";
import MainButton from "../Shared/MainButton";
import { useNavigate } from "react-router-dom";

const GetAppointment = () => {
  const navigate = useNavigate();
  return (
    <section
      style={{
        background: `url(${appointment})`,
      }}
      className="flex justify-center items-center"
    >
      <div className="flex-1 hidden lg:block">
        <img className="mt-[-100px]" src={doctor} alt="" />
      </div>
      <div className="flex-1 px-5">
        <h3 className="text-xl text-primary">Appointment</h3>
        <h2 className="text-3xl text-white py-5">Get an Appointment</h2>
        <p className="text-white pb-5">
          Getting an appointment online has never been easier. With just a few
          clicks, you can schedule a doctor's visit, a dental check-up, or a
          beauty treatment at your convenience. All you need is a computer, a
          smartphone, or a tablet, and access to the internet. You can find and
          compare different providers, read reviews and ratings, and choose the
          one that suits your needs and preferences. You can also select the
          date and time that works best for you, without waiting on hold or
          being put on a waiting list. Moreover, you can receive reminders and
          updates via email or text, and even reschedule or cancel your
          appointment if necessary. Try it today and enjoy the convenience and
          efficiency of online booking.
        </p>
        {/* <MainButton onClick={() => navigate('/manageitem')}>Get Appointment</MainButton> */}
        {/* <button onClick={() => navigate('/appointment')}></button> */}
        <button
          onClick={() => navigate("/appointment")}
          className="btn btn-primary text-white bg-gradient-to-r from-cyan-500 to-blue-500 "
        >
          Get Appointment
        </button>
      </div>
    </section>
  );
};

export default GetAppointment;
