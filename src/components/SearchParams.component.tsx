import { useState, useCallback, ChangeEvent, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";

import Results from "./Results.component";

import { StateType } from "../redux/store";
import { changeAnimal, changeBreed, changeLocation, changeTheme } from "../redux/reducers/formSearch";

import useBreedList from "../hooks/useBreedList";
import { Animal, Pet, PetAPIResponse } from "../types/responsesType";

const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const dispatch = useDispatch();

  const animal = useSelector((state: StateType) => state.formSearchReducer.animal);
  const location = useSelector((state: StateType) => state.formSearchReducer.location);
  const breed = useSelector((state: StateType) => state.formSearchReducer.breed);
  const theme = useSelector((state: StateType) => state.formSearchReducer.theme);

  const [pets, setPets] = useState<Pet[]>([]);

  const [breeds, status] = useBreedList(animal);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeLocation(e.target.value));
  };

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      async function requestPets() {
        const res = await fetch(
          `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
        );
        const json = (await res.json()) as PetAPIResponse;

        setPets(json.pets);
      }
      e.preventDefault();
      void requestPets();
    },
    [animal, breed, location]
  );

  return (
    <div className="search-params">
      <form onSubmit={handleSubmit}>
        <label htmlFor="location">
          Location
          <input id="location" value={location} placeholder="Location" onChange={handleChange} />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              dispatch(changeAnimal(e.target.value as Animal));
              dispatch(changeBreed(""));
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            value={breed}
            onChange={(e) => dispatch(changeBreed(e.target.value))}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="theme">
          Theme
          <select value={theme} onChange={(e) => dispatch(changeTheme(e.target.value))}>
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
          </select>
        </label>
        <button style={{ background: theme }}>Submit</button>
        status : {status}
      </form>
      <div>
        <Results pets={pets} />
      </div>
    </div>
  );
};

export default SearchParams;
