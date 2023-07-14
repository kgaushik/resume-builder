import { Heading } from "../utility/Heading";

const Certification = ({ title, awards }) => {
  return (
    awards.length > 0 && (
      <div>
        <Heading heading={title} width="73%" />
        <ul className="sub-content list-disc ul-padding">
          {awards.map((certification, index) => (
            <li key={index}>{certification}</li>
          ))}
        </ul>
      </div>
    )
  );
};

export default Certification;
