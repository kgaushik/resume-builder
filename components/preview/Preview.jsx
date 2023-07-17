import Skills from "./Skills";
import DateRange from "../utility/DateRange";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useRef } from "react";
import { ResumeContext } from "../../pages/builder";
import dynamic from "next/dynamic";
import ExtraActivities from "./ExtraActivities";
import Certification from "./Certification";
import GreatlakesLogo from "../../public/assets/GLIMlogo.svg";
import { Heading } from "../utility/Heading";
import { useReactToPrint } from "react-to-print";

const DragDropContext = dynamic(
  () =>
    import("react-beautiful-dnd").then((mod) => {
      return mod.DragDropContext;
    }),
  { ssr: false }
);
const Droppable = dynamic(
  () =>
    import("react-beautiful-dnd").then((mod) => {
      return mod.Droppable;
    }),
  { ssr: false }
);
const Draggable = dynamic(
  () =>
    import("react-beautiful-dnd").then((mod) => {
      return mod.Draggable;
    }),
  { ssr: false }
);

const tableStyle = {
  border: "1px solid #dddddd",
  textAlign: "center",
  padding: "3px",
  fontSize: "13px",
};

const Preview = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (source.droppableId === "work-experience") {
      const newWorkExperience = [...resumeData.workExperience];
      const [removed] = newWorkExperience.splice(source.index, 1);
      newWorkExperience.splice(destination.index, 0, removed);
      setResumeData({ ...resumeData, workExperience: newWorkExperience });
    }

    if (source.droppableId.includes("WORK_EXPERIENCE_KEY_ACHIEVEMENT")) {
      const newWorkExperience = [...resumeData.workExperience];
      const workExperienceIndex = parseInt(source.droppableId.split("-")[1]);
      const keyAchievements =
        newWorkExperience[workExperienceIndex].keyAchievements.split("\n");
      const [removed] = keyAchievements.splice(source.index, 1);
      keyAchievements.splice(destination.index, 0, removed);
      newWorkExperience[workExperienceIndex].keyAchievements =
        keyAchievements.join("\n");
      setResumeData({ ...resumeData, workExperience: newWorkExperience });
    }

    if (source.droppableId === "summer-experience") {
      const newWorkExperience = [...resumeData.summerIntern];
      const [removed] = newWorkExperience.splice(source.index, 1);
      newWorkExperience.splice(destination.index, 0, removed);
      setResumeData({ ...resumeData, summerIntern: newWorkExperience });
    }

    if (source.droppableId.includes("SUMMER_EXPERIENCE_KEY_ACHIEVEMENT")) {
      const newWorkExperience = [...resumeData.summerIntern];
      const workExperienceIndex = parseInt(source.droppableId.split("-")[1]);
      const keyAchievements =
        newWorkExperience[workExperienceIndex].keyAchievements.split("\n");
      const [removed] = keyAchievements.splice(source.index, 1);
      keyAchievements.splice(destination.index, 0, removed);
      newWorkExperience[workExperienceIndex].keyAchievements =
        keyAchievements.join("\n");
      setResumeData({ ...resumeData, summerIntern: newWorkExperience });
    }

    if (source.droppableId === "skills") {
      const newSkills = [...resumeData.skills];
      const [removed] = newSkills.splice(source.index, 1);
      newSkills.splice(destination.index, 0, removed);
      setResumeData({ ...resumeData, skills: newSkills });
    }

    if (source.droppableId.includes("projects")) {
      const newProjects = [...resumeData.projects];
      const [removed] = newProjects.splice(source.index, 1);
      newProjects.splice(destination.index, 0, removed);
      setResumeData({ ...resumeData, projects: newProjects });
    }

    if (source.droppableId.includes("PROJECTS_KEY_ACHIEVEMENT")) {
      const newProjects = [...resumeData.projects];
      const projectIndex = parseInt(source.droppableId.split("-")[1]);
      const keyAchievements =
        newProjects[projectIndex].keyAchievements.split("\n");
      const [removed] = keyAchievements.splice(source.index, 1);
      keyAchievements.splice(destination.index, 0, removed);
      newProjects[projectIndex].keyAchievements = keyAchievements.join("\n");
      setResumeData({ ...resumeData, projects: newProjects });
    }
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: componentRef.current,
    documentTitle: "Resume",
    onAfterPrint: () => alert("Downloaded"),
  });

  return (
    <div
      ref={componentRef}
      className="md:max-w-[60%] sticky top-0 preview rm-padding-print  p-6 md:overflow-y-scroll md:h-screen"
    >
      <A4PageWrapper>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex flex-row justify-between items-center">
            <Image src={GreatlakesLogo} alt="GreatLakes" />
            <div className="flex flex-col justify-center items-center">
              <h2 className="name">{resumeData.name}</h2>
              <h2>
                {resumeData.age} years | {resumeData.gender}{" "}
              </h2>
            </div>
            {resumeData.profilePicture.length > 0 && (
              <div className="w-24 h-24 mr-2 overflow-hidde">
                <Image
                  src={resumeData.profilePicture}
                  alt="profile"
                  width={100}
                  height={100}
                  style={{
                    height: "100px",
                    width: "100px",
                    clipPath: "inset(0px 0px 15px 0px)",
                  }}
                />
              </div>
            )}
          </div>

          {/* two column start */}
          <div className="pageStart">
            <div>
              {resumeData.summary.length > 0 && (
                <div className="mb-1">
                  <Heading heading="Summary" width="100%" />

                  <p className="content">{resumeData.summary}</p>
                </div>
              )}

              {/* Professional Experience */}
              <div>
                {resumeData.workExperience.length > 0 && (
                  <Droppable
                    droppableId="work-experience"
                    type="WORK_EXPERIENCE"
                  >
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <Heading
                          heading="Professional Experience"
                          width="592px"
                        />
                        {resumeData.workExperience.map((item, index) => (
                          <Draggable
                            key={`${item.company}-${index}`}
                            draggableId={`WORK_EXPERIENCE-${index}`}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`mb-1 ${
                                  snapshot.isDragging &&
                                  "outline-dashed outline-2 outline-gray-400 bg-white"
                                }`}
                              >
                                <div className="flex flex-row justify-between items-center">
                                  <h4 className="content i-bold">
                                    {item.company}
                                  </h4>
                                  <h4 className="content i-bold">
                                    {item.position}
                                  </h4>
                                  <DateRange
                                    startYear={item.startYear}
                                    endYear={item.endYear}
                                    id={`work-experience-start-end-date`}
                                  />
                                </div>
                                <p className="content">{item.description}</p>
                                <Droppable
                                  droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                                  type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
                                >
                                  {(provided) => (
                                    <ul
                                      className="list-disc ul-padding content"
                                      {...provided.droppableProps}
                                      ref={provided.innerRef}
                                    >
                                      {typeof item.keyAchievements ===
                                        "string" &&
                                        item.keyAchievements
                                          .split("\n")
                                          .map((achievement, subIndex) => (
                                            <Draggable
                                              key={`${item.company}-${index}-${subIndex}`}
                                              draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                              index={subIndex}
                                            >
                                              {(provided, snapshot) => (
                                                <li
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                  className={`
                                          hover:outline-dashed hover:outline-2 hover:outline-gray-400
                                          ${
                                            snapshot.isDragging &&
                                            "outline-dashed outline-2 outline-gray-400 bg-white"
                                          }`}
                                                >
                                                  {achievement}
                                                </li>
                                              )}
                                            </Draggable>
                                          ))}
                                      {provided.placeholder}
                                    </ul>
                                  )}
                                </Droppable>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                )}
              </div>

              {/* Summer Intern Experience */}
              <div>
                {resumeData.summerIntern.length > 0 && (
                  <Droppable
                    droppableId="work-experience"
                    type="WORK_EXPERIENCE"
                  >
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <Heading heading="Summer Internship" width="622px" />
                        {resumeData.summerIntern.map((item, index) => (
                          <Draggable
                            key={`${item.company}-${index}`}
                            draggableId={`WORK_EXPERIENCE-${index}`}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`mb-1 ${
                                  snapshot.isDragging &&
                                  "outline-dashed outline-2 outline-gray-400 bg-white"
                                }`}
                              >
                                <div className="flex flex-row justify-between items-center">
                                  <h4 className="content i-bold">
                                    {item.company}
                                  </h4>
                                  <h4 className="content i-bold">
                                    {item.position}
                                  </h4>
                                  <DateRange
                                    startYear={item.startYear}
                                    endYear={item.endYear}
                                    id={`work-experience-start-end-date`}
                                  />
                                </div>
                                <p className="content">{item.description}</p>
                                <Droppable
                                  droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                                  type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
                                >
                                  {(provided) => (
                                    <ul
                                      className="list-disc ul-padding content"
                                      {...provided.droppableProps}
                                      ref={provided.innerRef}
                                    >
                                      {typeof item.keyAchievements ===
                                        "string" &&
                                        item.keyAchievements
                                          .split("\n")
                                          .map((achievement, subIndex) => (
                                            <Draggable
                                              key={`${item.company}-${index}-${subIndex}`}
                                              draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                              index={subIndex}
                                            >
                                              {(provided, snapshot) => (
                                                <li
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                  className={`
                                          hover:outline-dashed hover:outline-2 hover:outline-gray-400
                                          ${
                                            snapshot.isDragging &&
                                            "outline-dashed outline-2 outline-gray-400 bg-white"
                                          }`}
                                                >
                                                  {achievement}
                                                </li>
                                              )}
                                            </Draggable>
                                          ))}
                                      {provided.placeholder}
                                    </ul>
                                  )}
                                </Droppable>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                )}
              </div>

              {/* Education Experience */}
              <div>
                {resumeData.education.length > 0 && (
                  <div className="mb-1">
                    <Heading heading="Academic Qualifications" width="592px" />
                    <table
                      style={{
                        borderCollapse: "collapse",
                        width: "99%",
                      }}
                      border="2"
                    >
                      <thead>
                        <tr>
                          <th style={tableStyle}>Degree</th>
                          <th style={tableStyle}>Year</th>
                          <th style={tableStyle}>
                            Institute, University/ Board
                          </th>
                          <th style={tableStyle}>% /CGPA</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resumeData.education.map((details, i) => (
                          <tr key={i}>
                            <td style={tableStyle}>{details.degree || "-"}</td>
                            <td style={tableStyle}>
                              {new Date(details.year).getFullYear() || "-"}
                            </td>
                            <td style={tableStyle}>{details.school || "-"}</td>
                            <td style={tableStyle}>{details.cgpa || "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Skills and Ceritifications  */}
              <Droppable droppableId="skills" type="SKILLS">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {resumeData.skills.map((skill, index) => (
                      <Draggable
                        key={`SKILLS-${index}`}
                        draggableId={`SKILLS-${index}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`mb-1 ${
                              snapshot.isDragging &&
                              "outline-dashed outline-2 outline-gray-400 bg-white"
                            }`}
                          >
                            <Skills title={skill.title} skills={skill.skills} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              {/* Projects  */}
              <div>
                {resumeData.projects.length > 0 && (
                  <Droppable droppableId="projects" type="PROJECTS">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <Heading
                          heading="Academic Projects/Internship"
                          width="554px"
                        />
                        {resumeData.projects.map((item, index) => (
                          <Draggable
                            key={`${item.name}-${index}`}
                            draggableId={`PROJECTS-${index}`}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`mb-1 ${
                                  snapshot.isDragging &&
                                  "outline-dashed outline-2 outline-gray-400 bg-white"
                                }`}
                              >
                                <div className="flex flex-row justify-between items-center">
                                  <p className="content i-bold">{item.name}</p>
                                  {item.startYear ? (
                                    <DateRange
                                      startYear={item.startYear}
                                      endYear={item.endYear}
                                      id={`work-experience-start-end-date`}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </div>

                                <Droppable
                                  droppableId={`PROJECTS_KEY_ACHIEVEMENT-${index}`}
                                  type="PROJECTS_KEY_ACHIEVEMENT"
                                >
                                  {(provided) => (
                                    <ul
                                      className="list-disc ul-padding content"
                                      {...provided.droppableProps}
                                      ref={provided.innerRef}
                                    >
                                      {typeof item.keyAchievements ===
                                        "string" &&
                                        item.keyAchievements
                                          .split("\n")
                                          .map((achievement, subIndex) => (
                                            <Draggable
                                              key={`${item.name}-${index}-${subIndex}`}
                                              draggableId={`PROJECTS_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                              index={subIndex}
                                            >
                                              {(provided, snapshot) => (
                                                <li
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                  className={`
                                          hover:outline-dashed hover:outline-2 hover:outline-gray-400
                                          ${
                                            snapshot.isDragging &&
                                            "outline-dashed outline-2 outline-gray-400 bg-white"
                                          }`}
                                                >
                                                  {achievement}
                                                </li>
                                              )}
                                            </Draggable>
                                          ))}
                                      {provided.placeholder}
                                    </ul>
                                  )}
                                </Droppable>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                )}
              </div>
              <Certification
                title="Awards & Achievements"
                awards={resumeData.awards}
              />

              <ExtraActivities
                title="Extra-Curricular Activities"
                extraActivities={resumeData.extraActivities}
              />
            </div>
          </div>
        </DragDropContext>
      </A4PageWrapper>
    </div>
  );
};

const A4PageWrapper = ({ children }) => {
  const alertA4Size = () => {
    const preview = document.querySelector(".preview");
    const previewHeight = preview.offsetHeight;
    console.log(previewHeight);
    if (previewHeight > 1122) {
      alert("A4 size exceeded");
    }
  };

  return (
    <div className="w-8.5in " onLoad={alertA4Size}>
      {children}
    </div>
  );
};

export default Preview;
