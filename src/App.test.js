import React from 'react'
import {ReactDOM,unmountComponentAtNode} from 'react-dom'
import App from './App'

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

it('renders without crashing', () => {
  const div = document.createElement('div')
  //ReactDOM.render(<App />, div)
})

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
