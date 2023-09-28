import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";

const MyReview = () => {
  // const { _id, name} = user;
  const [user] = useAuthState(auth);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const { data: review, isLoading } = useQuery("reviews", () =>
    fetch("https://doctors-server-beta.vercel.app/review").then((res) =>
      res.json()
    )
  );

  const imageStorageKey = "13fef34c3ca2fbe67a4aa7a5b0e8be58";

  // const onSubmit = async data => {
  //     console.log(data);
  //     const url = `https://doctors-server-beta.vercel.app/review`;

  //     fetch(url, {
  //         method: 'POST',
  //         headers: {
  //             'content-type': 'application/json'
  //         },

  //         body: JSON.stringify(data)
  //     })
  //         .then(res => res.json())
  //         .then(inserted => {
  //             if (inserted.insertedId) {
  //                 toast.success('Review added successfully')
  //                 reset();
  //             }
  //             else {
  //                 toast.error('Review not Added')
  //             }
  //         })
  // }
  // if (isLoading) {
  //     return <Loading></Loading>
  // }
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
          const review = {
            name: data.name,
            userReview: data.userReview,
            rating: data.rating,
            location: data.location,
            img: img,
          };
          // sending doctor info to database
          fetch("https://doctors-server-beta.vercel.app/review", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(review),
          })
            .then((res) => res.json())
            .then((inserted) => {
              console.log("doctor", inserted);
              if (inserted.insertedId) {
                toast.success("New Review successfully added");
                reset();
              } else {
                toast.error("Failed to add the Review");
              }
            });
        }
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    // <div>
    //     <h2>Post a Reviews</h2>
    // </div>

    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-primary text-2xl">Add Review</h2>
      {/* Name field with error massage */}
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        {/* disabled value={user?.displayName || ''} */}
        <input
          type="text"
          placeholder="Your Name"
          className="input input-bordered w-full max-w-xs"
          {...register("name", {
            required: {
              value: true,
              message: "Name is Required",
            },
          })}
          value={user.displayName || " "}
        />
        <label className="label">
          {errors.name?.type === "required" && (
            <span className="label-text-alt text-red-500">
              {errors.name.message}
            </span>
          )}
        </label>
      </div>
      {/* review */}
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Review</span>
        </label>
        <input
          type="text"
          placeholder="write Review"
          className="input input-bordered w-full max-w-xs"
          {...register("userReview", {
            required: {
              value: true,
              message: "Review is Required",
            },
          })}
        />
        <label className="label">
          {errors.name?.type === "required" && (
            <span className="label-text-alt text-red-500">
              {errors.userReview.message}
            </span>
          )}
        </label>
      </div>
      {/* Rating field */}
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Rating</span>
        </label>
        <input
          type="text"
          placeholder="giva a rating 1-5"
          className="input input-bordered w-full max-w-xs"
          {...register("rating", {
            required: {
              value: true,
              message: "Rating is Required",
            },
          })}
        />
        <label className="label">
          {errors.name?.type === "required" && (
            <span className="label-text-alt text-red-500">
              {errors.rating.message}
            </span>
          )}
        </label>
      </div>
      {/* Location field */}
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Location</span>
        </label>
        <input
          type="text"
          placeholder="giva Your Location"
          className="input input-bordered w-full max-w-xs"
          {...register("location", {
            required: {
              value: true,
              message: "Location is Required",
            },
          })}
        />
        <label className="label">
          {errors.name?.type === "required" && (
            <span className="label-text-alt text-red-500">
              {errors.rating.message}
            </span>
          )}
        </label>
      </div>

      <div className="form-control w-full max-w-xs">
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
      </div>

      <input
        className="btn btn-primary w-full max-w-xs text-white mt-5"
        type="submit"
        value="Post Review"
      />
    </form>
  );
};

export default MyReview;
<h2>My Reviews</h2>;
