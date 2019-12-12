import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Routes from './routes'
import axios from 'axios'

import consts from '../consts'
import Auth from '../auth/Auth'

function AuthOrApp() {

    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        if (auth.user) {

            dispatch({ type: 'TOKEN_VALIDATED', payload: true })
            // const config = {
            //     headers: {
            //         'Authorization': "Bearer " + auth.user.token
            //     }
            // }

            // if (auth.user.token) {
            //     axios.post(`${consts.API_URL}/api/validateToken`, undefined, config)
            //         .then(resp => {
            //             dispatch({ type: 'TOKEN_VALIDATED', payload: resp.data.valid })
            //         })
            //         .catch(e => dispatch({ type: 'TOKEN_VALIDATED', payload: false }))
            // } else {
            //     dispatch({ type: 'TOKEN_VALIDATED', payload: false })
            // }
        }
    }, [auth.user, dispatch])


    const { user, validToken } = auth

    if (user && validToken) {
        return <Routes />
    } else if (!user && !validToken) {
        return <Auth />
    } else {
        return false
    }

}

export default AuthOrApp