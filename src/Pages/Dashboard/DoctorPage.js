import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const DoctorPage = () => {
  const [user] = useAuthState(auth);
  const [bookings, setBookings] = useState([]);
  const [totalPaidAmount, setTotalPaidAmount] = useState(0);

  useEffect(() => {
    const doctor = user?.displayName; // Replace with the correct doctor value
    console.log(doctor);
    const url = `http://localhost:5000/bookings?doctor=${doctor}`;
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get(url);
        setBookings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    const paidBookings = bookings.filter((booking) => booking.paid);
    const paidAmounts = paidBookings.map((booking) => booking.price);
    const totalPaid = paidAmounts.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    setTotalPaidAmount(totalPaid);
  }, [bookings]);

  // Wait for the DOM to load
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const doctorName = form.elements.doctorName.value;
    const medicine = form.elements.medicine.value;
    const bookingId = form.elements.bookingId.value;

    const data = {
      doctorName: user.displayName,
      medicine,
      bookingId: bookingId,
    };

    fetch("http://localhost:5000/prescription", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        // Clear the form
        form.reset();
        toast.success("Medicine added successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("There was an error adding the medicine");
      });
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Doctor Page</h1>
        <div className="bg-blue-200 rounded-lg p-4">
          <p className="text-lg font-bold">Total Earning Amount:</p>
          <p className="text-4xl font-bold">{totalPaidAmount}</p>
        </div>
      </div>
      <p className="mb-2">Doctor appointments: {bookings.length}</p>
      <div className="flex flex-row justify-between items-center mb-2 bg-gray-200 p-2">
        <div className="w-1/12 font-bold text-center">No</div>
        <div className="w-2/12 font-bold text-center">Date</div>
        <div className="w-2/12 font-bold text-center">Time</div>
        <div className="w-1/12 font-bold text-center">Price</div>
        <div className="w-2/12 font-bold text-center">Patient</div>
        <div className="w-2/12 font-bold text-center">Reason</div>
        <div className="w-2/12 font-bold text-center">Payment</div>
      </div>
      <ul>
        {bookings.map((booking, index) => (
          <li
            key={booking._id}
            className="flex flex-row justify-between items-center mb-2"
          >
            <div className="w-1/12 text-center">{index + 1}</div>
            <div className="w-2/12 text-center">{booking.date}</div>
            <div className="w-2/12 text-center">{booking.slot}</div>
            <div className="w-1/12 text-center">{booking.price}</div>
            <div className="w-2/12 text-center">{booking.patientName}</div>
            <div className="w-2/12 text-center">{booking.treatment}</div>
            <div className="w-2/12 text-center">
              {booking.price && !booking.paid && (
                <p>
                  <span className="text-error font-bold">Not paid</span>
                </p>
              )}
              {booking.price && booking.paid && (
                <div className="flex">
                  <p>
                    <span className="text-primary font-bold">Paid</span>
                  </p>
                  {/* <label
                    for={`my-modal-${booking._id}`}
                    class="btn btn-sm btn-primary text-white uppercase bg-gradient-to-r from-cyan-500 to-blue-500"
                  >
                    Prescribe
                  </label> */}

                  <input
                    type="checkbox"
                    id={`my-modal-${booking._id}`}
                    class="modal-toggle"
                  />

                  {/* <!-- Put this part before </body> tag --> */}
                  {/* <input type="checkbox" id="my-modal-3" class="modal-toggle" /> */}
                  {/* <div class="modal">
                    <div class="modal-box relative">
                      <label
                        for={`my-modal-${booking._id}`}
                        class="btn btn-sm btn-circle absolute right-2 top-2"
                      >
                        ✕
                      </label>
                      <h3 class="text-lg font-bold">
                        Prescription for: {booking.patientName}
                      </h3>
                      <form id="myForm" class="mt-4" onSubmit={handleSubmit}>
                        <div class="flex mb-4">
                          <label class="w-1/3" for="">
                            Doctor:
                          </label>
                          <input
                            type="text"
                            name="doctorName"
                            disabled
                            placeholder={user.displayName}
                            class="input input-bordered w-2/3 ml-2"
                            required
                          />
                        </div>
                        <div class="flex mb-4">
                          <label class="w-1/3" for="">
                            Medicine:
                          </label>
                          <textarea
                            name="medicine"
                            placeholder="Medicine"
                            class="textarea textarea-bordered w-2/3 ml-2"
                            required
                          ></textarea>
                        </div>
                        <input
                          type="hidden"
                          name="bookingId"
                          value={booking._id}
                        />
                        <button
                          type="submit"
                          class="btn btn-sm btn-primary text-white uppercase bg-gradient-to-r from-cyan-500 to-blue-500 w-full"
                        >
                          Add Medicine
                        </button>
                      </form>
                    </div>
                  </div> */}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorPage;
