import { LOGGED_IN, LOGGED_OUT } from './actionConstants'

export const loggedIn = (user) => ({
    type: LOGGED_IN,
    user
})

export const loggedOut = () => ({
    type: LOGGED_OUT,
})