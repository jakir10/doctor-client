import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { toast } from "react-toastify";

const AppointmentModal = ({ date, treatment, setTreatment, refetch }) => {
  const { _id, name, slots, price } = treatment;
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [user, loading, error] = useAuthState(auth);

  const formattedDate = format(date, "PP");

  useEffect(() => {
    // Fetch doctors data from backend
    fetch("https://doctors-server-beta.vercel.app/user/doctor")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleBooking = (event) => {
    event.preventDefault();
    const slot = event.target.slot.value;
    console.log(_id, name, slot, price, selectedDoctor);

    const booking = {
      treatmentId: _id,
      treatment: name,
      date: formattedDate,
      slot,
      price,
      patient: user.email,
      patientName: user.displayName,
      phone: event.target.phone.value,
      doctor: selectedDoctor,
    };

    fetch("https://doctors-server-beta.vercel.app/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        // for closing the modal
        if (data.success) {
          toast(
            `Appointment is set, ${formattedDate} at ${slot} with Dr. ${selectedDoctor}`
          );
        } else {
          toast.error(
            `Already have an Appointment on, ${data.booking?.date} at ${data.booking?.slot} with Dr. ${data.booking?.doctor}`
          );
        }
        setTreatment(null);
        refetch();
      });
  };

  const handleSpecialtyChange = (event) => {
    setSpecialty(event.target.value);
    setSelectedDoctor("");
  };

  const filteredDoctors = doctors.filter(
    (doctor) => doctor.specialty === specialty
  );

  return (
    <div>
      <input type="checkbox" id="appointment-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            htmlFor="appointment-modal"
            className="btn btn-sm btn-error btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg text-sky-600">
            Appointment for: {name}
          </h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-3 justify-items-center mt-2 "
          >
            <input
              type="text"
              disabled
              value={format(date, "PP")}
              className="input input-bordered w-full max-w-xs"
            />
            <select
              name="slot"
              className="select select-bordered w-full max-w-xs"
            >
              {slots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <select
              name="doctor"
              className="select select-bordered w-full max-w-xs"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
            >
              <option value="">Select a Doctor</option>
              {doctors.map((doctor) =>
                doctor.specialty === name ? (
                  <option key={doctor._id} value={doctor.name}>
                    {doctor.name}
                  </option>
                ) : null
              )}
            </select>
            <input
              type="text"
              name="name"
              disabled
              value={user?.displayName || ""}
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="email"
              name="email"
              disabled
              value={user?.email || ""}
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              name="price"
              disabled
              value={price || ""}
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="submit"
              value="Get Appoitment"
              className="btn btn-primary w-full max-w-xs"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
