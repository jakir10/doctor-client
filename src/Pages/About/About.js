import React from 'react';
import Footer from '../Shared/Footer';
import doctorImage from "./../../assets/images/about-doctor.png";

const About = () => {
    return (
        // <div>
        //     <h2>This is about Page</h2>
        // </div>
        <div className="about-container">
      <div className='flex grid gap-4 grid-cols-2 mt-10'>
      <div>
      <img className='mt-7' src={doctorImage} alt="Doctor" />
      </div>
      <div>
      <h2 className='text-3xl text-primary my-5 mt-24'>About Our Doctor Appointment System</h2>
      <p>
        Our doctor appointment system is designed to make it easy for patients to schedule appointments with their preferred doctor. With our system, patients can easily view available appointment times, book appointments, and receive appointment reminders via email or text message. Our platform is user-friendly, secure, and fully accessible from any device with an internet connection.
      </p>
      <p>
        Our team is dedicated to providing excellent customer service and ensuring that our patients have a seamless experience from start to finish. We believe that everyone should have access to quality healthcare and that’s why we’ve made our appointment system accessible to everyone. Whether you’re a busy professional or a stay-at-home parent, our platform is here to make scheduling doctor appointments easier and more convenient for you.
      </p>
      </div>
      </div>
      <Footer></Footer>
    </div>
    );
};

export default About;