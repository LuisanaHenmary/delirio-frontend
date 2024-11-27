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
        const apiAuthUrl = import.meta.env.VITE_API_AUTH_URL
        const apiUrl = import.meta.env.VITE_API_URL
        

        try {
            const response = await axios({
                method: 'post',
                url: apiAuthUrl,
                data: {
                    username: username,
                    password: password,
                }
            });

            const data = await response.data

            const response_role = await axios({
                method: 'get',
                url: `${apiUrl}/get-rol`,
                headers: {
                    'Authorization': `Bearer ${data.token}`,
                },
            });
    
            const info_user = await response_role.data;
    
            const allInfo = {
                ...data,
                "role": info_user.role,
                "id_user": info_user.id_user
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

    return { login, isLoading, error, dispatch }
}