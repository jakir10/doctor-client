import React from 'react';

const Partners = () => {
    return (
        <>





            <h2 className='my-24 text-primary text-center text-2xl font-bold uppercase'>Our Partners</h2>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10  mb-10'>

                <div className="card lg:max-w-lg bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                    <img src="https://i.ibb.co/PmKbCxM/p1.webp" alt="Partner-Logo-1" border="0" />
                    </figure>                    
                </div>
                <div className="card lg:max-w-lg bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                    <img src="https://i.ibb.co/QJVD0cL/p2.webp" alt="Partner-Logo-2" border="0" />
                    </figure>                    
                </div>
                <div className="card lg:max-w-lg bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src="https://i.ibb.co/tP5y0p7/p3.webp" alt="Partner-Logo-3" border="0" />
                    </figure>                    
                </div>
                <div className="card lg:max-w-lg bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                    <img src="https://i.ibb.co/9WBvNSk/p4.webp" alt="Partner-Logo-4" border="0" />
                    </figure>
                </div>
            </div>
        </>
    );
};

export default Partners;