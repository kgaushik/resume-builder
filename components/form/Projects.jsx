import FormButton from "./FormButton";
import React, { useContext, useState } from "react";
import { ResumeContext } from "../../pages/builder";

const Projects = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const [limit, setLimit] = useState(false);

  const handleProjects = (e, index) => {
    const newProjects = [...resumeData.projects];
    newProjects[index][e.target.name] = e.target.value;
    setResumeData({ ...resumeData, projects: newProjects });
  };

  const addProjects = () => {
    if (resumeData.projects.length > 2) {
      setLimit(true);
      return;
    }
    setResumeData({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        {
          title: "",
          link: "",
          description: "",
          keyAchievements: "",
          startYear: "",
          endYear: "",
        },
      ],
    });
  };

  const removeProjects = (index) => {
    setLimit(false);
    const newProjects = [...resumeData.projects];
    newProjects[index] = newProjects[newProjects.length - 1];
    newProjects.pop();
    setResumeData({ ...resumeData, projects: newProjects });
  };

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title">Projects</h2>
      {resumeData.projects.map((project, index) => (
        <div key={index} className="f-col">
          <input
            type="text"
            placeholder="Project Name"
            name="name"
            className="w-full other-input"
            value={project.name}
            onChange={(e) => handleProjects(e, index)}
          />
          <textarea
            type="text"
            placeholder="Key Achievements"
            name="keyAchievements"
            className="w-full other-input h-40"
            value={project.keyAchievements}
            onChange={(e) => handleProjects(e, index)}
          />
          <div className="flex-wrap-gap-2">
            <input
              type="date"
              placeholder="Start Year"
              name="startYear"
              className="other-input"
              value={project.startYear}
              onChange={(e) => handleProjects(e, index)}
            />
            <input
              type="date"
              placeholder="End Year"
              name="endYear"
              className="other-input"
              value={project.endYear}
              onChange={(e) => handleProjects(e, index)}
            />
          </div>
        </div>
      ))}
      {limit && <p style={{ color: "red" }}>You cant add more than 3</p>}

      <FormButton
        size={resumeData.projects.length}
        add={addProjects}
        remove={removeProjects}
      />
    </div>
  );
};

export default Projects;
