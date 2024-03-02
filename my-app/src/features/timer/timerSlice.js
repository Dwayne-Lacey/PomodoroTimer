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
    incrementBreak: (state) => {
      state.breakTime += 1;
    },
    decrementBreak: (state) => {
      state.breakTime -= 1;
    },
    incrementFocus: (state) => {
      state.focusTime += 1;
    },
    decrementFocus: (state) => {
      state.focusTime -= 1;
    },
    setTimeRemaining: (state, action) => {
      state.timeRemaining = action.payload;
    },
    togglePlay: (state) => {
      state.play = !state.play;
    },
    toggleFocus: (state) => {
      state.isFocusTime = !state.isFocusTime;
    }
  }
});

export const { incrementBreak, 
                decrementBreak, 
                incrementFocus, 
                decrementFocus, 
                setTimeRemaining,
                togglePlay, 
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
