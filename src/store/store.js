import { configureStore } from "@reduxjs/toolkit";
import game from "./game";



export const store = configureStore({
    reducer: { game },
});