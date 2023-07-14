export const Heading = ({ heading, width }) => {
  return (
    <div className="flex flex-row ">
      <h2 className="section-title mb-1">{heading}</h2>
      <span style={{ width: width }} className="heading"></span>
    </div>
  );
};
