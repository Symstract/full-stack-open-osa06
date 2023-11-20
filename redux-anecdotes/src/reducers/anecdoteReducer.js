import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    replaceAnecdote(state, action) {
      const changedAnecdote = action.payload;
      const updatedAnecdotes = state.map((anecdote) =>
        anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote
      );
      updatedAnecdotes.sort((a, b) => b.votes - a.votes);
      return updatedAnecdotes;
    },
  },
});

export const { setAnecdotes, appendAnecdote, replaceAnecdote } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const { anecdotes } = getState();
    const anecdoteToChange = anecdotes.find((anecdote) => anecdote.id === id);

    const changedAnecdote = await anecdoteService.update({
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1,
    });

    dispatch(replaceAnecdote(changedAnecdote));
  };
};

export default anecdoteSlice.reducer;
