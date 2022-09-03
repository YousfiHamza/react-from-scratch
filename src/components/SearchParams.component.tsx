import { useState, useCallback, useContext, ChangeEvent, FormEvent } from "react";

import Results from "./Results.component";

import useBreedList from "../hooks/useBreedList";
import ThemeContext from "../context/ThemeContext";
import { Animal, Pet, PetAPIResponse } from "../types/responsesType";

const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState<Animal>("dog");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState<Pet[]>([]);

  const [breeds, status] = useBreedList(animal);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
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

  const [theme, setTheme] = useContext(ThemeContext);

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
              setAnimal(e.target.value as Animal);
              setBreed("");
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
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
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
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
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
