import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
import templeReducer from './slices/templeSlice';

export const reduxStore = configureStore(
    {
        reducer:{
            userLogin: userReducer,
            templeLogin: templeReducer
        }
    }
)