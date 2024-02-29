import { createSlice } from "@reduxjs/toolkit";
import { arr_flashcards } from "../../share/arr_flashcards";
const initialState = [];

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    getAllCards: (state) => {
      state = localStorage.getItem("arr_flashcards")
        ? JSON.parse(localStorage.getItem("arr_flashcards"))
        : arr_flashcards;
      localStorage.setItem("arr_flashcards", JSON.stringify(state));
      return state;
    },
    addCard: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("arr_flashcards", JSON.stringify(state));
      return state;
    },
    editCard: (state, action) => {
      state[action.payload.i] = action.payload.fact;
      localStorage.setItem("arr_flashcards", JSON.stringify(state));
      return state;
    },
    deleteCard: (state, action) => {
      state.splice(action.payload, 1);
      localStorage.setItem("arr_flashcards", JSON.stringify(state));
      return state;
    }
  },
});

export const { getAllCards, addCard, editCard, deleteCard } =
  cardsSlice.actions;
export default cardsSlice.reducer;
