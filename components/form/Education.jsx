import FormButton from "./FormButton";
import React, { useContext } from "react";
import { ResumeContext } from "../../pages/builder";

const Education = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleEducation = (e, index) => {
    const newEducation = [...resumeData.education];
    newEducation[index][e.target.name] = e.target.value;
    setResumeData({ ...resumeData, education: newEducation });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        { degree: "", year: "", school: "", cgpa: "" },
      ],
    });
  };

  const removeEducation = (index) => {
    const newEducation = [...resumeData.education];
    newEducation[index] = newEducation[newEducation.length - 1];
    newEducation.pop();
    setResumeData({ ...resumeData, education: newEducation });
  };

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title">Education</h2>
      {resumeData.education.map((education, index) => (
        <div key={index} className="f-col">
          <input
            type="text"
            placeholder="Degree"
            name="degree"
            className="w-full other-input"
            value={education.degree}
            onChange={(e) => handleEducation(e, index)}
          />
          <input
            type="date"
            placeholder="Year"
            name="year"
            className="other-input"
            value={education.year}
            onChange={(e) => handleEducation(e, index)}
          />
          <input
            type="text"
            placeholder="School"
            name="school"
            className="w-full other-input"
            value={education.school}
            onChange={(e) => handleEducation(e, index)}
          />
          <input
            type="text"
            placeholder="CGPA"
            name="cgpa"
            className="w-full other-input"
            value={education.cgpa}
            onChange={(e) => handleEducation(e, index)}
          />
        </div>
      ))}
      <FormButton
        size={resumeData.education.length}
        add={addEducation}
        remove={removeEducation}
      />
    </div>
  );
};

export default Education;
