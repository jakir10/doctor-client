import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const UserTable = ({ user, index, refetch }) => {
  const { _id, email, role } = user;
  const [users, setUsers] = useState([]);
  const makeAdmin = () => {
    fetch(`http://localhost:5000/user/admin/${email}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 403) {
          toast.error("Failed to Make an admin");
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          toast.success(`Successfully made an admin`);
        }
      });
  };

  const handleDelete = (id) => {
    const proceed = window.confirm("Are You sure! Want to Remove This User");
    if (proceed) {
      fetch(`http://localhost:5000/user/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("deleted successfully");
            const remaining = users.filter((odr) => odr._id !== id);
            setUsers(remaining);
          }
        });
    }
  };

  return (
    <tr>
      <th>{index + 1}</th>
      <td>{email}</td>
      <td>
        {role !== "admin" && (
          <button onClick={makeAdmin} className="btn btn-xs hover:bg-green-700">
            Make Admin
          </button>
        )}
      </td>
      <td>
        <button
          onClick={() => handleDelete(_id)}
          className="btn btn-xs btn-primary content-center  hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full"
        >
          Remove User
        </button>
      </td>
    </tr>
  );
};

export default UserTable;
