import {
  CalendarTodayTwoTone,
  FullscreenExitTwoTone,
  FullscreenTwoTone,
  TextRotationNoneTwoTone,
  Thermostat,
  TimerTwoTone,
  WatchLaterTwoTone,
} from "@mui/icons-material";
import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";

interface ILowerMenuButtonsMolecule {
  isFullScreen: boolean;
  showControls: boolean;
  setShowDate: () => void;
  setShowMilli: () => void;
  setShowSecond: () => void;
  handleNextFont: () => void;
  setShowWeather: () => void;
  handleBeforeFont: () => void;
  handleFullScreen: () => void;
}

export const LowerMenuButtonsMolecule: React.FC<ILowerMenuButtonsMolecule> = ({
  isFullScreen,
  showControls,
  setShowDate,
  setShowMilli,
  setShowSecond,
  handleNextFont,
  setShowWeather,
  handleBeforeFont,
  handleFullScreen,
}) => {
  return (
    <Box
      style={{
        position: "fixed",
        bottom: 32,
        width: "100vw",
        display: showControls ? "flex" : "none",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      <Button
        onClick={handleBeforeFont}
        variant="outlined"
        style={{ transform: "scaleX(-1)" }}
      >
        <TextRotationNoneTwoTone />
      </Button>
      <Button onClick={handleNextFont} variant="outlined">
        <TextRotationNoneTwoTone />
      </Button>
      <Button onClick={setShowWeather} variant="outlined">
        <Thermostat />
      </Button>
      <Button onClick={setShowDate} variant="outlined">
        <CalendarTodayTwoTone />
      </Button>
      <Button onClick={setShowSecond} variant="outlined">
        <WatchLaterTwoTone />
      </Button>
      <Button onClick={setShowMilli} variant="outlined">
        <TimerTwoTone />
      </Button>
      <Button onClick={handleFullScreen} variant="outlined">
        {isFullScreen ? <FullscreenExitTwoTone /> : <FullscreenTwoTone />}
      </Button>
    </Box>
  );
};
