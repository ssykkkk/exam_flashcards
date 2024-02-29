import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("groups")
  ? JSON.parse(localStorage.getItem("groups"))
  : [];


export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    getGroups: (state) => {
      JSON.parse(localStorage.getItem("arr_flashcards")).forEach((card) => {
        if (!state.includes(card.group)) {
          state.push(card.group);
          localStorage.setItem("groups", JSON.stringify(state));
        }
      });
      return state;
    },
    addGroups: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("groups", JSON.stringify(state));
      return state;
    },
    editGroups: (state, action) => {
      const updatedGroups = state.map((group, index) =>
        index === action.payload.index ? action.payload.newName : group
      );
      localStorage.setItem("groups", JSON.stringify(updatedGroups));

      const updatedFlashcards = JSON.parse(localStorage.getItem("arr_flashcards")).map((card) => {
        if (card.group === action.payload.name) {
          return { ...card, group: action.payload.newName };
        }
        return card;
      });
      console.log(updatedFlashcards)
      localStorage.setItem("arr_flashcards", JSON.stringify(updatedFlashcards));
    
      return updatedGroups;
    },
    deleteGroups: (state, action) => {
      const updatedGroups = [...state]
      updatedGroups.splice(action.payload.i, 1);
      localStorage.setItem("groups", JSON.stringify(updatedGroups));
      const flashcards = JSON.parse(localStorage.getItem("arr_flashcards"));
      flashcards.forEach((card, index) => {
        if (card.group === action.payload.name) {
          flashcards.splice(index, 1);
          localStorage.setItem("arr_flashcards", JSON.stringify(flashcards));
        }
      });
      return updatedGroups;
    }
    
  },
});

export const { getGroups, addGroups, editGroups,deleteGroups } = groupsSlice.actions;
export default groupsSlice.reducer;
