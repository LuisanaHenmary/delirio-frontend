import axios from "axios";

export const getToDoes = async (user, dispatch) => {

    const apiUrl = import.meta.env.VITE_API_URL

    if (user.role == "admin") {
        const response = await axios({
            method: 'get',
            url: `${apiUrl}/to-does`,
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
        });

        const data = await response.data
        
        const events = data.map((event) => {
            const { id_todo, title, expired, id_status, id_employer, id_company, id_project } = event
            const date = new Date(expired);
            const day = date.getDate()
            const month = date.getMonth() + 1
            const year = date.getFullYear()
            const formatDate = `${day}-${month}-${year}`;

            return {
                'title': title,
                'start': date,
                'end': date,
                'data': {
                    'id': parseInt(id_todo),
                    'title': title,
                    'expired': formatDate,
                    'id_status': id_status,
                    'id_employer': id_employer,
                    "id_company": id_company,
                    "id_project": id_project
                }
            }
        })

        dispatch({ type: 'SET_TO_DOES', payload: events })

    } else if (user.role == "employer") {
        const response = await axios({
            method: 'get',
            url: `${apiUrl}/to-does/employer/${user.id_user}`,
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
        });

        const data = await response.data

        const events = data.map((event) => {
            const { id_todo, title, expired, id_status, id_employer, id_company } = event
            const date = new Date(expired);
            const day = date.getDate()
            const month = date.getMonth() + 1
            const year = date.getFullYear()
            const formatDate = `${day}-${month}-${year}`;

            return {
                'title': title,
                'start': date,
                'end': date,
                'data': {
                    'id': parseInt(id_todo),
                    'title': title,
                    'expired': formatDate,
                    'id_status': id_status,
                    'id_employer': id_employer,
                    "id_company": id_company
                }
            }
        })

        dispatch({ type: 'SET_TO_DOES', payload: events })

    } else if (user.role == "company") {
        const response = await axios({
            method: 'get',
            url: `${apiUrl}/to-does/company/${user.id_user}`,
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
        });

        const data = await response.data

        const events = data.map((event) => {
            const { id_todo, title, expired, id_status, id_employer, id_company } = event
            const date = new Date(expired);
            const day = date.getDate()
            const month = date.getMonth() + 1
            const year = date.getFullYear()
            const formatDate = `${day}-${month}-${year}`;

            return {
                'title': title,
                'start': date,
                'end': date,
                'data': {
                    'id': id_todo,
                    'title': title,
                    'expired': formatDate,
                    'id_status': id_status,
                    'id_employer': id_employer,
                    "id_company": id_company
                }
            }
        })

        dispatch({ type: 'SET_TO_DOES', payload: events })
    }


}

export const getEmployers = async (user, dispatchEmployers) => {

    const apiUrl = import.meta.env.VITE_API_URL

    const response = await axios({
        method: 'get',
        url: `${apiUrl}/employers`,
        headers: {
            'Authorization': `Bearer ${user.token}`,
        },
    });

    const data = await response.data
    dispatchEmployers({ type: 'SET_EMPLOYERS', payload: data })
}

export const getCompanies = async (user, dispatchCompanies) => {

    const apiUrl = import.meta.env.VITE_API_URL


    const response = await axios({
        method: 'get',
        url: `${apiUrl}/companies`,
        headers: {
            'Authorization': `Bearer ${user.token}`,
        },
    });

    const data = await response.data
    dispatchCompanies({ type: 'SET_COMPANIES', payload: data })
}

export const getStatus = async (user, dispatchStatus) => {

    const apiUrl = import.meta.env.VITE_API_URL

    const response = await axios({
        method: 'get',
        url: `${apiUrl}/status`,
        headers: {
            'Authorization': `Bearer ${user.token}`,
        },
    });

    const data = await response.data

    const list = data.map((elem) => {
        return {
            ...elem,
            'className': elem.name_status.replace(" ", "-").toLowerCase()
        }
    })

    dispatchStatus({ type: 'SET_STATUS', payload: list })
}

export const getJobs = async (user, dispatchJob) => {

    const apiUrl = import.meta.env.VITE_API_URL

    const response = await axios({
        method: 'get',
        url: `${apiUrl}/jobs`,
        headers: {
            'Authorization': `Bearer ${user.token}`,
        },
    });

    const data = await response.data
    dispatchJob({ type: 'SET_JOBS', payload: data })
}

export const getProjects = async (user, dispatchProjects) => {

    const apiUrl = import.meta.env.VITE_API_URL

    const response = await axios({
        method: 'get',
        url: `${apiUrl}/projects`,
        headers: {
            'Authorization': `Bearer ${user.token}`,
        },
    });

    const data = await response.data
    dispatchProjects({ type: 'SET_PROJECTS', payload: data })
}