const DateRange = ({ startYear, endYear, id }) => {
  const start = new Date(startYear);
  const end = new Date(endYear);
  return (
    <h4 id={id} className="sub-content i-bold">
      {start.toLocaleString("default", { month: "short" })},{" "}
      {start.getFullYear()} to{" "}
      {end != "Invalid Date"
        ? end.toLocaleString("default", { month: "short" }) +
          ", " +
          end.getFullYear()
        : "Present"}
    </h4>
  );
};

export default DateRange;
