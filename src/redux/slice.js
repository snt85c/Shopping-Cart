import { createSlice } from "@reduxjs/toolkit";

export const reducers = {
  setIsDarkMode: (state, actions) => {
    return { ...state, isDarkMode: actions.payload };
  },
  setSuggestions: (state, actions) => {
    return { ...state, suggestions: actions.payload };
  },
  setArtist: (state, actions) => {
    return { ...state, artist: actions.payload };
  },
  setEvents: (state, actions) => {
    return { ...state, events: actions.payload };
  },
  setVenue: (state, actions) => {
    return { ...state, venue: actions.payload };
  },
  setArtistTopTracks: (state, actions) => {
    return { ...state, artistTopTracks: actions.payload };
  },
  setArtistMetadata: (state, actions) => {
    return { ...state, artistMetadata: actions.payload };
  },
  setCart: (state, actions) => {
    switch (actions.payload.type) {
      case "SET_CART":
        return { ...state, cart: actions.payload.payload };
      case "ADD_TO_CART":
        return {
          ...state,
          cart: {
            ...state.cart,
            items: [...state.cart.items, actions.payload.payload],
          },
        };
      case "INCREASE_ITEM":
        const objectsIncr = [...state.cart.items];
        objectsIncr[actions.payload.index].ticketInCart++;
        state.cart.items = objectsIncr;
        break;
      case "DECREASE_ITEM":
        const objectsDecr = [...state.cart.items];
        if (objectsDecr[actions.payload.index].ticketInCart > 0)
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
      default:
        return;
    }
  },
};

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
  reducers,
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
