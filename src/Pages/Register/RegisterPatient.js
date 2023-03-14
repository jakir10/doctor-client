import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";

const RegisterPatient = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { data: services, isLoading } = useQuery("services", () =>
    fetch("http://localhost:5000/service").then((res) => res.json())
  );

  const imageStorageKey = "13fef34c3ca2fbe67a4aa7a5b0e8be58";
  const [user, loading, error] = useAuthState(auth);

  const onSubmit = async (data) => {
    console.log("data", data);
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("imagebb", result);
        if (result.success) {
          const img = result.data.url;
          const patient = {
            name: user.displayName,
            email: user.email,
            img: img,
            role: "patient",
          };
          // sending patient info to database
          fetch("http://localhost:5000/patient", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(patient),
          })
            .then((res) => res.json())
            .then((inserted) => {
              console.log("patient", inserted);
              if (inserted.insertedId) {
                toast.success("New Patient account created");
                reset();
              } else {
                toast.error("Failed to create the patient account");
              }
            });
        }
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-1/2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              //   {...register("name", { required: true })}
              placeholder="Name"
              disabled
              value={user?.displayName || ""}
            />
            {/* {errors.name && (
              <p className="text-red-500 text-xs italic">
                This field is required
              </p>
            )} */}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              //   {...register("email", { required: true })}
              placeholder="Email"
              disabled
              value={user?.email || ""}
            />
            {/* {errors.email && (
              <p className="text-red-500 text-xs italic">
                This field is required
              </p>
            )} */}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="image"
            >
              Image
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="file"
              {...register("image", { required: true })}
            />
            {errors.image && (
              <p className="text-red-500 text-xs italic">
                This field is required
              </p>
            )}
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Patient Account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterPatient;
