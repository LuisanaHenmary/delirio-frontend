import axios from "axios";

export const formatedDate = (fullDate) => {
    const date = new Date(fullDate);
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    return `${day}-${month}-${year}`
}

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
            const {
                id_todo,
                title,
                delivery_date,
                assignment_date,
                description_todo,
                content_todo,
                material_link,
                copy_text,
                by_instragram,
                by_facebook,
                by_tiktok,
                id_type,
                id_status,
                id_employer,
                id_company
            } = event
            
            const formatedDelivery = formatedDate(delivery_date);

            return {
                'title': title,
                'start': delivery_date,
                'end': delivery_date,
                'data': {
                    'id': parseInt(id_todo),
                    'title': title,
                    'delivery_date': formatedDelivery,
                    'assignment_date': assignment_date,
                    'description_todo':description_todo,
                    'content_todo':content_todo,
                    'material_link':material_link,
                    'copy_text':copy_text,
                    'by_instragram':by_instragram,
                    'by_facebook':by_facebook,
                    'by_tiktok':by_tiktok,
                    'id_type':id_type,
                    'id_status': id_status,
                    'id_employer': id_employer,
                    'id_company': id_company,

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

            const {
                id_todo,
                title,
                delivery_date,
                assignment_date,
                description_todo,
                content_todo,
                material_link,
                copy_text,
                by_instragram,
                by_facebook,
                by_tiktok,
                id_type,
                id_status,
                id_employer,
                id_company
            } = event
            
            const formatedDelivery = formatedDate(delivery_date);
            const formatedAssignment = formatedDate(assignment_date);

            return {
                'title': title,
                'start': delivery_date,
                'end': delivery_date,
                'data': {
                    'id': parseInt(id_todo),
                    'title': title,
                    'delivery_date': formatedDelivery,
                    'assignment_date': formatedAssignment,
                    'description_todo':description_todo,
                    'content_todo':content_todo,
                    'material_link':material_link,
                    'copy_text':copy_text,
                    'by_instragram':by_instragram,
                    'by_facebook':by_facebook,
                    'by_tiktok':by_tiktok,
                    'id_type':id_type,
                    'id_status': id_status,
                    'id_employer': id_employer,
                    'id_company': id_company,

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
            const {
                id_todo,
                title,
                delivery_date,
                assignment_date,
                description_todo,
                content_todo,
                material_link,
                copy_text,
                by_instragram,
                by_facebook,
                by_tiktok,
                id_type,
                id_status,
                id_employer,
                id_company
            } = event
            
            const formatedDelivery = formatedDate(delivery_date);
            const formatedAssignment = formatedDate(assignment_date);

            return {
                'title': title,
                'start': delivery_date,
                'end': delivery_date,
                'data': {
                    'id': parseInt(id_todo),
                    'title': title,
                    'delivery_date': formatedDelivery,
                    'assignment_date': formatedAssignment,
                    'description_todo':description_todo,
                    'content_todo':content_todo,
                    'material_link':material_link,
                    'copy_text':copy_text,
                    'by_instragram':by_instragram,
                    'by_facebook':by_facebook,
                    'by_tiktok':by_tiktok,
                    'id_type':id_type,
                    'id_status': id_status,
                    'id_employer': id_employer,
                    'id_company': id_company,

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

export const getToDoTypes = async (user, dispatchTypes) => {

    const apiUrl = import.meta.env.VITE_API_URL

    const response = await axios({
        method: 'get',
        url: `${apiUrl}/types`,
        headers: {
            'Authorization': `Bearer ${user.token}`,
        },
    });

    const data = await response.data
    dispatchTypes({ type: 'SET_TO_DO_TYPES', payload: data })
}

export const getPlans = async (user, dispatchPlan) => {

    const apiUrl = import.meta.env.VITE_API_URL

    const response = await axios({
        method: 'get',
        url: `${apiUrl}/plans`,
        headers: {
            'Authorization': `Bearer ${user.token}`,
        },
    });

    const data = await response.data
    dispatchPlan({ type: 'SET_PLANS', payload: data })
}