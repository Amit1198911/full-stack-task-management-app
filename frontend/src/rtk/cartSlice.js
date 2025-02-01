import { createSlice } from "@reduxjs/toolkit";

// Cart Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      if (action.payload && action.payload.id && action.payload.name) {
        const existingItemIndex = state.items.findIndex(
          (item) => item.id === action.payload.id
        );

        if (existingItemIndex !== -1) {
          // If the item exists, create a new object with the updated quantity
          state.items[existingItemIndex] = {
            ...state.items[existingItemIndex],
            quantity: state.items[existingItemIndex].quantity + 1,
          };
        } else {
          // Add the new item to the cart with an initial quantity of 1
          state.items.push({ ...action.payload, quantity: 1 });
        }
      } else {
        console.error("Invalid payload", action.payload);
      }
    },
    removeCart: (state, action) => {
      // Check if the payload is valid and contains an id
      if (action.payload && action.payload.id) {
        // Find the index of the item in the cart
        const existingItemIndex = state.items.findIndex(
          (item) => item.id === action.payload.id
        );

        // Ensure the item exists in the cart
        if (existingItemIndex !== -1) {
          const existingItem = state.items[existingItemIndex];

          // Check the quantity and update it
          if (existingItem.quantity > 1) {
            // Update the quantity immutably
            state.items[existingItemIndex] = {
              ...existingItem,
              quantity: existingItem.quantity - 1,
            };
          } else {
            // Remove the item if the quantity is 1
            state.items = state.items.filter(
              (item) => item.id !== action.payload.id
            );
          }
        } else {
          console.error(
            "Item not found in the cart for removal",
            action.payload
          );
        }
      } else {
        console.error("Invalid payload for removeCart", action.payload);
      }
    },
  },
});

export default cartSlice.reducer;

export const { addToCart, removeCart } = cartSlice.actions;
