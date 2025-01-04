import CalendarView from "../Calendar"
import {
    Box
} from "@mui/material";
import { useState } from "react";
import { useToDoContext } from "../../hooks/useToDoContext";
import TableEmployers from "../../components/TableEmployers";
import TableCompanies from "../../components/TableCompanies";
import { useCompaniesContext } from "../../hooks/useCompanyContext";
import { useStatusContext } from "../../hooks/useStatusContext";
import { useEmployersContext } from "../../hooks/useEmployersContext";
import { useToDoTypeContext } from "../../hooks/useToDoTypeContext";
import { useOpen } from "../../hooks/useOpen";
import ToDoCardAdmin from "../../components/ToDoCardAdmin";
import dayjs from 'dayjs';

const initialValues = {
    'id': 1,
    'title': "",
    'delivery_date': dayjs(),
    'assignment_date': dayjs(), 
    'statusName': "",
    'className': "",
    'employerIndex': 0,
    'description_todo': "",
    'copy_text':'',
    'material_link': "",
    'companyName': "",
    'by_instragram':false,
    'by_facebook':false,
    'by_tiktok':false,
    'typeName':""
}

const AdminHome = () => {
    const { todoes } = useToDoContext()
    const { companies } = useCompaniesContext()
    const { statues } = useStatusContext()
    const { employers } = useEmployersContext()
    const { to_do_types } = useToDoTypeContext()
    const [open, changeToOpen, changeToClose] = useOpen()
    const [toDoSelected, setToDoSelected] = useState(initialValues)

    const clickTodo = (e) => {
        const delivery_date = e.event._instance.range.start
        const data = e.event._def.extendedProps.data
        
        const {
            id,
            title,
            assignment_date,
            description_todo,
            material_link,
            copy_text,
            by_instragram,
            by_facebook,
            by_tiktok,
            id_status,
            id_employer,
            id_company,
            id_type,
        } = data

        const assignment = dayjs(assignment_date).$d

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

        const typeTodo = to_do_types.filter((value) => {
            return parseInt(value.id_type) == parseInt(id_type)
        })

        const typeName = typeTodo[0]['name_type']

        const info = {
            id,
            title,
            delivery_date,
            assignment,
            statusName,
            companyName,
            statusClass,
            employerIndex,
            description_todo,
            material_link,
            copy_text,
            by_instragram,
            by_facebook,
            by_tiktok,
            typeName
        }

        setToDoSelected(info)
        changeToOpen()
    }

    return (
        <>
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

// 
// 