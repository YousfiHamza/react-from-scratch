import { useState, useEffect } from "react";
import { Animal, BreedListAPIResponse } from "../types/responsesType";

export type LocalCacheType = {
  [index: string]: string[];
};

export type Status = "unloaded" | "still loading ..." | "Loaded !!!";

const localCache: LocalCacheType = {};

export default function useBreedList(animal: Animal = ""): [string[], Status] {
  const [breedList, setBreedList] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("Loaded !!!");

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      void requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]);
      setStatus("still loading ...");
      const res = await fetch(`http://pets-v2.dev-apis.com/breeds?animal=${animal}`);
      const json = (await res.json()) as BreedListAPIResponse;
      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("Loaded !!!");
    }
  }, [animal]);

  return [breedList, status];
}
