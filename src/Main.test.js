import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import { store } from "./redux/store";
import { Provider } from "react-redux";
import "matchmedia-polyfill";

import Main from "./Main";



describe("main test", () => {
  it("renders Apps", () => {
    const { container } = render(
      <Provider store={store}>
        <Main />
      </Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it("render ticketmaster ", () => {
    render(
      <Provider store={store}>
        <Main />
      </Provider>
    );
    const ticketmasterElement = screen.getAllByText(/Ticketmaster/i);
    expect(ticketmasterElement).toHaveLength(2);
  });
  it("render the searchbar ", () => {
    render(
      <Provider store={store}>
        <Main />
      </Provider>
    );
    const searchbar = screen.getByPlaceholderText(/Search by Artist/i);
    expect(searchbar).toHaveAttribute("placeholder", "Search by Artist")
  });
  it("render the footer",()=>{
    render(
      <Provider store={store}>
        <Main />
      </Provider>
    );
    const footer = screen.getByText(/Copyright Snt© /i);
     expect(footer).toBeInTheDocument()
  })
});
