import React from 'react';
import { configure ,mount,shallow} from "enzyme";
import { Provider } from "react-redux";
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";
import Login from '../components/Login';
import { BrowserRouter as Router } from 'react-router-dom';

const mockStore = configureMockStore();
const store = mockStore({});
configure({adapter: new Adapter()});

describe("Testpage Component", () => {
  let note = mount( <Provider store={store}>
    <Router>
         <Login />
      </Router>
  </Provider>);
  it("should render without throwing an error", () => {
      expect(
         note    
      ).toBeDefined();
  });
  it("should display LOGIN as heading",()=>{
    expect(note.find('h1').text()).toEqual('LOGIN');
  });
  it('should find Login button',()=>{
    expect(note.find('button').first().text()).toEqual('LOGIN');
  });
  it('should find Reset button',()=>{
    expect(note.find('button').last().text()).toEqual('RESET');
  });
  it('LOGIN button should be in disabled state',()=>{
    expect(note.find('button').first().getElement().props.disabled).toBe(true);
  });
  it('RESET button should be in disabled state',()=>{
    expect(note.find('button').last().getElement().props.disabled).toBe(true);
  });
  it('LOGIN button should not be in disabled state',()=>{
    note.find(Login).instance().setState({ name: 'test',password:'test' });
    note.update();
    expect(note.find('button').first().getElement().props.disabled).toBe(false);
  });
  it('RESET button should be in disabled state',()=>{
    note.find(Login).instance().setState({ name: 'test' });
    note.update();
    expect(note.find('button').last().getElement().props.disabled).toBe(false);
  });
});
