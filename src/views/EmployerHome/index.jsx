import CalendarView from "../Calendar"
import { useToDoContext } from "../../hooks/useToDoContext";
import { useOpen } from "../../hooks/useOpen";
import ToDoCardEmployer from "../../components/ToDoCardEmployer";
import { useState } from "react";
import { useCompaniesContext } from "../../hooks/useCompanyContext";
import dayjs from 'dayjs';
import { useToDoTypeContext } from "../../hooks/useToDoTypeContext";

const EmployerHome = () => {
    const { todoes } = useToDoContext()
    const { companies } = useCompaniesContext()
    const { to_do_types } = useToDoTypeContext()
    const [open, changeToOpen, changeToClose] = useOpen()
    const [toDoSelected, setToDoSelected] = useState({
        'id': 1,
        'title': "",
        'delivery_date': dayjs(),
        'assignment_date': dayjs(),
        'description_todo': "",
        'content_todo':'',
        'material_link': "",
        'copy_text':'',
        'id_status': 1,
        "companyName": '',
        "typeName":"",
        
    })
    

    const clickTodo = (e) => {
        const end = e.event._instance.range.end
        const data = e.event._def.extendedProps.data
        const {
            id,
            title,
            delivery_date,
            assignment_date,
            description_todo,
            content_todo,
            material_link,
            copy_text,
            id_type,
            id_status,
            id_company
        } = data

        const company = companies.filter((value) => {
            return parseInt(value.id_company) == parseInt(id_company)
        })

        const companyName = company[0]['name_company']

        const typeTodo = to_do_types.filter((value) => {
            return parseInt(value.id_type) == parseInt(id_type)
        })

        const typeName = typeTodo[0]['name_type']

        const info = {
            id,
            title,
            delivery_date,
            assignment_date,
            description_todo,
            content_todo,
            material_link,
            copy_text,
            id_status,
            companyName,
            typeName,
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