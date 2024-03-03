import React, { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  setBreak, 
  setFocus,
  selectBreakTime,
  selectFocusTime,
  selectIsFocus,
  selectTimeRemaining,
  setTimeRemaining,
  selectPlay,
  togglePlay,
  toggleFocus,
  setDefaults
} from './timerSlice';
import styles from './Timer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faPlay, faPause, faRepeat } from '@fortawesome/free-solid-svg-icons'

export function Timer() {
  const breakTime = useSelector(selectBreakTime);
  const focusTime = useSelector(selectFocusTime);
  const isFocus = useSelector(selectIsFocus);
  const timeRemaining = useSelector(selectTimeRemaining);
  const play = useSelector(selectPlay);
  const ref = useRef(null);

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
      if (timeRemaining === 0) {
        dispatch(setTimeRemaining(isFocus ? breakTime * 60 : focusTime * 60))
        dispatch(toggleFocus());
      }
      else {
        dispatch(setTimeRemaining(timeRemaining - 1));
      }
      if (timeRemaining === 1) {
        let playPromise = ref.current.play();
        if (playPromise !== undefined) {
          playPromise.then(_ => {

          })
          .catch(error => {
              console.log("Playback has errored.");
          });
        }
      }
    }
  }, [breakTime,dispatch,focusTime,isFocus,timeRemaining,play]);

  // Handles incrementing and decrementing break/session times
  const adjustTime = (adjustment, type) => {
    if (!play) {
      // Check current time, max for each timer is 60 minutes
      const currentTime = type === "break" ? breakTime : focusTime;
      switch (adjustment) {
        case "increment":
          if (currentTime <= 59) {
            dispatch(type === "break" ? setBreak(currentTime + 1) : setFocus(currentTime + 1));
            if ((isFocus && type === "focus") || (!isFocus && type === "break")) {
              dispatch(setTimeRemaining((currentTime + 1) * 60));
            }
          }
          break;
        case "decrement":
          if (currentTime >= 2) {
            dispatch(type === "break" ? setBreak(currentTime - 1) : setFocus(currentTime - 1));
            if ((isFocus && type === "focus") || (!isFocus && type === "break")) {
              dispatch(setTimeRemaining((currentTime - 1) * 60));
            }
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
          <div className="col-4 align-self-center">
            <div className="row">
              <h2 id="break-label" className="text-center">Break Length</h2>
            </div>
            <div className="row justify-content-center">
              <div className="col-2 text-end align-self-center">
                <button id="break-decrement" className={styles.buttonStyle} onClick={() => {adjustTime("decrement", "break")}}>
                  <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
                </button>
              </div>
              <div className="col-4 align-self-center">
                <h3 id="break-length" className="text-center">{breakTime}</h3>
              </div>
              <div className="col-2 text-left align-self-center">
                <button id="break-increment" className={styles.buttonStyle} onClick={() => {adjustTime("increment", "break")}}>
                  <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
                </button>
              </div>
            </div>
          </div>
          <div className="col-4 align-self-center">
            <div className="row">
              <h2 id="session-label" className="text-center">Session Length</h2>
            </div>
            <div className="row justify-content-center">
              <div className="col-2 text-end align-self-center">
                <button id="session-decrement" className={styles.buttonStyle} onClick={() => {adjustTime("decrement", "focus")}}>
                  <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
                </button>
              </div>
              <div className="col-4 align-self-center">
                <h3 id="session-length" className="text-center">{focusTime}</h3>
              </div>
              <div className="col-2 text-left align-self-center">
                <button id="session-increment" className={styles.buttonStyle} onClick={() => {adjustTime("increment", "focus")}}>
                  <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-4 text-center align-self-center">
            <div>
              <h2 id="timer-label">{isFocus ? "Session" : "Break"}</h2>
              <h1 id="time-left">{formatTime(timeRemaining)}</h1>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-1 text-center align-self-center">
            <button id="start_stop" className={styles.buttonStyle} onClick={() => dispatch(togglePlay())}>
              <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
              <FontAwesomeIcon icon={faPause}></FontAwesomeIcon>
            </button>
          </div>
          <div className="col-1 text-center align-self-center">
           <button id="reset" className={styles.buttonStyle} onClick={() => {dispatch(setDefaults()); ref.current.pause(); ref.current.currentTime = 0;}}>
            <FontAwesomeIcon icon={faRepeat}></FontAwesomeIcon>
           </button>
          </div>
        </div>
      </div>
      <audio
            id="beep"
            src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
            ref={ref}
            />
    </div>
  );
}
