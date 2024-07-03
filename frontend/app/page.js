import CourseCard from "@/components/CourseCard";


const company_logo = ["google", "grab", "airbnb", "netflix", "aws", "facebook"];

const whyChooseInfo = [{ img: "course_accessibility", title: "Course Accessibility", description: "Select a suitable course form the vast area of other courses." }, { img: "practical_learning", title: "Practical Learning", description: "Interact yourself with the real-world while doing the real-world project." }, { img: "recorded_session", title: "Recorded Session", description: "Don’t worry about it, access to every sessions on the chosen course." }, { img: "schedule_learning", title: "Schedule Learning", description: "Learn at whatever and whenever at your suitable time and place." }]

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <main className="min-h-[88dvh] w-[100vw] overflow-x-hidden relative">
        <div className="main_bg bg-[#7dc5c5] w-full h-full flex flex-col lg:flex-row overflow-hidden">

          {/* left */}
          <div className="w-full lg:w-[50%] absolute top-[150px] lg:top-0 flex justify-center lg:items-end lg:relative">
            <div className="lg:absolute right-[5%] lg:bottom-[20%] mr-[1%] sm:mr-[15%] lg:mr-[5%] xl:mr-[8%] 2xl:mr-[10%]">
              <h2 className="leading-[32px] lg:leading-[45px] xl:leading-[55px] text-[1.4rem] md:text-[1.8rem] lg:text-[2.2rem] xl:text-[2.5rem]">Investing in<br /> Knowledge and<br /><span className="text-[#008080]"> Your Future</span></h2>
              <p className="w-[220px] md:w-[300px] lg:w-[350px] mt-2 sm:mt-3 lg:mt-5 text-[#708090] text-[0.7rem] md:text-[0.8rem] lg:text-[1rem]">With the help of E-Learning, create your own path and driven on your skills on your own to achieve your seek</p>
              <button className="py-2 lg:py-3 px-5 lg:px-7 text-[0.8rem] lg:text-[1rem] mt-3 lg:mt-5 rounded-lg bg-gradient-to-r from-[#008080] to-[#89E8E8] text-white">Enroll Now </button>
            </div>
          </div>


          {/* right */}
          <div className=" w-full lg:w-[50%] absolute bottom-0 lg:top-0 lg:relative">
            <div className=" absolute left-[35%] md:left-[42%] lg:left-[13%] bottom-0">
              <img src="./images/landingPage/lady.svg" className="h-[18rem] md:h-[23rem] lg:h-full" />

              {/* <div className="px-2 py-1 rounded-lg backdrop-filter backdrop-blur-md border border-[#008080] left-[27%] bottom-[33%] absolute flex gap-5">
                <img src="./images/landingPage/msg.svg" />
                <div className="">
                  <h3 className="text-[#008080]">Congratulations</h3>
                  <h4>Your admission completed</h4>
                </div>
              </div> */}

            </div>

          </div>

        </div>
      </main>

      {/* Companies Logo */}
      <section className=" my-[20px] grid grid-cols-3 gap-[30px] lg:grid-cols-6 px-[6%] lg:px-[3%] place-items-stretch">
        {company_logo.map((name) => {
          return <img key={name} src={`./images/landingPage/companyLogo/${name}.svg`} className="h-[3.2rem] lg:h-[3rem] xl:h-[4rem]" />
        })}
      </section>

      {/* why choose us */}
      <section className="grid grid-cols-1 gap-[5rem] lg:gap-0 place-items-center lg:grid-cols-2 mt-[3rem]">

        {/* Left */}
        <div className="flex flex-col gap-2 justify-center w-[75%] md:w-[65%] lg:w-full items-center flex-wrap">
          <h2 className=" text-[1.6rem] sm:text-[2rem] lg:text-[2.3rem] text-start w-full lg:w-[65%] font-semibold">Why Choose <br /><span className="text-[#008080]">edu.HUB</span></h2>
          <p className="text-[0.7rem] sm:text-[1rem] lg:text-[1.2rem] text-[#708090] w-full lg:w-[65%]" >Choose us for your e-learning journey and unlock
            a world of knowledge at your fingertips. With
            engaging content, interactive learning experiences,
            and expert guidance, we are committed to empowering
            you to reach your full potential, anytime, anywhere.</p>
        </div>


        {/* right */}
        <div className="grid grid-cols-2 gap-[50px] w-[75%] md:w-[65%] lg:w-full">

          {whyChooseInfo.map((info) => {
            return (
              <InfoComponent info={info} key={info.title} />
            )
          })}
        </div>
      </section>

      {/* Courses */}
      {/* <section className="flex snap-x">
      </section> */}
        {/* <CourseCard /> */}


      {/* Jobs in demand */}
      <section className="px-[5%] my-[2rem] md:mb-[4rem]">
        <div className="grid grid-cols-2 my-[4rem]">
          <h3 className=" text-[0.9rem] sm:text-[1.2rem] md:text-[1.5rem] lg:text-[1.9rem] font-semibold">Get the skills you need for a <span className="text-[#3FB1B1]">job <br /> that is in demand.</span></h3>
          {/* <div className="flex flex-col">
            <p className="text-[1.1rem] text-[#2C333F]">The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
            <button className="text-white mt-[2rem] bg-[#3FB1B1] w-[110px] py-2 text-[14px] rounded-md">Learn More</button>
          </div> */}
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="w-[100%] md:w-[60%] flex items-center">
            <img src="./images/skillsYouNeed.svg" className="w-[90%] md:w-[78%] rounded-2xl img_shadow" />
          </div>

          <div className="w-[100%] mt-[3rem] px-[4%] md:px-0 md:mt-0 md:w-[40%] flex flex-col justify-center ">
            <div className="flex gap-5 relative">
              <div className="bg-[#e6e2e2] left-[-1.3rem] absolute rounded-full p-[13px] flex justify-center items-center">
                <img src="./images/landingPage/leadership.svg" className="h-[25px] w-[28px]" />
              </div>
              <div className="ml-[3rem] md:ml-[5rem]">
                <h3 className="text-[1.1rem] md:text-[1.3rem] font-semibold">Leadership</h3>
                <h4 className="text-[0.8rem] md:text-[1rem]">Fully committed to the success company</h4>
              </div>
            </div>

            <span className="h-[30px] inline-block text-[#AFB2BF] w-4 border-0 border-l-2 border-dotted"></span>

            <div className="flex gap-5 ">
              {/* <div className="bg-[#e6e2e2] rounded-full p-[15px] flex justify-center items-center"> */}
              {/* <img src="./images/landingPage/responsibility.svg" className="" /> */}
              {/* </div> */}

              <div>
                <h3 className="text-[1.3rem] font-semibold">Responsibility</h3>
                <h4>Students will always be our top priority</h4>
              </div>
            </div>

            <span className="h-[30px] inline-block text-[#AFB2BF] w-4 border-0 border-l-2 border-dotted"></span>

            <div className="flex gap-5">
              {/* <img src="./images/landingPage/leadership.svg" className="h-[10px]" /> */}
              <div>
                <h3 className="text-[1.3rem] font-semibold">Flexibility</h3>
                <h4>The ability to switch is an important skills</h4>
              </div>
            </div>

            <span className="h-[30px] inline-block text-[#AFB2BF] w-4 border-0 border-l-2 border-dotted"></span>

            <div className="flex items-start gap-5">
              {/* <img src="./images/landingPage/leadership.svg" className="h-[150px]" /> */}
              <div>
                <h3 className="text-[1.3rem] font-semibold">Solve the problem</h3>
                <h4>Code your way to a solution</h4>
              </div>
            </div>

          </div>

        </div>

      </section>

    </div>
  )
}



const InfoComponent = ({ info }) => {

  return (
    <div key={info.title}>
      <img src={`./images/landingPage/${info.img}.svg`} className="h-[2rem] sm:h-[2.4rem] md:h-[2.7rem] xl:h-[3rem]" alt={info.title} />
      <h3 className="mt-2 text-[0.9rem] md:text-[1.2rem] xl:text-[1.5rem] text-black">{info.title}</h3>
      <p className="w-full lg:w-[80%] xl:w-[65%] text-[0.7rem] md:text-[0.8rem] xl:text-[1rem] text-[#708090]">{info.description}</p>
    </div>
  )
}