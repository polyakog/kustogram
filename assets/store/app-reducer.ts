import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";


const slice = createSlice({
    name: "app",
    initialState: {
        isAppInitialized: false,
        unhandleActions: [] as string[],
    },
    reducers: {
        setIsAppInitialized: (state, action: PayloadAction<{ isAppInitialized: boolean }>) => {
            state.isAppInitialized = action.payload.isAppInitialized;
        },
    },
 
});




export const appReducer = slice.reducer;
export const appActions = slice.actions;


