import React, { useContext } from "react";
import { ResumeContext } from "../../pages/builder";
import { Heading } from "../utility/Heading";

const Skills = ({ title, skills }) => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleTitleChange = (e) => {
    const newSkills = [...resumeData.skills];
    newSkills.find((skillType) => skillType.title === title).title =
      e.target.innerText;
    setResumeData({ ...resumeData, skills: newSkills });
  };

  return (
    skills.length > 0 && (
      <>
        <Heading heading="Skills & Certifications" width="76%" />
        <ul className="list-disc ul-padding content">
          {skills.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      </>
    )
  );
};

export default Skills;
