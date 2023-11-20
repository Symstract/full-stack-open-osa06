import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload;
    },
  },
});

const { set } = notificationSlice.actions;

export const setNotification = (text, time) => {
  return async (dispatch) => {
    dispatch(set(text));

    await new Promise((resolve) => setTimeout(resolve, time * 1000));

    dispatch(set(null));
  };
};
export default notificationSlice.reducer;
