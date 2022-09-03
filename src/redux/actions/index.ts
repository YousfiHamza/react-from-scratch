import { Animal } from "../../types/responsesType";

export function changeTheme(theme: string) {
  return { type: "CHANGE_THEME", payload: theme };
}

export function changeLocation(location: string) {
  return { type: "CHANGE_LOCATION", payload: location };
}

export function changeAnimal(animal: Animal) {
  return { type: "CHANGE_ANIMAL", payload: animal };
}

export function changeBreed(breed: string) {
  return { type: "CHANGE_BREED", payload: breed };
}
