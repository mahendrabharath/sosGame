
import React from 'react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "../Store";
import expect from 'expect'
import { render } from 'enzyme';


it('App Component is defined ', () => {
   const component = render(
    <Provider store={store}>
      <BrowserRouter basename="/clientportal">
    <App />
  </BrowserRouter></Provider>
  );
 expect(component.length).toEqual(1)
  // expect.anything();
});
