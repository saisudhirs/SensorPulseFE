import {configureStore, createSlice, PayloadAction} from "@reduxjs/toolkit";

interface TokenState {
    token: string
}
interface SensorState {
    sensorname: string,
    sensorid: string,
    units: string
}

export const tokenSlice = createSlice({
    name: "tok", initialState: {token: "" as string} as TokenState, reducers: {
        setToken(state: TokenState, action: PayloadAction<string>) {
            state.token = action.payload
        }
    }
})

export const sensorSlice = createSlice({
    name: "sensors", initialState: {sensorname: "", sensorid: "", units: ""} as SensorState, reducers: {
        setSensorName(state: SensorState, action: PayloadAction<string>) {
            state.sensorname = action.payload
        },
        setSensorID(state: SensorState, action: PayloadAction<string>) {
            state.sensorid = action.payload
        },
        setUnits(state: SensorState, action: PayloadAction<string>) {
            state.units = action.payload
        }
    }
})
export const store = configureStore({
    reducer: {
        tok: tokenSlice.reducer,
        sensors: sensorSlice.reducer
    }
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
