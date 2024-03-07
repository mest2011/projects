/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Cookies from "js-cookie";
import axios from "axios";
import { days, months } from "./constants/calendary";
import { fonts } from "./constants/fonts";
import { DateAtom } from "./components/atoms/dateAtom";
import { WeatherAtom } from "./components/atoms/weatherAtom ";
import { WeatherData, WeatherIcon } from "./constants/model";
import { UpperMenuButtonsMolecule } from "./components/molecules/upperMenuButtonsMolecule";
import { LowerMenuButtonsMolecule } from "./components/molecules/lowerMenuButtonsMolecule";

const dayjs = require("dayjs");

let ticks = 0;

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
  const [showControls, setShowControls] = useState<boolean>(true);
  const [showWeather, setShowWeather] = useState<boolean>(
    Cookies.get("showWeather") === "true"
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
  const [weather, setWeather] = useState<WeatherData>();

  const [doubleTapTicController, setDoubleTapTicController] =
    useState<number>(0);
  const [ticController, setTicController] = useState<number>(0);
  const [controlsTic, setControlsTic] = useState<number>(0);

  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?id=3458449&lang=pt_br&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      )
      .then((value) => setWeather(value.data));
  };

  useEffect(() => {
    Cookies.set("showMilli", showMilli ? "true" : "false");
    Cookies.set("showSecond", showSecond ? "true" : "false");
    Cookies.set("showDate", showDate ? "true" : "false");
    Cookies.set("showDateTimeStamp", showDateTimeStamp ? "true" : "false");
    Cookies.set("showWeather", showWeather ? "true" : "false");

    Cookies.set("font", font);
  }, [showMilli, showSecond, showDate, font, showDateTimeStamp]);

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
      ticks++;
      setTicController(ticks);
    }, 100);

    setInterval(() => {
      if (showWeather) getWeather();
    }, 1000 * 60 * 15);
  }, []);

  useEffect(() => {
    if (ticks - controlsTic <= 1 * 10) {
      setShowControls(true);
    }
    if (ticks - controlsTic === 10 * 10) {
      setShowControls(false);
    }
  }, [ticController, controlsTic]);

  const doubleTab = () => {
    if (ticks - doubleTapTicController < 1 * 5) {
      handleFullScreen(handle.active);
    } else {
      setDoubleTapTicController(ticks);
    }
  };

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
    <span
      onClick={() => {
        doubleTab();
        setControlsTic(ticks);
      }}
    >
      <FullScreen handle={handle}>
        <UpperMenuButtonsMolecule showControls={showControls} />
        <Box
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#000",
            userSelect: "none",
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
              <span>{hour}</span>:<span>{minute}</span>
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
            {showWeather ? (
              weather?.name !== undefined ? (
                <WeatherAtom
                  font={font}
                  icon={WeatherIcon[weather?.weather[0]?.icon || "000"]}
                  name={weather?.name}
                  temperature={weather?.main?.temp}
                />
              ) : (
                <Typography
                  style={{
                    color: "#FEFEFE",
                    textAlign: showSecond || showMilli ? "start" : "end",
                    fontSize: "1.5vw",
                    fontFamily: `${font}, "sans-serif"`,
                  }}
                >
                  Erro ao buscar o clima
                </Typography>
              )
            ) : (
              <></>
            )}
            {showDate ? (
              <DateAtom
                day={day}
                dayOfWeek={dayOfWeek}
                font={font}
                month={month}
                monthWord={monthWord}
                onClick={() => setShowDateTimeStamp(!showDateTimeStamp)}
                showDateTimeStamp={showDateTimeStamp}
                showMilli={showMilli}
                showSecond={showSecond}
                year={year}
              />
            ) : (
              <></>
            )}
          </Box>
        </Box>
        <LowerMenuButtonsMolecule
          handleBeforeFont={() => handleFont(false)}
          handleNextFont={() => handleFont(true)}
          setShowDate={() => setShowDate(!showDate)}
          setShowMilli={() => setShowMilli(!showMilli)}
          setShowSecond={() => setShowSecond(!showSecond)}
          setShowWeather={() => setShowWeather(!showWeather)}
          handleFullScreen={() => handleFullScreen(handle.active)}
          showControls={showControls}
          isFullScreen={handle.active}
        />
      </FullScreen>
    </span>
  );
}

export default App;
