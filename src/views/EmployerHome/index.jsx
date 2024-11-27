import CalendarView from "../Calendar"
import { useToDoContext } from "../../hooks/useToDoContext";
import { Typography } from "@mui/material";
import { useOpen } from "../../hooks/useOpen";
import ToDoCardEmployer from "../../components/ToDoCardEmployer";
import { useState } from "react";
import { useCompaniesContext } from "../../hooks/useCompanyContext";

const EmployerHome = () => {
    const { todoes } = useToDoContext()
    const [open, changeToOpen, changeToClose] = useOpen()
    const [toDoSelected, setToDoSelected] = useState({
        'id': 1,
        'title': "",
        'expired': "",
        'id_status': 1,
        "companyName": ''
    })
    const { companies } = useCompaniesContext()

    const clickTodo = (e) => {
        const end = e.event._instance.range.end
        const data = e.event._def.extendedProps.data
        const { id, title, expired, id_status, id_company } = data

        const company = companies.filter((value) => {
            return parseInt(value.id_company) == parseInt(id_company)
        })

        const companyName = company[0]['name_company']


        const info = {
            id,
            title,
            expired,
            id_status,
            companyName,
            end
        }

        setToDoSelected(info)
        changeToOpen()
    }

    return (
        <>
            <CalendarView events={todoes} todoClick={clickTodo} />
            <ToDoCardEmployer open={open} info={toDoSelected} handleClose={changeToClose} />
        </>
    )
}

export default EmployerHome