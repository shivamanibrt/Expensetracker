import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Components/Redux/User/userSlice";
import transReducer from "./Components/Redux/Transaction/transSlic";

export const store = configureStore({
    reducer: {
        user: userReducer,
        transaction: transReducer,
    },
})