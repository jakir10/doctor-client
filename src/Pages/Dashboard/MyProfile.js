import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import auth from "../../firebase.init";

const MyProfile = () => {
  const [user] = useAuthState(auth);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // const { data: services, isLoading } = useQuery("services", () =>
  //   fetch("http://localhost:5000/service").then((res) => res.json())
  // );

  const imageStorageKey = "13fef34c3ca2fbe67a4aa7a5b0e8be58";

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
          const profile = {
            name: data.name,
            email: data.email,
            specialty: data.specialty,
            img: img,
          };
          // sending profile info to database
          fetch("http://localhost:5000/profile", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(profile),
          })
            .then((res) => res.json())
            .then((inserted) => {
              console.log("profile", inserted);
              if (inserted.insertedId) {
                toast.success("Profile image successfully added");
                reset();
              } else {
                toast.error("Failed to add Profile image");
              }
            });
        }
      });
  };

  const {
    data: profile,
    isLoading,
    refetch,
  } = useQuery("profiles", () =>
    fetch("http://localhost:5000/profile", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const imageUrl = data.profileImageId
          ? `http://localhost:5000/image/${data.profileImageId}`
          : null;
        if (imageUrl) {
          return fetch(imageUrl)
            .then((res) => res.blob())
            .then((blob) => URL.createObjectURL(blob))
            .then((url) => ({
              ...data,
              profileImageUrl: url,
            }));
        } else {
          return data;
        }
      })
  );

  return (
    <div className="hero min-h-screen bg-base-200">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={user.profileImageUrl}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Name: {user.displayName}</h1>
            <p className="text-2xl py-6">Email : {user.email}</p>
            {/* <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                type="file"
                className="input input-bordered w-full max-w-xs"
                {...register("image", {
                  required: {
                    value: true,
                    message: "Image is Required",
                  },
                })}
              />
              <label className="label">
                {errors.name?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </label>
            </div> */}
            {/* <button className="btn btn-primary">Save</button> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
