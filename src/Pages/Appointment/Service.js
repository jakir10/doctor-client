import React from 'react';

const Service = ({ service, setTreatment }) => {
    const { name, slots, price } = service;
    return (
        <div className="card lg:max-w-lg bg-base-100 shadow-xl">
            <div className="card-body text-center">
                <h2 className="text-xl font-bold text-sky-600">{name}</h2>
                <p>{
                    slots.length > 0
                        ? <span>{slots[0]}</span>
                        : <span className='text-red-500'>Today Appointments Full</span>
                }
                </p>
                <p>{slots.length} {slots.length > 1 ? 'Slots' : 'Slot'} available</p>
                <p>Price: <span className='text-blue-600'>${price}</span></p>
                <div className="card-actions justify-center">
                    <label
                        htmlFor="appointment-modal"
                        disabled={slots.length === 0}
                        onClick={() => setTreatment(service)}
                        className="btn btn-sm btn-primary text-white uppercase bg-gradient-to-r from-cyan-500 to-blue-500">Get Appointment</label>
                </div>
            </div>
        </div>
    );
};

export default Service;