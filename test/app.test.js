const React = require("react");
// import { render, unmountComponentAtNode } from "react-dom";
const { act } = require( "react-dom/test-utils");
const { render, screen, cleanup } = require('@testing-library/react');

const App = require("../client/src/components/App.jsx");

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target'
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders component overview", () => {
  act(() => {
    render('<div>Hey</div>', container);
  });
  expect(document.body.textContent).toBe("Hey");

  // act(() => {
  //   render(<RelatedItems />, container);
  // });
  // expect(container.textContent).toBe("RelatedItems");

  // act(() => {
  //   render(<QuestionAndAnswers  />, container);
  // });
  // expect(container.textContent).toBe("QuestionsAndAnswers");
});
