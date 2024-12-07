import CalendarView from "../Calendar"
import { useToDoContext } from "../../hooks/useToDoContext";
import { useOpen } from "../../hooks/useOpen";
import ToDoCardEmployer from "../../components/ToDoCardEmployer";
import { useProjectsContext } from "../../hooks/useProjectsContexr";
import { useEmployersContext } from "../../hooks/useEmployersContext";
import { useState } from "react";
import { useCompaniesContext } from "../../hooks/useCompanyContext";

const EmployerHome = () => {
    const { todoes } = useToDoContext()
    const { companies } = useCompaniesContext()
    const { projects } = useProjectsContext()
    const { employers } = useEmployersContext()
    const [open, changeToOpen, changeToClose] = useOpen()
    const [toDoSelected, setToDoSelected] = useState({
        'id': 1,
        'title': "",
        'expired': "",
        'id_status': 1,
        "companyName": '',
        "projectName":"",
        "employerName":"",
    })
    

    const clickTodo = (e) => {
        const end = e.event._instance.range.end
        const data = e.event._def.extendedProps.data
        const { id, title, expired, id_status, id_company,id_employer, id_project } = data

        const company = companies.filter((value) => {
            return parseInt(value.id_company) == parseInt(id_company)
        })

        const companyName = company[0]['name_company']

        const employer = employers.filter(value => 
            parseInt(value.id_employer) == parseInt(id_employer)
        );

        const employerName = employer[0]['name_employer']

        const project = projects.filter((value) => {
            return parseInt(value.id_project) == parseInt(id_project)
        })

        const projectName = project[0]['name_project']


        const info = {
            id,
            title,
            expired,
            id_status,
            companyName,
            projectName,
            employerName,
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