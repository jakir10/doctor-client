import React from 'react';

const Review = ({ review }) => {
    const { rating,location, name, userReview , img} = review;
    return (
        // <div className=" card lg:max-w-lg bg-base-100 shadow-xl">
        //     <div className="card-body">
        //         <p>{userReview}</p>
        //         <p>Ratings: {rating}</p>
        //         <div className=" ">
        //             <div>
        //                 <h3><p>Name: {name}</p></h3>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="card lg:max-w-lg bg-base-100 shadow-xl">
            <div className="card-body">
                <p>{userReview}</p>
                <p>Ratings: {rating}</p>
                <div className="flex items-center place-content-center">
                    <div className="avatar">
                        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 mr-5">
                            <img src={img} alt="" />
                        </div>
                    </div>
                    <div>
                        <h4 className='text-xl'>{name}</h4>
                        <p>{location}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;