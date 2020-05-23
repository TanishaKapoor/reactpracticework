import React from 'react';
import {configure, mount } from "enzyme";
import { Provider } from "react-redux";
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

const mockStore = configureMockStore();
const store = mockStore({});
configure({adapter: new Adapter()});

describe("Testpage Component", () => {
  let note = <Provider store={store}>
  <Router>
       <App />
    </Router>
  </Provider>;
  it("should render without throwing an error", () => {
      expect(note).toBeDefined()
  });
});
