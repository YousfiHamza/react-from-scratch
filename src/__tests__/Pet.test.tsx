/**
 * @jest-environment jsdom
 */

import { expect, it } from "@jest/globals";
import { render } from "@testing-library/react";
import { StaticRouter } from "react-router-dom/server";

import Pet from "../components/Pet.component";

const petProps = {
  name: "",
  animal: "",
  breed: "",
  images: [],
  location: "",
  id: 0,
};

it("should displays a default thumbnail", async () => {
  const pet = render(
    <StaticRouter location="">
      <Pet {...petProps} />
    </StaticRouter>
  );

  const petThumbnail = (await pet.findByTestId("thumbnail")) as HTMLImageElement;
  expect(petThumbnail.src).toContain("none.jpg");
});

it(" should displays a non-default thumbnail", async () => {
  const pet = render(
    <StaticRouter location="">
      <Pet {...petProps} images={["1.jpg", "2.jpg", "3.jpg"]} />
    </StaticRouter>
  );

  const petThumbnail = (await pet.findByTestId("thumbnail")) as HTMLImageElement;
  expect(petThumbnail.src).toContain("1.jpg");
});
