import FormButton from "./FormButton";
import React, { useContext } from "react";
import { ResumeContext } from "../../pages/builder";

const SummerIntern = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleSummerExperience = (e, index) => {
    const newworkExperience = [...resumeData.summerIntern];
    newworkExperience[index][e.target.name] = e.target.value;
    setResumeData({ ...resumeData, summerIntern: newworkExperience });
  };

  const addSummerExperience = () => {
    setResumeData({
      ...resumeData,
      summerIntern: [
        ...resumeData.summerIntern,
        {
          company: "",
          position: "",
          description: "",
          keyAchievements: "",
          startYear: "",
          endYear: "",
        },
      ],
    });
  };

  const removeSummerExperience = (index) => {
    const newworkExperience = [...resumeData.summerIntern];
    newworkExperience[index] = newworkExperience[newworkExperience.length - 1];
    newworkExperience.pop();
    setResumeData({ ...resumeData, summerIntern: newworkExperience });
  };

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title">Summer Intern Experience</h2>
      {resumeData.summerIntern.map((summerIntern, index) => (
        <div key={index} className="f-col">
          <input
            type="text"
            placeholder="Company"
            name="company"
            className="w-full other-input"
            value={summerIntern.company}
            onChange={(e) => handleSummerExperience(e, index)}
          />
          <input
            type="text"
            placeholder="Job Title"
            name="position"
            className="w-full other-input"
            value={summerIntern.position}
            onChange={(e) => handleSummerExperience(e, index)}
          />
          <textarea
            type="text"
            placeholder="Description"
            name="description"
            className="w-full other-input h-32"
            value={summerIntern.description}
            maxLength="250"
            onChange={(e) => handleSummerExperience(e, index)}
          />
          <textarea
            type="text"
            placeholder="Key Achievements"
            name="keyAchievements"
            className="w-full other-input h-40"
            value={summerIntern.keyAchievements}
            onChange={(e) => handleSummerExperience(e, index)}
          />
          <div className="flex-wrap-gap-2">
            <input
              type="date"
              placeholder="Start Year"
              name="startYear"
              className="other-input"
              value={summerIntern.startYear}
              onChange={(e) => handleSummerExperience(e, index)}
            />
            <input
              type="date"
              placeholder="End Year"
              name="endYear"
              className="other-input"
              value={summerIntern.endYear}
              onChange={(e) => handleSummerExperience(e, index)}
            />
          </div>
        </div>
      ))}
      <FormButton
        size={resumeData.summerIntern.length}
        add={addSummerExperience}
        remove={removeSummerExperience}
      />
    </div>
  );
};

export default SummerIntern;
