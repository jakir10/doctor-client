import React, { useState } from 'react';
import Footer from '../Shared/Footer';
import AppointmentSection from './AppointmentSection';
import AvailableTimes from './AvailableTimes';

const Appointment = () => {
    const [date, setDate] = useState(new Date());
    return (
        <div>
            <AppointmentSection date={date} setDate={setDate}></AppointmentSection>
            <AvailableTimes date={date}></AvailableTimes>
            <Footer></Footer>
        </div>
    );
};

export default Appointment;