import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: []
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find(item => item.id === action.payload.id)

      if (item) {
        item.quantity = action.payload.quantity
        item.sizedCart = action.payload.sizedCart
      } else {
        state.products.push(action.payload)
      }
    },
    decrement: (state, action) => {
      const item = state.products.find(item => item.id === action.payload.id)

      if (item) {
        if (item.quantity >= 2) {
          item.quantity -= action.payload.quantity
        }
      }
      // else {
      //   state.products.push(action.payload)
      // }
    },
    removeItem: (state, action) => {
      state.products = state.products.filter(item => item.id !== action.payload)
    },
    resetCart: state => {
      state.products = []
    }
  }
})

// Action creators are generated for each case reducer function
export const { addToCart, removeItem, resetCart, decrement } = cartSlice.actions

export default cartSlice.reducer
