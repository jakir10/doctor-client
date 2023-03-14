import React from "react";
import icon1 from "../../assets/images/icon1.png";
import icon2 from "../../assets/images/icon2.png";
import icon3 from "../../assets/images/icon3.png";
import Service from "./Service";

const Services = () => {
  const services = [
    {
      _id: 1,
      name: "Fluoride Treatment",
      description:
        "Fluoride treatment is a preventive dental procedure that involves applying fluoride to the teeth to strengthen the enamel and prevent decay.",
      img: icon1,
    },
    {
      _id: 2,
      name: "Cavity Filling",
      description:
        "Cavity filling is a common dental procedure in which a dentist removes decayed tooth material and fills the cavity with a dental material.",
      img: icon2,
    },
    {
      _id: 3,
      name: "Teeth Whitening",
      description:
        "Teeth whitening is a cosmetic dental procedure that involves removing stains and discoloration from the teeth to improve their appearance.",
      img: icon3,
    },
  ];
  return (
    <div className="my-28">
      <div className="text-center">
        <h3 className="text-primary text-xl font-bold uppercase">
          Our Services
        </h3>
        <h3 className="text-4xl text-sky-500">Services we provide</h3>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Service key={service._id} service={service}></Service>
        ))}
      </div>
    </div>
  );
};

export default Services;
