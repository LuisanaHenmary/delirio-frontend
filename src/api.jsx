import axios from "axios";

export const getToDoes = async (user, dispatch) => {

    const apiUrl = import.meta.env.VITE_API_URL


    const response = await axios({
        method: 'get',
        url: `${apiUrl}/to-does`,
        headers: {
            'Authorization': `Bearer ${user.token}`,
        },
    });

    const data = await response.data

    const events = data.map((event) => {
        const { id_todo, title, expired, id_status, id_employer, id_company } = event

        return {
            'title': title,
            'start': new Date(expired),
            'end': new Date(expired),
            'data': {
                'id': id_todo,
                'title': title,
                'expired': expired,
                'id_status': id_status,
                'id_employer': id_employer,
                "id_company": id_company
            }
        }
    })

    dispatch({ type: 'SET_TO_DOES', payload: events })
}