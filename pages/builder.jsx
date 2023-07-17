import React, { useState, createContext, useContext } from "react";
import Extra from "../components/form/Extra";
import Meta from "../components/meta/Meta";
import FormCP from "../components/form/FormCP";
import LoadUnload from "../components/form/LoadUnload";
import Preview from "../components/preview/Preview";
import DefaultResumeData from "../components/utility/DefaultResumeData";
import SocialMedia from "../components/form/SocialMedia";
import WorkExperience from "../components/form/WorkExperience";
import Skill from "../components/form/Skill";
import PersonalInformation from "../components/form/PersonalInformation";
import Summary from "../components/form/Summary";
import Projects from "../components/form/Projects";
import Education from "../components/form/Education";
import dynamic from "next/dynamic";
import Awards from "../components/form/awards";
import SummerIntern from "../components/form/SummerIntern";
import axios from "axios";

const ResumeContext = createContext(DefaultResumeData);

// server side rendering false
const Print = dynamic(() => import("../components/utility/WinPrint"), {
  ssr: false,
});

export default function Builder(props) {
  // resume data
  const [resumeData, setResumeData] = useState(DefaultResumeData);

  // form hide/show
  const [formClose, setFormClose] = useState(false);

  // profile picture
  const handleProfilePicture = (e) => {
    const file = e.target.files[0];

    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeData({ ...resumeData, profilePicture: event.target.result });
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Invalid file type");
    }
  };

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
    console.log(resumeData);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(resumeData);
    axios
      .post("localhost:8000/savedata/", resumeData)
      .then((data) => [console.log(data)])
      .catch((err) => console.log(err));
  };

  return (
    <>
      <ResumeContext.Provider
        value={{
          resumeData,
          setResumeData,
          handleProfilePicture,
          handleChange,
        }}
      >
        <Meta
          title="Resume Builder"
          description="ATSResume is a cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes. Our platform uses the latest technology to analyze and optimize your resume for maximum visibility and success with applicant tracking systems. Say goodbye to frustration and wasted time spent on manual resume formatting. Create your winning resume with ATSResume today and get noticed by employers."
          keywords="ATS-friendly, Resume optimization, Keyword-rich resume, Applicant Tracking System, ATS resume builder, ATS resume templates, ATS-compliant resume, ATS-optimized CV, ATS-friendly format, ATS resume tips, Resume writing services, Career guidance, Job search in India, Resume tips for India, Professional resume builder, Cover letter writing, Interview preparation, Job interview tips, Career growth, Online job applications, resume builder, free resume builder, resume ats, best free resume builder, resume creator, resume cv, resume design, resume editor, resume maker"
        />
        <div className="f-col gap-4 md:flex-row justify-evenly max-w-7xl  md:h-screen">
          {!formClose && (
            <form className="p-4 bg-[#16A34A] exclude-print w-[75%] md:h-screen md:overflow-y-scroll">
              <LoadUnload />
              <PersonalInformation />
              <Summary />
              <WorkExperience />
              <SummerIntern />
              <Education />
              {resumeData.skills.map((skill, index) => (
                <Skill title={skill.title} key={index} />
              ))}
              <Projects />
              <Awards />
              <Extra />
            </form>
          )}
          <Preview />
          <div className="exclude-print ml-10  mt-14 w-[128px]">
            <label style={{ color: "green" }}>Enter Roll No.</label>
            <input
              style={{
                border: "1px solid green",
                height: "40px",
                borderRadius: "5px",
                width: "250px",
                marginBottom: "30px",
              }}
              type="text"
              name="rollno"
              value={resumeData.rollno}
              onChange={handleChange}
            />
            <label style={{ color: "green" }}>Secret Code.</label>
            <input
              style={{
                border: "1px solid green",
                height: "40px",
                borderRadius: "5px",
                width: "250px",
              }}
              type="text"
              name="secret"
              value={resumeData.secret}
              onChange={handleChange}
            />
            <button
              onClick={handleClick}
              style={{
                background: "green",
                color: "white",
                height: "40px",
                borderRadius: "5px",
                width: "250px",
                marginTop: "20px",
              }}
            >
              Upload data
            </button>
          </div>
        </div>

        <Print />
      </ResumeContext.Provider>
    </>
  );
}
export { ResumeContext };
