import Typography from "@mui/material/Typography/Typography";

interface IDateAtom {
  day?: string;
  font: string;
  year?: string;
  month?: string;
  dayOfWeek?: string;
  monthWord?: string;
  showMilli: boolean;
  showSecond: boolean;
  onClick: () => void;
  showDateTimeStamp: boolean;
}

export const DateAtom: React.FC<IDateAtom> = ({
  showSecond,
  showMilli,
  font,
  showDateTimeStamp,
  day,
  month,
  year,
  dayOfWeek,
  monthWord,
  onClick,
}) => {
  return (
    <Typography
      onClick={onClick}
      style={{
        color: "#FEFEFE",
        textAlign: showSecond || showMilli ? "start" : "end",
        fontSize: "2vw",
        fontFamily: `${font}, "sans-serif"`,
      }}
    >
      {showDateTimeStamp
        ? `${day}/${month}/${year}`
        : `${dayOfWeek}, ${day} de ${monthWord} de ${year}`}
    </Typography>
  );
};
