import React, { useEffect, useState } from "react";
import axios from "axios";

const AllPatients = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios
      // .get(`https://doctors-server-beta.vercel.app/bookings`)
      .get(`https://doctors-server-beta.vercel.app/bookings/all`)
      .then((response) => setBookings(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const results = bookings.filter(
      (booking) =>
        booking.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.date.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, bookings]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = (event) => {
    event.preventDefault();
    setSearchResults(
      bookings.filter(
        (booking) =>
          booking.patientName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          booking.date.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search by patient name or date"
          className="form-input rounded-l-md w-1/2"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {/* <button
          className="btn btn-primary rounded-r-md ml-2"
          onClick={handleSearchClick}
        >
          Search
        </button> */}
      </div>
      <h1>All Patient Appointments {searchResults.length}</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="text-white">
            <tr>
              <th className="bg-sky-700"></th>
              <th className="bg-sky-700">Name</th>
              <th className="bg-sky-700">Date</th>
              <th className="bg-sky-700">Time</th>
              <th className="bg-sky-700">Treatment</th>
              <th className="bg-sky-700">Payment</th>
              <th className="bg-sky-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((a, index) => (
              <tr key={a._id}>
                <th>{index + 1}</th>
                <td>{a.patientName}</td>
                <td>{a.date}</td>
                <td>{a.slot}</td>
                <td>{a.treatment}</td>
                <td>
                  {a.price && a.paid && (
                    <div>
                      <p>
                        <span className="text-primary font-bold">Paid</span>
                      </p>
                    </div>
                  )}
                  {a.price && !a.paid && (
                    <div>
                      <p>
                        <span className="text-error font-bold">Not paid</span>
                      </p>
                    </div>
                  )}
                </td>
                <td>
                  {a.price && !a.paid && (
                    <button className="btn btn-xs btn-error">
                      Not Visited
                    </button>
                  )}
                  {a.price && a.paid && (
                    <button className="btn btn-xs btn-primary">Visited</button>
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

export default AllPatients;
