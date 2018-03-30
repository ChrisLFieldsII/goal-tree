import { LOGGED_IN, LOGGED_OUT } from './actionConstants'

const initState = {
    user: null,
    loggedIn: false
}

const app = (state=initState, action) => {
    switch (action.type) {
        case LOGGED_IN:
            console.log('LOGGED_IN reducer!!')
            return {...state, loggedIn:true, user:action.user}
        case LOGGED_OUT:
            console.log('LOGGED_OUT reducer!!')
            return initState
        default:
            return state
    }
}

export default app