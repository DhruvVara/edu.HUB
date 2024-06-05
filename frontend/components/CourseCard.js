import React from 'react'

const CourseCard = () => {
    return (
        <div className='h-[16rem] w-[16rem] p-[0.6rem] bg-[green] rounded-lg'>
            <img src='./images/landingPage/sampleCourseImg.svg' className='rounded-md object-fit w-full h-[55%]' />
            {/* <div className=''>
                <h3 className='text-[1.2rem] font-semibold line-clamp-2'>Title asdads as da  rwer sdfsdf</h3>
            </div> */}

            <div className='flex flex-col gap-[3px] mt-2'>
                <div className='flex justify-between  items-end'>
                    <h3 className='line-clamp-2 text-[1.2rem] font-bold'>title</h3>
                    {/* <p className='text-[13px] text-[#708090]'>123456</p> */}
                </div>

                <h4 className='text-[#708090] text-[15px]'>By instructor</h4>

                <div className='flex justify-between'>
                    <h3>4.4</h3>
                    <h2>₹499/-</h2>
                </div>

            </div>
        </div>
    )
}

export default CourseCard;
