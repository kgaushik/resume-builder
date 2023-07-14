import { Heading } from "../utility/Heading";

const ExtraActivities = ({ title, extraActivities }) => {
  return (
    extraActivities.length > 0 && (
      <div>
        <Heading heading={title} width="580px" />
        <ul className="sub-content list-disc ul-padding">
          {extraActivities.map((extra, index) => (
            <li key={index}>{extra}</li>
          ))}
        </ul>
      </div>
    )
  );
};

export default ExtraActivities;
