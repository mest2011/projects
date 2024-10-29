import Typography from "@mui/material/Typography/Typography";
import { ReactElement } from "react";
import { WiCelsius } from "react-icons/wi";

interface IWeatherAtom {
  name: string;
  temperature?: number;
  icon: ReactElement<any, any>;
  font: string;
}

export const WeatherAtom: React.FC<IWeatherAtom> = ({
  name,
  temperature,
  icon,
  font,
}) => {
  return (
    <Typography
      style={{
        color: "#FEFEFE",
        textAlign: "end",
        fontSize: "2vw",
        fontFamily: `${font}, "sans-serif"`,
      }}
    >
      {`${name} - `}
      {Math.floor(temperature || 0)}
      <WiCelsius />
      {icon}
    </Typography>
  );
};
