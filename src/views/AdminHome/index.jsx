import CalendarView from "../Calendar"
import {
    Box, Typography
} from "@mui/material";
import { useState, use } from "react";
import { useToDoContext } from "../../hooks/useToDoContext";
import TableEmployers from "../../components/TableEmployers";
import TableCompanies from "../../components/TableCompanies";
import { useCompaniesContext } from "../../hooks/useCompanyContext";
import { useStatusContext } from "../../hooks/useStatusContext";
import { useEmployersContext } from "../../hooks/useEmployersContext";
import { useOpen } from "../../hooks/useOpen";
import ToDoCardAdmin from "../../components/ToDoCardAdmin";
import dayjs from 'dayjs';


const AdminHome = () => {
    const { todoes } = useToDoContext()
    const { companies } = useCompaniesContext()
    const { statues } = useStatusContext()
    const { employers } = useEmployersContext()
    const [open, changeToOpen, changeToClose] = useOpen()
    const [toDoSelected, setToDoSelected] = useState({
        'id': 1,
        'title': "",
        'expired': dayjs(),
        'statusName': "",
        'employerIndex': 0,
        "companyNamey": "",
        "statusClass": ""
    })

    const clickTodo = (e) => {
        const expired = e.event._instance.range.start
        const data = e.event._def.extendedProps.data
        const { id, title, id_status, id_company, id_employer } = data

        const company = companies.filter((value) => {
            return parseInt(value.id_company) == parseInt(id_company)
        })

        const companyName = company[0]['name_company']

        const status = statues.filter((value) => {
            return parseInt(value.id_status) == parseInt(id_status)
        })

        const employerIndex = employers.findIndex(employer => 
            parseInt(employer.id_employer) == parseInt(id_employer)
        );

        const statusName = status[0]['name_status']
        const statusClass = status[0]['className']

        const info = {
            id,
            title,
            expired,
            statusName,
            companyName,
            statusClass,
            employerIndex
        }

        setToDoSelected(info)
        changeToOpen()
    }

    return (
        <>
            <Typography component="h2" > Bienvenido administrador </Typography>

            <CalendarView events={todoes} todoClick={clickTodo} />
            <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: '60px' }} >
                <TableEmployers />
                <TableCompanies />
            </Box>
            <ToDoCardAdmin open={open} info={toDoSelected} handleClose={changeToClose} />
        </>
    )
}

export default AdminHome