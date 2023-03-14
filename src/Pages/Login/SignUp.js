import React from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
import Loading from "../Shared/Loading";
import { Link, useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";
import img from "../../assets/images/signup.jpg";

const SignUp = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  //  user profile update
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  const [token] = useToken(user || gUser);

  const navigate = useNavigate();

  let signInError;
  //  loading spinner
  if (loading || gLoading || updating) {
    return <Loading></Loading>;
  }
  // error handle google & eamil & updating error
  if (error || gError || updateError) {
    signInError = (
      <small>
        <p className="text-red-500">
          {error?.message || gError?.message || updateError?.message}
        </p>
      </small>
    );
  }

  if (token) {
    navigate("/appointment");
  }
  // if (user || gUser) {
  //     console.log(user || gUser);
  //     navigate('/');
  // }

  const onSubmit = async (data) => {
    console.log(data);
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
    console.log("upadte done");
    // navigate('/appointment')
  };
  return (
    <div className="hero w-full my-4">
      <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
        {/*  */}
        <div className="text-center lg:text-left">
          <img className="w-3/4" src={img} alt="" />
        </div>
        {/*  */}
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 px-6 py-10">
          <h2 className="text-center text-primary text-2xl font-bold">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name field with error massage */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
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
              />
              <label className="label">
                {errors.name?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </label>
            </div>
            {/* Email field with error massage validation */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full max-w-xs"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is Required",
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Provide a valid Email Address",
                  },
                })}
              />
              <label className="label">
                {errors.email?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>
            {/* password field with error massage validation */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Your Password"
                className="input input-bordered w-full max-w-xs"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is Required",
                  },
                  minLength: {
                    value: 6,
                    message: "Must be 6 characters or longer",
                  },
                })}
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>

            {signInError}
            <input
              className="btn btn-primary w-full max-w-xs text-white"
              type="submit"
              value="Sign Up"
            />
          </form>
          <small>
            <p className="my-2">
              Already Have an Account{" "}
              <Link className="text-primary font-semibold" to="/login">
                Please Login
              </Link>
            </p>
          </small>
          <div className="divider">OR</div>
          <button
            onClick={() => signInWithGoogle()}
            className="btn btn-outline"
          >
            Continue With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
