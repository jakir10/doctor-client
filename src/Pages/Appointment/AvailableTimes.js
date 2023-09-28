import { format } from "date-fns";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import AppointmentModal from "./AppointmentModal";
// import AppointmentOption from './AppointmentOption';
import Service from "./Service";
// import Booking from './Booking';

const AvailableTimes = ({ date }) => {
  const [treatment, setTreatment] = useState(null);
  const formattedDate = format(date, "PP");
  const {
    data: services,
    isLoading,
    refetch,
  } = useQuery(["available", formattedDate], () =>
    fetch(
      `https://doctors-server-beta.vercel.app/available?date=${formattedDate}`
    ).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="my-12">
      <h4 className="text-xl text-white bg-gradient-to-r from-cyan-500 to-blue-400 rounded-lg py-1 text-center my-12">
        Get Appointment Times on {format(date, "PP")}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services?.map((service) => (
          <Service
            key={service._id}
            service={service}
            setTreatment={setTreatment}
          ></Service>
        ))}
      </div>
      {treatment && (
        <AppointmentModal
          date={date}
          treatment={treatment}
          setTreatment={setTreatment}
          refetch={refetch}
        ></AppointmentModal>
      )}
    </div>
  );
};

export default AvailableTimes;
