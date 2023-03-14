import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";

const MyHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

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
          setBookings(data);
        });
    }
  }, [user]);

  const visitedBookings = bookings.filter(
    (booking) => booking.price && booking.paid
  );

  return (
    <div>
      <h2>My History: {visitedBookings.length}</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="text-white">
            <tr>
              <th className="bg-sky-700"></th>
              <th className="bg-sky-700">Name</th>
              <th className="bg-sky-700">Date</th>
              <th className="bg-sky-700">Time</th>
              <th className="bg-sky-700">Treatment</th>
              <th className="bg-sky-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {visitedBookings.map((a, index) => (
              <tr key={a._id}>
                <th>{index + 1}</th>
                <td>{a.patientName}</td>
                <td>{a.date}</td>
                <td>{a.slot}</td>
                <td>{a.treatment}</td>
                <td>
                  <div>
                    <p>
                      <span className="text-primary font-bold">Visited</span>
                    </p>
                    <p>
                      Transaction id:{" "}
                      <span className="text-primary font-bold">
                        {a.transactionId}
                      </span>
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyHistory;
