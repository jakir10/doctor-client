import React from "react";
import { useQuery } from "react-query";
import Footer from "../Shared/Footer";
import Loading from "../Shared/Loading";
import DoctorsCard from "./DoctorsCard";

const Doctors = () => {
  const {
    data: doctors,
    isLoading,
    refetch,
  } = useQuery("doctors", () =>
    fetch("https://doctors-server-beta.vercel.app/user/doctor", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    //         <div className="card card-side bg-base-100 shadow-xl">
    //   <figure><img src="/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie"/></figure>
    //   <div className="card-body">
    //     <h2 className="card-title">New movie is released!</h2>
    //     <p>Click the button to watch on Jetflix app.</p>
    //     <div className="card-actions justify-end">
    //       <button className="btn btn-primary">Watch</button>
    //     </div>
    //   </div>
    // </div>
    <div>
      <h2 className="text-2xl">All Doctors list: {doctors.length}</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {doctors.map((doctor, index) => (
          <DoctorsCard
            key={doctor._key}
            doctor={doctor}
            index={index}
            refetch={refetch}
          ></DoctorsCard>
        ))}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Doctors;
