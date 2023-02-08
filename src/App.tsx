/* eslint-disable react-hooks/exhaustive-deps */
import {
  CalendarTodayTwoTone,
  FullscreenExitTwoTone,
  FullscreenTwoTone,
  HomeTwoTone,
  ReplayTwoTone,
  TextRotationNoneTwoTone,
  TimerTwoTone,
  WatchLaterTwoTone,
} from "@mui/icons-material";
import { Box, Button, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Cookies from "js-cookie";

const dayjs = require("dayjs");

const days = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
];

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const fonts = [
  "system-ui",
  "Abel",
  "Anton",
  "Cabin",
  "Caveat",
  "Dancing Script",
  "Fredoka One",
  "Lilita One",
  "Lobster",
  "Permanent Marker",
  "Play",
  "Press Start 2P",
  "Rubik 80s Fade",
  "Rubik Vinyl",
  "Satisfy",
  "Shadows Into Light",
  "sans-serif",
];

function App() {
  const [showMilli, setShowMilli] = useState<boolean>(
    Cookies.get("showMilli") === "true"
  );
  const [showSecond, setShowSecond] = useState<boolean>(
    Cookies.get("showSecond") === "true"
  );
  const [showDate, setShowDate] = useState<boolean>(
    Cookies.get("showDate") === "true"
  );
  const [showDateTimeStamp, setShowDateTimeStamp] = useState<boolean>(
    Cookies.get("showDateTimeStamp") === "true"
  );
  const [showControls, setShowControls] = useState<boolean>(
    Cookies.get("showControls") === "true"
  );

  const [font, setFont] = useState<string>(Cookies.get("font") || fonts[0]);

  const [day, setDay] = useState<string>();
  const [month, setMonth] = useState<string>();
  const [monthWord, setMonthWord] = useState<string>();
  const [year, setYear] = useState<string>();
  const [dayOfWeek, setDayOfWeek] = useState<string>();

  const [hour, setHour] = useState<string>();
  const [minute, setMinute] = useState<string>();
  const [second, setSecond] = useState<string>();
  const [millisecond, setMillisecond] = useState<string>();

  useEffect(() => {
    Cookies.set("showMilli", showMilli ? "true" : "false");
    Cookies.set("showSecond", showSecond ? "true" : "false");
    Cookies.set("showDate", showDate ? "true" : "false");
    Cookies.set("showDateTimeStamp", showDateTimeStamp ? "true" : "false");
    Cookies.set("showControls", showControls ? "true" : "false");

    Cookies.set("font", font);
  }, [showMilli, showSecond, showDate, showControls, font, showDateTimeStamp]);

  const getTime = () => {
    setDay(dayjs(new Date()).format("DD"));
    setMonth(dayjs(new Date()).format("MM"));
    setMonthWord(getMonthPortuguese(dayjs(new Date()).format("MM") - 1));
    setYear(dayjs(new Date()).format("YYYY"));
    setDayOfWeek(getDayWeekPortuguese(dayjs(new Date()).format("d")));

    setHour(dayjs(new Date()).format("HH"));
    setMinute(dayjs(new Date()).format("mm"));
    setSecond(dayjs(new Date()).format("ss"));
    setMillisecond(dayjs(new Date()).format("SSS"));
  };

  const handle = useFullScreenHandle();

  useEffect(() => {
    setInterval(() => {
      getTime();
    }, 10);
  }, []);

  const getDayWeekPortuguese = (numberOfDay: number) => {
    return days[numberOfDay];
  };

  const getMonthPortuguese = (numberOfDay: number) => {
    return months[numberOfDay];
  };

  const handleFont = (next: boolean) => {
    if (next) {
      if (fonts.length === fonts.indexOf(font)) {
        setFont(fonts[0]);
      }
      setFont(fonts[fonts.indexOf(font) + 1]);
    } else {
      if (fonts.indexOf(font) === 0) {
        setFont(fonts[fonts.length - 1]);
      }
      setFont(fonts[fonts.indexOf(font) - 1]);
    }
  };

  const handleFullScreen = (fullScreen: boolean) => {
    fullScreen ? handle.exit() : handle.enter();
  };

  return (
    <FullScreen handle={handle}>
      <Box
        style={{
          position: "fixed",
          top: 32,
          width: "100vw",
          display: showControls ? "flex" : "none",
          justifyContent: "space-around",
        }}
      >
        <Link href="https://mesttech.com.br">
          <Button variant="outlined">
            <HomeTwoTone />
          </Button>
        </Link>
        <Button onClick={() => window.location.reload()} variant="outlined">
          <ReplayTwoTone />
        </Button>
      </Box>
      <Box
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "#000",
        }}
      >
        <Box
          style={{
            width: showSecond || showMilli ? "93%" : "auto",
            margin: "auto",
          }}
        >
          <Typography
            style={{
              fontSize: "26vw",
              fontWeight: 600,
              lineHeight: "1",
              fontFamily: `${font}, "sans-serif"`,
              color: "#FEFEFE",
              textAlign: showSecond || showMilli ? "start" : "center",
            }}
          >
            <span onClick={() => setShowControls(!showControls)}>
              <span>{hour}</span>:<span>{minute}</span>
            </span>
            {showSecond ? (
              <span
                style={{ fontSize: "11vw" }}
                onClick={() => setShowSecond(false)}
              >
                :{second}
              </span>
            ) : (
              <></>
            )}
            {showMilli ? (
              <span
                style={{ fontSize: "6vw" }}
                onClick={() => setShowMilli(false)}
              >
                .{millisecond}
              </span>
            ) : (
              <></>
            )}
          </Typography>
          {showDate ? (
            <Typography
              onClick={() => setShowDateTimeStamp(!showDateTimeStamp)}
              style={{
                color: "#FEFEFE",
                textAlign: "end",
                fontSize: "2vw",
                fontFamily: `${font}, "sans-serif"`,
              }}
            >
              {showDateTimeStamp
                ? `${day}/${month}/${year}`
                : `${dayOfWeek}, ${day} de ${monthWord} de ${year}`}
            </Typography>
          ) : (
            <></>
          )}
        </Box>
      </Box>
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
          onClick={() => handleFont(false)}
          variant="outlined"
          style={{ transform: "scaleX(-1)" }}
        >
          <TextRotationNoneTwoTone />
        </Button>
        <Button onClick={() => handleFont(true)} variant="outlined">
          <TextRotationNoneTwoTone />
        </Button>
        <Button onClick={() => setShowDate(!showDate)} variant="outlined">
          <CalendarTodayTwoTone />
        </Button>
        <Button onClick={() => setShowSecond(!showSecond)} variant="outlined">
          <WatchLaterTwoTone />
        </Button>
        <Button onClick={() => setShowMilli(!showMilli)} variant="outlined">
          <TimerTwoTone />
        </Button>
        <Button
          onClick={() => handleFullScreen(handle.active)}
          variant="outlined"
        >
          {handle.active ? <FullscreenExitTwoTone /> : <FullscreenTwoTone />}
        </Button>
      </Box>
    </FullScreen>
  );
}

export default App;
