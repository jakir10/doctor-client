import React from "react";
import { toast } from "react-toastify";

const DoctorTable = ({ doctor, index, refetch, setDeletingDoctor }) => {
  const { name, specialty, img, email } = doctor;

  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <div className="avatar">
          <div className="w-24 rounded">
            <img src={img} alt={name} />
          </div>
        </div>
      </td>
      <td>{name}</td>
      <td>{specialty}</td>
      <td>{email}</td>
      <td>
        <label
          onClick={() => setDeletingDoctor(doctor)}
          for="delete-confirm-modal"
          className="btn btn-xs btn-error"
        >
          Delete
        </label>
      </td>
    </tr>
  );
};

export default DoctorTable;
