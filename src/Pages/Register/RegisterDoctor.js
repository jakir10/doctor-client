import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";

const RegisterDoctor = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { data: services, isLoading } = useQuery("services", () =>
    fetch("https://doctors-server-beta.vercel.app/service").then((res) =>
      res.json()
    )
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
          const doctor = {
            // `Dr. ${data.name}`
            name: `${user.displayName}`,
            email: user.email,
            // password: data.password, // add password field to data
            specialty: data.specialty,
            img: img,
            role: "doctor", // add role as doctor
          };
          // sending doctor info to database
          fetch(
            `https://doctors-server-beta.vercel.app/user/${doctor?.email}`,
            {
              method: "PUT",
              headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
              body: JSON.stringify(doctor),
            }
          )
            .then((res) => res.json())
            .then((result) => {
              console.log("result", result);
              if (result.ok !== 0) {
                toast.success("Doctor account updated");
                reset();
              } else {
                toast.error("Failed to update the doctor account");
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg"
      >
        <div className="mb-4">
          <input
            // {...register("name", { required: true })}
            placeholder="Name"
            disabled
            value={user?.displayName || ""}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">
              This field is required
            </p>
          )}
        </div>
        <div className="mb-4">
          <input
            // {...register("email", { required: true })}
            placeholder="Email"
            disabled
            value={user?.email || ""}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">
              This field is required
            </p>
          )}
        </div>
        <div className="mb-4">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Specialty</span>
            </label>
            <select
              {...register("specialty", { required: true })}
              className="select input-bordered w-full max-w-xs"
            >
              {services.map((service) => (
                <option key={service._id} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
          {errors.specialty && (
            <p className="text-red-500 text-xs italic">
              This field is required
            </p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="file"
            {...register("image", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.image && (
            <p className="text-red-500 text-xs italic">
              This field is required
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Doctor Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterDoctor;
