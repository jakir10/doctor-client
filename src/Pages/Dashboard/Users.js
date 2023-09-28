import React from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import UserTable from "./UserTable";

const Users = () => {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("users", () =>
    fetch("https://doctors-server-beta.vercel.app/user", {
      method: "GET",
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
      <h2 className="text-2xl">All Users: {users.length}</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <UserTable
                key={user._id}
                user={user}
                index={index}
                refetch={refetch}
              ></UserTable>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
