import { MdPictureAsPdf } from "react-icons/md";

const WinPrint = () => {
  const print = () => {
    window.print();
  };

  return (
    <button
      aria-label="Download Resume"
      className="exclude-print fixed bottom-5 right-10 "
      onClick={print}
      style={{
        background: "green",
        color: "white",
        height: "40px",
        borderRadius: "5px",
        width: "250px",
        float: "right",
      }}
    >
      Export pdf
    </button>
  );
};

export default WinPrint;
