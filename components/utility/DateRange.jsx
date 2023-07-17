const DateRange = ({ startYear, endYear, id }) => {
  const start = new Date(startYear);
  const end = new Date(endYear);
  return (
    <p style={{ fontSize: "10px" }} id={id} className="mr-2 i-bold ">
      {start.toLocaleString("default", { month: "short" })},{" "}
      {start.getFullYear()} to{" "}
      {end != "Invalid Date"
        ? end.toLocaleString("default", { month: "short" }) +
          ", " +
          end.getFullYear()
        : "Present"}
    </p>
  );
};

export default DateRange;
