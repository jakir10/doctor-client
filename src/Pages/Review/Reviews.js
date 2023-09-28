import React, { useEffect, useState } from "react";
import Review from "./Review";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://doctors-server-beta.vercel.app/review")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <section className="my-24 text-center ">
      <div>
        <h2 className="text-2xl text-primary font-bold uppercase">
          All Reviews
        </h2>
        <h2 className="text-xl text-neutral font-bold uppercase">
          What Our Patients say
        </h2>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {
          // reviews.map(review => <Review
          //     key={review._id}
          //     review={review}
          // ></Review>)
          reviews.map((review) => (
            <Review key={review._id} review={review}></Review>
          ))
        }
      </div>
    </section>
  );
};

export default Reviews;
