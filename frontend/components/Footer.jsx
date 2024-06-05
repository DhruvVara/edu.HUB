import React from 'react'
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from 'react-icons/io5'

const Footer = () => {
    return (
        <>
            <footer className='w-full flex flex-col-reverse gap-4 lg:grid lg:grid-cols-4 bg-[#D9ECEC] px-[3%] py-[30px] lg:py-[50px]'>

                <div className='flex flex-col lg:justify-center items-start lg:items-center'>
                    <img src='./images/edu_logo.svg' className='h-[4rem]' />
                    <p className='text-[#848484] text-[0.8rem] mt-[0.5rem]'>Holden Street San Deigo, CA 9389 <br />Call us: 1800-323-3829</p>

                    <div className=' w-full flex items-start lg:ml-[9rem] mt-[1rem] gap-5 text-[1.4rem] text-[#708090]'>
                        <IoLogoFacebook />
                        <IoLogoInstagram />
                        <IoLogoTwitter />
                    </div>

                </div>

                <div className='flex flex-col gap-8 lg:col-span-2 lg:grid lg:grid-cols-2'>
                    <div className='flex flex-col lg:items-center'>
                        <span>
                            <h3 className='text-[1.3rem] font-semibold'>Class</h3>
                            <ul className='mt-2 text-[#848484] leading-8'>
                                <li>UI/UX Design</li>
                                <li>Development</li>
                                <li>Marketing</li>
                                <li>Language</li>
                            </ul>
                        </span>
                    </div>

                    <div className='flex flex-col lg:items-center'>
                        <span>
                            <h3 className='text-[1.3rem] font-semibold'>Our Company</h3>
                            <ul className='mt-2 text-[#848484]  leading-8'>
                                <li>About Us</li>
                                <li>Career</li>
                                <li>Media</li>
                                <li>Contact</li>
                            </ul>
                        </span>
                    </div>

                </div>


                <div className=''>
                    Follow
                </div>
            </footer >
            {/* <p className='w-full text-center py-1'> © edu.HUB | 2024</p> */}
        </>
    )
}

export default Footer
