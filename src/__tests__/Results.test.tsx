/**
 * @jest-environment jsdom
 */

import { expect, it } from "@jest/globals";
import { render } from "@testing-library/react";
// import { create, ReactTestRendererJSON } from "react-test-renderer";
import { createRenderer } from "react-test-renderer/shallow";
// import { StaticRouter } from "react-router-dom/server";

import Results from "../components/Results.component";
import { pets } from "../helpers/__mocks__/pets.mock";

it("should renders correctly with no pets", () => {
  const tree = render(<Results pets={[]} />);
  expect(tree).toMatchSnapshot();
});

// it("should render correctly with some pets", () => {
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
//   const tree = create(
//     <StaticRouter location="">
//       <Results pets={pets} />
//     </StaticRouter>
//   ).toJSON() as ReactTestRendererJSON;
//   expect(tree).toMatchSnapshot();
// });

it("should render correctly with some pets - Shallow Version !", () => {
  // shallow version mekes you render nested elements as JSX - prevents you from having nested failing ests due to nested component when their tests fail !
  const r = createRenderer();
  r.render(<Results pets={pets} />);
  expect(r.getRenderOutput()).toMatchSnapshot();
});
