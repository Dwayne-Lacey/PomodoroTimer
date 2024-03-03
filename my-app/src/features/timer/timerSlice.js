import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  breakTime: 5,
  focusTime: 25,
  timeRemaining: 1500,
  isFocusTime: true,
  play: false
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setBreak: (state, action) => {
      state.breakTime = action.payload;
    },
    setFocus: (state, action) => {
      state.focusTime = action.payload;
    },
    setTimeRemaining: (state, action) => {
      state.timeRemaining = action.payload;
    },
    togglePlay: (state) => {
      state.play = !state.play;
    },
    toggleFocus: (state) => {
      state.isFocusTime = !state.isFocusTime;
    },
    setDefaults: (state) => {
      state.breakTime = 5;
      state.focusTime = 25;
      state.timeRemaining = 1500;
      state.isFocusTime = true;
      state.play = false;
    }
  }
});

export const { setBreak, 
                setFocus, 
                setTimeRemaining,
                togglePlay, 
                setDefaults,
                toggleFocus } = timerSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.timer.value)`
export const selectBreakTime = (state) => state.timer.breakTime;
export const selectFocusTime = (state) => state.timer.focusTime;
export const selectIsFocus = (state) => state.timer.isFocusTime;
export const selectTimeRemaining = (state) => state.timer.timeRemaining;
export const selectPlay = (state) => state.timer.play;

export default timerSlice.reducer;
