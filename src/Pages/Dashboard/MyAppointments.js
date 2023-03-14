import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  // useEffect(() => {
  //     if (user) {
  //         fetch(`http://localhost:5000/booking?.patient=${user.email}`)
  //             .then(res => res.json())
  //             .then(data => setAppointments(data));
  //     }
  // }, [user])
  useEffect(() => {
    console.log(user.email);
    if (user) {
      fetch(`http://localhost:5000/booking?patient=${user.email}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => {
          console.log("res", res);
          if (res.status === 401 || res.status === 403) {
            signOut(auth);
            localStorage.removeItem("accessToken");
            navigate("/");
          }
          return res.json();
        })
        .then((data) => {
          setAppointments(data);
        });
    }
  }, [user]);
  return (
    <div>
      <h2>My All Appointments: {appointments.length}</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="text-white">
            <tr>
              <th className="bg-sky-700"></th>
              <th className="bg-sky-700">Name</th>
              <th className="bg-sky-700">Date</th>
              <th className="bg-sky-700">Time</th>
              <th className="bg-sky-700">Treatment</th>
              <th className="bg-sky-700">Doctor</th>
              <th className="bg-sky-700">Payment</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a, index) => (
              <tr key={a._id}>
                <th>{index + 1}</th>
                <td>{a.patientName}</td>
                <td>{a.date}</td>
                <td>{a.slot}</td>
                <td>{a.treatment}</td>
                <td>{a.doctor}</td>
                <td>
                  {a.price && !a.paid && (
                    <Link to={`/dashboard/payment/${a._id}`}>
                      <button className="btn btn-xs btn-primary">
                        Pay now
                      </button>
                    </Link>
                  )}
                  {a.price && a.paid && (
                    <div>
                      <p>
                        <span className="text-primary font-bold">Paid</span>
                      </p>
                      <p>
                        Transaction id: <br />
                        <span className="text-primary font-bold">
                          {a.transactionId}
                        </span>
                      </p>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointments;
