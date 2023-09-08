import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        showNotification(state, action) {
            const msg = action.payload
            return msg
        },
        hideNotification(state, action)  {
            return ""
        }
    }
})

export const setNotification = (msg, time) => {
    return dispatch => {
        dispatch(showNotification(msg))
        setTimeout(() => {
            dispatch(hideNotification())
        }, time * 1000) 
    }
}

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer