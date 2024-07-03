"use client "
import React from 'react';



const Auth = ({ children }) => {
    return (
        <div className="bg-[#D9ECEC] py-[8vh] md:py-[13vh] lg:py-[18vh] flex justify-center items-center">
            <div className=" bg-[#F6F7FB] min-h-[25rem] lg:h-[30rem] w-[90%] sm:w-[25rem] md:w-[30rem] lg:w-[54rem] rounded-lg flex px-0">

                {/* Left Side */}
                <div className="h-[100%] w-[50%] hidden lg:flex justify-center items-center">
                    <img src="./images/img_frame.svg" className='p-[8%]' />
                </div>

                {/* Right Side */}
                <div className="min-h-[100%] py-3 lg:py-0 w-[100%] lg:w-[50%] flex flex-col kodchasan-regular text-black px-[1rem] sm:px-[2.5rem] lg:overflow-y-scroll hide-scrollbar" >
                    <div className='py-[5%]'>
                        <img src='./images/edu_logo.svg' className='h-[4rem]' />

                        {children}

                    </div>


                </div>
            </div>
        </div>

    );
};

export default Auth;
