import React from "react";

const DoctorsCard = ({ doctor }) => {
  const { name, email, specialty, img } = doctor;
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl ">
        <figure className="px-10 pt-10">
          <img src={img} alt="Shoes" className="rounded-xl h-80" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{}</h2>
          <p>{name}</p>
          <p>{specialty}</p>
          <p>{email}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorsCard;
