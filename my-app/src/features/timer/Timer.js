import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  incrementBreak, 
  decrementBreak,
  incrementFocus,
  decrementFocus,
  selectBreakTime,
  selectFocusTime,
  selectIsFocus,
  selectTimeElapsed
} from './timerSlice';
import styles from './Timer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

export function Timer() {
  const breakTime = useSelector(selectBreakTime);
  const focusTime = useSelector(selectFocusTime);
  const isFocus = useSelector(selectIsFocus);
  const timeElapsed = useSelector(selectTimeElapsed);
  const dispatch = useDispatch();

  // const getTimeLeft = () => {
  //   const maxTime = isFocus ? focusTime : breakTime;

  //   // Get time elapsed since timer was started
  //   const secondsElapsed = (focusTime * 60) - timeElapsed
  // };

  // useEffect(() => {
  //   const interval = setInterval(() => getTimeLeft(), 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [])

  const adjustTime = (adjustment, type) => {
    // Check current time, max for each timer is 60 minutes
    switch (adjustment) {
      case "increment":
        console.log("incrementing");
        if ((type === "break" && breakTime <= 59) || (type !== "break" && focusTime <= 59)) {
          dispatch(type === "break" ? incrementBreak() : incrementFocus());
        }
        break;
      case "decrement":
        if ((type === "break" && breakTime >= 2) || (type !== "break" && focusTime >= 2)) {
          dispatch(type === "break" ? decrementBreak() : decrementFocus());
        }
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <h1 className="text-center">Pomodoro Timer</h1>
        </div>
        <div className="row justify-content-center">
          <div className="col-4">
            <div className="row">
              <h2 className="text-center">Break Length</h2>
            </div>
            <div className="row justify-content-center">
              <div className="col-2 text-end">
                <button onClick={() => {adjustTime("decrement", "break")}}>
                  <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
                </button>
              </div>
              <div className="col-4">
                <h3 className="text-center">{breakTime}</h3>
              </div>
              <div className="col-2 text-left">
                <button onClick={() => {adjustTime("increment", "break")}}>
                  <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
                </button>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="row">
              <h2 className="text-center">Session Length</h2>
            </div>
            <div className="row justify-content-center">
              <div className="col-2 text-end">
                <button className="" onClick={() => {adjustTime("decrement", "focus")}}>
                  <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
                </button>
              </div>
              <div className="col-4">
                <h3 className="text-center">{focusTime}</h3>
              </div>
              <div className="col-2 text-left">
                <button className="" onClick={() => {adjustTime("increment", "focus")}}>
                  <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <h2></h2>
            <h1></h1>
          </div>
        </div>
        <div className="row">

        </div>
      </div>
    </div>
  );
}
