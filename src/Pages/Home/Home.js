import React from 'react';
// import Banner from './Banner';
import GetAppointment from './GetAppointment';
import PatientReviews from './PatientReviews';
import Services from './Services';
import Footer from '../Shared/Footer';
import Banner from './Banner/Banner';
import Partners from './Partners';


const Home = () => {
    return (
        <div>
            {/* <Banner></Banner> */}
            <Banner></Banner>
            <Services></Services>
            <GetAppointment></GetAppointment>
            <PatientReviews></PatientReviews>
            <Partners></Partners>
            <Footer></Footer>
        </div>
    );
};

export default Home;