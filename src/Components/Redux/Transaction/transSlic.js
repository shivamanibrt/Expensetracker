import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    trans: []
}
export const transSlic = createSlice({
    name: 'trans',
    initialState,
    reducers: {
        setTrans: (state, { payload }) => {
            if (!state.trans.length && !payload.length) return;
            state.trans = payload

        },
    },
})
const { reducer, actions } = transSlic;
export const { setTrans } = actions;
export default reducer;