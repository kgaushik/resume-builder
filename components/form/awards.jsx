import React, { useContext, useState } from "react";
import { ResumeContext } from "../../pages/builder";
import FormButton from "./FormButton";

const Awards = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const [limit, setLimit] = useState(false);

  const skillType = "awards";
  const title = "Awards & Achievements";

  const handleSkills = (e, index, skillType) => {
    const newSkills = [...resumeData[skillType]];
    newSkills[index] = e.target.value;
    setResumeData({ ...resumeData, [skillType]: newSkills });
  };

  const addSkill = () => {
    if (resumeData.awards.length > 2) {
      setLimit(true);
      return;
    }
    setResumeData({
      ...resumeData,
      [skillType]: [...resumeData[skillType], ""],
    });
  };

  const removeSkill = (index) => {
    setLimit(false);
    const newSkills = [...resumeData[skillType]];
    newSkills.splice(-1, 1);
    setResumeData({ ...resumeData, [skillType]: newSkills });
  };

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title">{title}</h2>
      {resumeData[skillType].map((skill, index) => (
        <div key={index} className="f-col">
          <input
            type="text"
            placeholder={title}
            name={title}
            className="w-full other-input"
            value={skill}
            onChange={(e) => handleSkills(e, index, skillType)}
          />
        </div>
      ))}
      {limit && <p style={{ color: "red" }}>You cant add more than 3</p>}
      <FormButton
        size={resumeData[skillType].length}
        add={addSkill}
        remove={removeSkill}
      />
    </div>
  );
};

export default Awards;
