/**
 * @jest-environment jsdom
 */

import { expect, test } from "@jest/globals";
import { render, act } from "@testing-library/react";
import Carousel from "../components/Carousel.component";

test("lets users click on thumbnails to make them the hero", async () => {
  const images = ["0.jpg", "1.jpg", "2.jpg", "3.jpg"];
  const carousel = render(<Carousel images={images} />);

  const hero = (await carousel.findByTestId("hero")) as HTMLImageElement;
  expect(hero.src).toContain(images[0]);

  for (let i = 0; i < images.length; i++) {
    const image = images[i];

    const thumb = await carousel.findByTestId(`thumbnail${i}`);

    act(() => {
      thumb.click();
    });

    expect(hero.src).toContain(image);
    expect(thumb.classList).toContain("active");
  }
});
