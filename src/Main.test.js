import { render, cleanup, screen } from "@testing-library/react";
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
});
