import { login } from '@/api/auth'
import { IApiEmptyResult, IApiStatus } from '@/interfaces/api'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IInitialState {
    isAuth: boolean
    login: {
        status: IApiStatus | null
        error: string | null
        result: string | null
    }
}

const initialState: IInitialState = {
    isAuth: localStorage.getItem('isAuth') === 'true' ? true : false,
    login: {
        status: null,
        error: null,
        result: null
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            localStorage.setItem('isAuth', action.payload ? 'true' : 'false')
            state.isAuth = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.login.status = 'loading'
            })
            .addCase(login.rejected, (state, action) => {
                state.login.status = 'failed'
                state.login.error = action.payload as string
            })
            .addCase(login.fulfilled, (state, action) => {
                state.login.status = 'success'
                state.login.result = action.payload.status
            })
    }
})

export const { setIsAuth } = authSlice.actions
export default authSlice.reducer
