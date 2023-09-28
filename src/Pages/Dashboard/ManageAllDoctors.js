import React, { useState } from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import DeletingDoctorModal from "./DeletingDoctorModal";
import DoctorTable from "./DoctorTable";

const ManageAllDoctors = () => {
  const [deletingDoctor, setDeletingDoctor] = useState(null);

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
    <div>
      <h2 className="text-2xl">All Doctors list: {doctors.length}</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Specialty</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <DoctorTable
                key={doctor._key}
                doctor={doctor}
                index={index}
                refetch={refetch}
                setDeletingDoctor={setDeletingDoctor}
              ></DoctorTable>
            ))}
          </tbody>
        </table>
      </div>
      {deletingDoctor && (
        <DeletingDoctorModal
          deletingDoctor={deletingDoctor}
          setDeletingDoctor={setDeletingDoctor}
          refetch={refetch}
        ></DeletingDoctorModal>
      )}
    </div>
  );
};

export default ManageAllDoctors;
