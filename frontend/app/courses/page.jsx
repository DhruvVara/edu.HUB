"use client"

import FilterAccordian from '@/components/FilterAccordian';
import React, { useEffect, useState } from 'react'


const Page = () => {

    const [checkBox, setCheckBox] = useState({
        courses: [],
        ratings: []
    });

    const handleChange = (e) => {
        console.log(e.target.checked, e.target.name)
        if (e.target.checked) {
            setCheckBox({ ...checkBox, [e.target.name]: [...checkBox[e.target.name], e.target.value] });
        } else {
            let newState = checkBox[e.target.name].filter(ele => ele != e.target.value);
            setCheckBox({ ...checkBox, [e.target.name]: newState });
        }
    }

    const checkBoxValues = [
        { heading: "Courses", filter: [{ title: "Web", handleChange: handleChange }], checked: [checkBox.courses] },
        { heading: "Ratings", filter: [{ title: "4+", handleChange: handleChange }], checked: [checkBox.ratings] }
    ]


    return (
        <div className='w-full px-[3%] flex'>


            {/* filters */}
            <div className='w-[25%] py-5 px-8'>

                {checkBoxValues.map((itm) => {
                    return <FilterAccordian heading={itm.heading} filters={itm.filter} checked={itm.checked} />
                })}
            </div>

            {/* Course List */}
            <div className='w-[75%]'>

            </div>
        </div>
    )
}

export default Page;


const CourseCard = () => {
    return (
        <>
        
        </>
    )
}