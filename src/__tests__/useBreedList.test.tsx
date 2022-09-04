/**
 * @jest-environment jsdom
 */

import fetchMock from "jest-fetch-mock";
import { expect, it } from "@jest/globals";
import { render, renderHook, waitFor } from "@testing-library/react";
import useBreedList, { Status } from "../hooks/useBreedList";
import { Animal } from "../types/responsesType";

// using the old approach - since custom hooks are only used inside React Components
function getBreedList(animal: Animal = "") {
  let list: [string[], Status] = [[], "still loading ..."];

  function TestComponent() {
    list = useBreedList(animal);
    return null;
  }

  render(<TestComponent />);

  return list;
}

it("should give an empty list with no animal - OLD", () => {
  const [breedList, status] = getBreedList();
  expect(breedList).toHaveLength(0);
  expect(status).toBe("Loaded !!!");
});

// using the new approach with react-hooks from R'T'L
it("should give an empty list with no animal - NEW", () => {
  const { result } = renderHook(() => useBreedList(""));
  const [breedList, status] = result.current;
  expect(breedList).toHaveLength(0);
  expect(status).toBe("Loaded !!!");
});

it("should give back breeds with an animal", async () => {
  const dogBreeds = ["Havanese", "Bichon Frise", "Poodle", "Maltese", "Golden Retriever", "Labrador", "Husky"];

  fetchMock.mockResponse(
    JSON.stringify({
      animal: "dog",
      breeds: dogBreeds,
    })
  );

  const { result } = renderHook(() => useBreedList("dog"));

  await waitFor(() => {
    const [breedList, status] = result.current;
    expect(status).toBe("Loaded !!!");
    expect(breedList).toEqual(dogBreeds);
  });
});

it("should get breeds from localCache", async () => {
  const catBreeds = ["Havanesee", "Bichon Frise", "Poodle", "Maltese", "Golden Retriever", "Labrador"];

  fetchMock.mockResponse(
    JSON.stringify({
      animal: "cat",
      breeds: catBreeds,
    })
  );

  const result1 = renderHook(() => useBreedList("cat")).result;

  await waitFor(() => {
    const [breedList1, status1] = result1.current;
    expect(status1).toBe("Loaded !!!");
    expect(breedList1).toEqual(catBreeds);
  });

  const result2 = renderHook(() => useBreedList("cat")).result;

  const [breedList2, status2] = result2.current;
  expect(status2).toBe("Loaded !!!"); // status wont change since we will not make an API call
  expect(breedList2).toEqual(catBreeds); // we dont have to WAITFOR because it gets it from localCache without an async API Call
});
