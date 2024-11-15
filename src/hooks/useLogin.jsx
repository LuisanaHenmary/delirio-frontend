import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (username, password) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost/Delirio/wp-json/jwt-auth/v1/token',
                data: {
                    username: username,
                    password: password,
                }
            });

            const data = await response.data

            const response_role = await axios({
                method: 'get',
                url: 'http://localhost/Delirio/wp-json/custom-api/v1/get-rol',
                headers: {
                    'Authorization': `Bearer ${data.token}`,
                },
            });
    
            const role = await response_role.data;
    
            const allInfo = {
                ...data,
                "role": role.role
            }

            localStorage.setItem('user', JSON.stringify(allInfo))
            dispatch({ type: 'LOGIN', payload: allInfo })

        } catch (e) {
            let message = e.response.data.message
            message = message.replaceAll("<strong>", "")
            message = message.replaceAll("</strong>", "")
            setError(message.slice(0, message.indexOf(".")))
        } finally {
            setIsLoading(false)
        }

    }

    return { login, isLoading, error }
}