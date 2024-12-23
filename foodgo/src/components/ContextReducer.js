import React, { createContext, useContext, useReducer } from 'react'; // Import necessary hooks from React

// Create two context objects for managing state and dispatch
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Reducer function to handle different cart actions
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD": // Action to add a new item to the cart
            return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }];
        case "REMOVE": // Action to remove an item from the cart
            let newArr = [...state]; // Create a copy of the current state
            newArr.splice(action.index, 1); // Remove the item at the given index
            return newArr;
        case "DROP": // Action to clear all items from the cart
            let empArray = []; // Create an empty array
            return empArray; // Return the empty array to clear the cart
        case "UPDATE": // Action to update the quantity and price of an item in the cart
            let arr = [...state]; // Create a copy of the current state
            arr.find((food, index) => { // Find the item in the cart to update
                if (food.id === action.id) { // Check if the item's id matches the action's id
                    console.log(food.qty, parseInt(action.qty), action.price + food.price); // Log the old quantity and the new price
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }; // Update the quantity and price
                }
                return arr;
            });
            return arr; // Return the updated array
        default: // Default case in case of an error
            console.log("Error in reducer"); // Log an error if no matching case is found
    }
};

// CartProvider component to wrap the app and provide state and dispatch to its children
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []); // Initialize the state with an empty array and use the reducer to manage state changes
    return (
        <CartDispatchContext.Provider value={dispatch}> 
            <CartStateContext.Provider value={state}>
                {children} 
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

// Custom hooks to use the cart state and dispatch functions
export const useCart = () => useContext(CartStateContext); // Custom hook to access the state of the cart
export const useDispatchCart = () => useContext(CartDispatchContext); // Custom hook to access the dispatch function of the cart
