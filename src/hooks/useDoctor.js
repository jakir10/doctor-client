import { useEffect, useState } from "react";

const useDoctor = (user) => {
  const [isDoctor, setIsDoctor] = useState(false);
  const [doctorLoading, setDoctorLoading] = useState(true);
  useEffect(() => {
    const email = user?.email;
    if (email) {
      fetch(`http://localhost:5000/doctor/${email}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setIsDoctor(data.doctor);
          setDoctorLoading(false);
        });
    }
  }, [user]);

  return [isDoctor, doctorLoading];
};

export default useDoctor;
