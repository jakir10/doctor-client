import React from 'react';
import person1 from '../../assets/images/person-1.jpg';
import person2 from '../../assets/images/person-2.jpg';
import person3 from '../../assets/images/person-3.jpg';
import Review from './Review';

const PatientReviews = () => {
    const reviews = [
        {
            _id: 1,
            name: 'Eisrat Zahan',
            review: '',
            location: 'Barisal',
            img: person1
        },
        {
            _id: 2,
            name: 'Omme Hani',
            review: '',
            location: 'Comilla',
            img: person2
        },
        {
            _id: 3,
            name: 'Jakir Hossain',
            review: '',
            location: 'Dhaka',
            img: person3
        },
    ]
    return (
        <section className='my-28'>
            <div>
                <div>
                    <h4 className="text-xl text-primary font-bold">Patient Reviews</h4>
                    <h3 className='text-3xl'>Our Patients say</h3>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    reviews.map(review => <Review
                        key={review._id}
                        review={review}
                    ></Review>)
                }
            </div>
        </section>
    );
};

export default PatientReviews;