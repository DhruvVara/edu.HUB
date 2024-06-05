import React from 'react';



const Auth = ({ children }) => {
    return (
        <div className="bg-[#D9ECEC] py-[18vh] flex justify-center items-center">
            <div className=" bg-[#F6F7FB] h-[30rem] w-[22rem] sm:w-[25rem] md:w-[30rem] lg:w-[54rem] rounded-lg flex px-0">

                {/* Left Side */}
                <div className="h-[100%] w-[50%] hidden lg:flex justify-center items-center">
                    <img src="./images/img_frame.svg" className='p-[8%]' />
                </div>

                {/* Right Side */}
                <div className="min-h-[100%] py-3 lg:py-0 w-[100%] lg:w-[50%] flex flex-col kodchasan-regular text-black px-[2.5rem] overflow-y-scroll hide-scrollbar" >
                    <div className='pt-[5%]'>
                        <img src='./images/edu_logo.svg' className='h-[4rem]' />
                        <h2 className="text-[1.7rem] font-bold">Welcome Back</h2>

                        <div className="flex gap-1 h-[2px] mt-[3px] w-full">
                            <span className="inline-block w-[40px] h-[1.8px] rounded-xl bg-[#FF7F50]"></span>
                            <span className="inline-block w-[10px] h-[1.8px] rounded-xl bg-[#FF7F50]"></span>
                        </div>
                        {children}

                    </div>


                </div>
            </div>
        </div>

    );
};

export default Auth;
