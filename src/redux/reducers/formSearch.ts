import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Animal } from "../../types/responsesType";

interface FormStateType {
  location: string;
  breed: string;
  animal: Animal;
  theme: string;
}

const initialState = {
  location: "",
  breed: "",
  animal: "dog",
  theme: "",
} as FormStateType;

const formSlice = createSlice({
  name: "SearchForm",
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<string>) {
      return { ...state, theme: action.payload };
    },
    changeLocation(state, action: PayloadAction<string>) {
      return { ...state, location: action.payload };
    },
    changeAnimal(state, action: PayloadAction<Animal>) {
      return { ...state, animal: action.payload, breed: "" };
    },
    changeBreed(state, action: PayloadAction<string>) {
      return { ...state, breed: action.payload };
    },
  },
});

export const { changeTheme, changeLocation, changeAnimal, changeBreed } = formSlice.actions;
export default formSlice.reducer;
