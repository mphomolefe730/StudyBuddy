import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBreaks } from "../../redux/breakslice";
import CreateBreakDiv from "./SetBreaksComponents/CreateBreakDiv";
import ConvertPixelToTime from "./SetBreaksComponents/ConvertPixelToTime";
import ConvertTimeToPixel from "./SetBreaksComponents/ConvertTimeToPixel";

const SetBreaks = () => {
  const dispatch = useDispatch();
  const breaks = useSelector((state) => state.breaks);
  const initialSessionDuration = useSelector((state) => state.sessionDuration);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const defaultBreakDuration = 10;
  const [localSessionDuration, setLocalSessionDuration] = useState(
    initialSessionDuration
  );


  useEffect(() => {
    setLocalSessionDuration(initialSessionDuration);
  }, [initialSessionDuration]);

 
  const handleGridClick = async (event) => {
    if (!isPopupOpen) {
      const rect = event.target.getBoundingClientRect();
      const y = Math.round(event.nativeEvent.clientY - rect.top);

      await addBreak(y);
      setIsPopupOpen(true);
    }
  };

  const addBreak = async (y) => {
    const breakStartTime = ConvertPixelToTime({ totalMinutes: y });
    const newBreak = {
      breakDuration: {
        hours: "0",
        minutes: defaultBreakDuration,
        seconds: "0",
      },
      breakStartTime: {
        hours: breakStartTime.hours,
        minutes: breakStartTime.minutes,
        seconds: breakStartTime.seconds,
      },
    };
    
    dispatch(setBreaks([...breaks, newBreak]));
  };

  const getNumsForTimeline = () => {
    let num = localSessionDuration.hours;
    if (localSessionDuration.minutes != 0) {
      num += 1;
    }
    return Array.from({ length: num + 1 }, (_, index) => index);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleDivClick = () => {
    setIsPopupOpen(true);
  };

  const gridWidth = 500;
  const gridHeight = ConvertTimeToPixel({
    timeObject: localSessionDuration,
  });

  const Nums = getNumsForTimeline();

  return (
    <div>
      <h2>SetBreaks</h2>
      {/* Grid */}
      <div
        style={{
          backgroundColor: "lightblue",
          width: `${gridWidth}px`,
          height: gridHeight,
          margin: "auto",
          marginTop: "10vh",
          marginLeft: "10vw",
          position: "relative",
          left: 0,
          top: 0,
        }}
        onMouseDown={handleGridClick}
      >
        {/* timeline */}
        {Nums.map((time, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: index * 60 - 15 + "px",
              left: "-60px",
              width: "50px",
              textAlign: "right",
              borderBottom: "1px solid #000",
              lineHeight: "14px",
              paddingRight: "560px",
            }}
          >
            {time}
            {index === 0 && <></>}
          </div>
        ))}
        {/* break containers */}
        {breaks.map((breakItem, index) => (
          <CreateBreakDiv
            key={index}
            index={index}
            top={ConvertTimeToPixel({ timeObject: breakItem.breakStartTime })}
            breakDivHeight={ConvertTimeToPixel({
              timeObject: breakItem.breakDuration,
            })}
            gridWidth={gridWidth}
            onClick={handleDivClick}
            popUpClose={handlePopupClose}
          />
        ))}
      </div>
    </div>
  );
};

export default SetBreaks;
