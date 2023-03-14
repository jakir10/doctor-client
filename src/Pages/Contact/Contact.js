import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import "./Contact.css";
import Footer from "../Shared/Footer";
import emailjs from "@emailjs/browser";

const Contact = () => {
  // const [contact, setContact] = useState({
  //     name: '',
  //     email: '',
  //     message: ''
  //   });

  //   const handleChange = e => {
  //     setContact({
  //       ...contact,
  //       [e.target.name]: e.target.value
  //     });
  //   };

  //   const handleSubmit = e => {
  //     e.preventDefault();
  //     console.log(contact);
  //     setContact({
  //       name: '',
  //       email: '',
  //       message: ''
  //     });
  //   };
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    const name = e?.target?.name?.value;
    const email = e?.target?.email?.value;
    const message = e?.target?.message?.value;

    if (
      !name ||
      !email ||
      !message ||
      !/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)
    ) {
      return toast.error("Please input valid information!");
    } else {
      toast.success("Thanks for Contact us!");
    }

    emailjs
      .sendForm(
        "service_sbsrg3r",
        "template_dcck86v",
        form.current,
        "Kn-mjWewQZ0mwDrbc"
      )
      .then(
        (result) => {
          console.log(result?.text);
        },
        (error) => {
          console.log(error?.text);
        }
      );

    e.target.reset();
  };

  return (
    <div className="p-10">
      {/* <h1 className="text-2xl font-bold mb-5">Contact Us</h1> */}
      {/* <form className="bg-white p-10">
        <div className="mb-5">
          <label className="block font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="w-full border border-gray-400 p-2"
            id="name"
            type="text"
            placeholder="Your Name"
          />
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full border border-gray-400 p-2"
            id="email"
            type="email"
            placeholder="Your Email"
          />
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            className="w-full border border-gray-400 p-2"
            id="message"
            rows="5"
            placeholder="Your message here..."
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form> */}

      <form
        ref={form}
        onSubmit={sendEmail}
        className="w-11/12 text-black flex flex-col gap-2 mx-auto"
      >
        <h2
          className={`text-4xl font-bold pb-3 text-primary ${
            localStorage.getItem("theme") === ("light" || null) && "text-black"
          } ${localStorage.getItem("theme") === "dark" && "text-white"}`}
        >
          Contact Us
        </h2>
        <input
          className="w-full border border-gray-400 p-2"
          type="text"
          placeholder="Your Name"
          name="name"
          id=""
        />
        <input
          className="w-full border border-gray-400 p-2"
          type="email"
          placeholder="Your Email"
          name="email"
          id=""
        />
        <textarea
          className="w-full border border-gray-400 p-2"
          name="message"
          id=""
          cols="30"
          rows="6"
          placeholder="Your message here..."
        />
        <button
          type="submit"
          value={"Send Message"}
          className="bg-blue-400 hover:bg-blue-600 text-white text-xl font-bold py-2 px-4 rounded"
        >
          Send
        </button>
      </form>
      <Footer></Footer>
    </div>
  );
};

export default Contact;
