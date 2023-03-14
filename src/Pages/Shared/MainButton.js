import React from 'react';

const MainButton = ({ children }) => {
    return (
        <button className="btn btn-primary text-white bg-gradient-to-r from-cyan-500 to-blue-500 ">{children}</button>
    );
};

export default MainButton;