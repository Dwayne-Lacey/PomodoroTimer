import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  incrementBreak, 
  decrementBreak,
  incrementFocus,
  decrementFocus,
  selectBreakTime,
  selectFocusTime,
  selectIsFocus,
  selectTimeRemaining,
  setTimeRemaining,
  selectPlay,
  togglePlay,
  toggleFocus
} from './timerSlice';
import styles from './Timer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

export function Timer() {
  const breakTime = useSelector(selectBreakTime);
  const focusTime = useSelector(selectFocusTime);
  const isFocus = useSelector(selectIsFocus);
  const timeRemaining = useSelector(selectTimeRemaining);
  const play = useSelector(selectPlay);

  const dispatch = useDispatch();

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    minutes = minutes.toString().length === 1 ? `0${minutes}` : `${minutes}`
    let seconds = time % 60;
    seconds = seconds.toString().length === 1 ? `0${seconds}` : `${seconds}`
    return `${minutes}:${seconds}`;
  }

  const getTimeLeft = useCallback(() => {
    if (play) {
      console.log("break time is", breakTime);
      console.log("focus time is", focusTime);
      if (timeRemaining === 0) {
        dispatch(setTimeRemaining(isFocus ? breakTime * 60 : focusTime * 60))
        dispatch(toggleFocus());
      }
      else {
        dispatch(setTimeRemaining(timeRemaining - 1));
      }
    }
  }, [breakTime,dispatch,focusTime,isFocus,timeRemaining,play]);

  // Handles incrementing and decrementing break/session times
  const adjustTime = (adjustment, type) => {
    if (!play) {
      // Check current time, max for each timer is 60 minutes
      switch (adjustment) {
        case "increment":
          if (isFocus && type === "focus" && focusTime <= 59) {
            dispatch(setTimeRemaining((focusTime + 1) * 60));
          }
          else if (!isFocus && type === "break" && breakTime <= 59) {
            dispatch(setTimeRemaining((breakTime + 1) * 60));
          }
          if ((type === "break" && breakTime <= 59) || (type !== "break" && focusTime <= 59)) {
            dispatch(type === "break" ? incrementBreak() : incrementFocus());
          }
          break;
          case "decrement":
            if (isFocus && type === "focus" && focusTime >= 2) {
              dispatch(setTimeRemaining((focusTime - 1) * 60));
            }
            else if (!isFocus && type === "break" && breakTime >= 2) {
              dispatch(setTimeRemaining((breakTime - 1) * 60));
            }
            if ((type === "break" && breakTime >= 2) || (type !== "break" && focusTime >= 2)) {
              dispatch(type === "break" ? decrementBreak() : decrementFocus());
            }
            break;
            default:
              break;
        }
      }
    }

  // Re-renders component every 1000 milliseconds/1 sec
  useEffect(() => {
    const interval = setInterval(() => getTimeLeft(), 1000);
    return () => {
      clearInterval(interval);
    };
  });

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
            <h2>{isFocus ? "Session" : "Break"}</h2>
            <h1>{formatTime(timeRemaining)}</h1>
          </div>
        </div>
        <div className="row">
          <button onClick={() => dispatch(togglePlay())}>Start/Pause</button>
          <button>Reset</button>
        </div>
      </div>
    </div>
  );
}
