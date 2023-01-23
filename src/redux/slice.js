import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
  name: "counter",
  initialState: {
    isDarkMode: false,
    suggestions: [],
    artist: {},
    events: [],
    venue: {},
    artistTopTracks: {},
    artistMetadata: {},
    cart: {
      items: [],
      isCheckoutClicked: false,
    },
  },
  reducers: {
    setIsDarkMode: (state, actions) => {
      state.isDarkMode = actions.payload;
    },
    setSuggestions: (state, actions) => {
      state.suggestions = actions.payload;
    },
    setArtist: (state, actions) => {
      state.artist = actions.payload;
    },
    setEvents: (state, actions) => {
      state.events = actions.payload;
    },
    setVenue: (state, actions) => {
      state.venue = actions.payload;
    },
    setArtistTopTracks: (state, actions) => {
      state.artistTopTracks = actions.payload;
    },
    setArtistMetadata: (state, actions) => {
      state.artistMetadata = actions.payload;
    },
    setCart: (state, actions) => {
      switch (actions.payload.type) {
        case "ADD_TO_CART":
          state.cart.items.push(actions.payload.payload);
          break;
        case "INCREASE_ITEM":
          const objectsIncr = [...state.cart.items];
          objectsIncr[actions.payload.index].ticketInCart++;
          state.cart.items = objectsIncr;
          break;
        case "DECREASE_ITEM":
          const objectsDecr = [...state.cart.items];
          objectsDecr[actions.payload.index].ticketInCart--;
          state.cart.items = objectsDecr;
          break;
        case "REMOVE_ITEM":
          state.cart.items = state.cart.items.filter(
            (item) => item.id !== actions.payload.payload.id
          );
          break;
        case "CHECKOUT_CART":
          state.cart.items = [];
          state.cart.isCheckoutClicked = true;
          break;
      }
    },
  },
});

export const {
  setSuggestions,
  setArtist,
  setIsDarkMode,
  setCart,
  setEvents,
  setVenue,
  setArtistMetadata,
  setArtistTopTracks,
} = shopSlice.actions;
