import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import "matchmedia-polyfill";
import Main from "../Main";

beforeEach(() => {
  render(
    <Provider store={store}>
      <Main />
    </Provider>
  );
});

afterEach(() => {
  render(<></>);
});

describe("main test", () => {
  it("render ticketmaster twice on screen ", () => {
    const ticketmasterElement = screen.getAllByText(/Ticketmaster/i);
    expect(ticketmasterElement).toHaveLength(2);
  });
  it("render the searchbar ", () => {
    expect(
      screen.getByRole("generic", {
        name: "navbar",
      })
    ).toBeInTheDocument();
  });
  it("render the footer", () => {
    expect(
      screen.getByRole("contentinfo", { name: "footer-bottom" })
    ).toBeInTheDocument();
  });
  it("render all the suggestion items (5)", async () => {
    await waitFor(() => {
      expect(
        screen.getAllByRole("generic", {
          name: "suggestion-item",
        })
      ).toHaveLength(5);
    });
  });
  it("click on the first suggestion item, expects to find it on the next screen", async () => {
    let firstArtistStringName = "";
    let allArtistNamesOnScreen = [];
    await waitFor(() => {
      /** get all the suggestion items on screen */
      let suggestionItemsHTMLElements = screen.getAllByRole("generic", {
        name: "suggestion-item",
      });
      // get all the artist names on screen
      allArtistNamesOnScreen = screen.getAllByRole("generic", {
        name: "suggestion-artist-name",
      });
      //get the name of the first artist and store it, then click on the artist, this will load a new page
      firstArtistStringName = allArtistNamesOnScreen[0].textContent;
      fireEvent.click(suggestionItemsHTMLElements[0]);
    });
    await waitFor(() => {
      //expect to find it on the new screen
      expect(screen.getByText(firstArtistStringName)).toBeInTheDocument();
      expect(screen.getByText("top tracks on LastFM:")).toBeInTheDocument();
    });
  });
});
