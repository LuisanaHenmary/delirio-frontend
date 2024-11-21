import CalendarView from "../Calendar"
import { Typography } from "@mui/material";
import { useState } from "react";
import { useOpen } from "../../hooks/useOpen";
import { useToDoContext } from "../../hooks/useToDoContext";
import { useCompaniesContext } from "../../hooks/useCompanyContext";
import { useEmployersContext } from "../../hooks/useEmployersContext";
import { useStatusContext } from "../../hooks/useStatusContext";
import ToDoCardCompany from "../../components/ToDoCardCompany";


const CompanyHome = () => {
    const { todoes } = useToDoContext()
    const { companies } = useCompaniesContext()
    const { statues } = useStatusContext()
    const { employers } = useEmployersContext()
    const [open, changeToOpen, changeToClose] = useOpen()
    const [toDoSelected, setToDoSelected] = useState({
        'id': 1,
        'title': "",
        'expired': "",
        'statusName': "",
        "companyName": "",
        "statusClass": "",
        "employerName": ""

    })

    const clickTodo = (e) => {
        const data = e.event._def.extendedProps.data
        const { id, title, expired, id_status, id_company , id_employer  } = data

        const company = companies.filter((value) => {
            return parseInt(value.id_company) == parseInt(id_company)
        })

        const companyName = company[0]['name_company']

        const status = statues.filter((value) => {
            return parseInt(value.id_status) == parseInt(id_status)
        })

        const statusName = status[0]['name_status']
        const statusClass = status[0]['className']

        const employer = employers.filter(value => 
            parseInt(value.id_employer) == parseInt(id_employer)
        );

        const employerName = employer[0]['name_employer']

        const info = {
            id,
            title,
            expired,
            statusName,
            companyName,
            statusClass,
            employerName
        }
  
        setToDoSelected(info)
        changeToOpen()
        
    }

    return (
        <>
            <Typography component="h2" > Bienvenido estimado cliente </Typography>
            <CalendarView events={todoes} todoClick={clickTodo} />
            <ToDoCardCompany open={open} info={toDoSelected} handleClose={changeToClose} />
        </>
    )
}

export default CompanyHome