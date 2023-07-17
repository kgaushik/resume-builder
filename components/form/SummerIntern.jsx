import FormButton from "./FormButton";
import React, { useContext, useState } from "react";
import { ResumeContext } from "../../pages/builder";

const SummerIntern = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const [limit, setLimit] = useState(false);
  const handleSummerExperience = (e, index) => {
    const newworkExperience = [...resumeData.summerIntern];
    newworkExperience[index][e.target.name] = e.target.value;
    setResumeData({ ...resumeData, summerIntern: newworkExperience });
  };

  const addSummerExperience = () => {
    if (resumeData.summerIntern.length > 0) {
      setLimit(true);
      return;
    }
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

  const industryOptions = [
    "Software",
    "Hardware",
    "Telecom",
    "IT Services",
    "Internet",
    "Banking",
    "Insurance",
    "Securities",
    "Asset Management",
    "Consulting",
    "Pharmaceuticals",
    "Medical Devices",
    "Hospitals",
    "Clinics",
    "Research",
    "Ecommerce",
    "Retail Stores",
    "Food & Beverage",
    "Clothing & Accessories",
    "Home Goods",
    "Broadcasting",
    "Film & Television",
    "Music",
    "Publishing",
    "Advertising",
    "Automotive",
    "Aerospace",
    "Heavy Machinery",
    "Consumer Products",
    "Food & Beverage",
    "Energy",
    "Utilities",
    "Transportation",
    "Government",
    "Education",
  ];

  const removeSummerExperience = (index) => {
    setLimit(false);
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
          <select
            type="text"
            placeholder="Description"
            name="industry"
            className="w-full other-input h-10"
            value={summerIntern.industry}
            onChange={(e) => handleSummerExperience(e, index)}
          >
            {industryOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

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
      {limit && <p style={{ color: "red" }}>You cant add more than 1</p>}
      <FormButton
        size={resumeData.summerIntern.length}
        add={addSummerExperience}
        remove={removeSummerExperience}
      />
    </div>
  );
};

export default SummerIntern;
