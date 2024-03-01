import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  incrementBreak, 
  decrementBreak,
  incrementFocus,
  decrementFocus,
  selectBreakTime,
  selectFocusTime
} from './timerSlice';
import styles from './Timer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

export function Timer() {
  const breakTime = useSelector(selectBreakTime);
  const focusTime = useSelector(selectFocusTime);
  const dispatch = useDispatch();
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

        </div>
        <div className="row">
          <div className="col-6">
            <div className="row">
              <h2>Break Length</h2>
            </div>
            <div className="row">
              <button onClick={() => {adjustTime("decrement", "break")}}>
                <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
              </button>
              <h3>{breakTime}</h3>
              <button onClick={() => {adjustTime("increment", "break")}}>
                <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
              </button>
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              <h2>Session Length</h2>
            </div>
            <div className="row">
              <button onClick={() => {adjustTime("decrement", "focus")}}>
                <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
              </button>
              <h3>{focusTime}</h3>
              <button onClick={() => {adjustTime("increment", "focus")}}>
                <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
              </button>
            </div>
          </div>
        </div>
        <div className="row">

        </div>
        <div className="row">

        </div>
      </div>
    </div>
  );
}
