import React from 'react';
import { configure ,mount,shallow} from "enzyme";
import { Provider } from "react-redux";
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";
import wrongRoute from "../images/wrongRoute.jpg";
import { BrowserRouter as Router } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';

const mockStore = configureMockStore();
const store = mockStore({});
configure({adapter: new Adapter()});

describe("Testpage Component", () => {
  let note = mount( <Provider store={store}>
    <Router>
         <ProductDetail />
      </Router>
  </Provider>);
  it("should render without throwing an error", () => {
      expect(
         note    
      ).toBeDefined();
  });
  it("should display LOGIN as heading",()=>{
    expect(note.find('h1').text()).toEqual('MOBILE DETAIL');
  });
  it("should finf back button",()=>{
    expect(note.find('button').at(0).text()).toBe(' Go Back ');
  });
  it("should display message with image if tried to route to this directly",()=>{
    expect(note.find("img").prop("src")).toEqual(wrongRoute);
  });
});
