import CalendarView from "../Calendar"
import { useState } from "react";
import { useOpen } from "../../hooks/useOpen";
import { useToDoContext } from "../../hooks/useToDoContext";
import { useCompaniesContext } from "../../hooks/useCompanyContext";
import { useEmployersContext } from "../../hooks/useEmployersContext";
import { useStatusContext } from "../../hooks/useStatusContext";
import { useProjectsContext } from "../../hooks/useProjectsContexr";
import ToDoCardCompany from "../../components/ToDoCardCompany";


const CompanyHome = () => {
    const { todoes } = useToDoContext()
    const { companies } = useCompaniesContext()
    const { statues } = useStatusContext()
    const { employers } = useEmployersContext()
    const { projects } = useProjectsContext()
    const [open, changeToOpen, changeToClose] = useOpen()
    const [toDoSelected, setToDoSelected] = useState({
        'id': 1,
        'title': "",
        'expired': "",
        'statusName': "",
        "companyName": "",
        "statusClass": "",
        "employerName": "",
        "projectName":""
    })

    const clickTodo = (e) => {
        const data = e.event._def.extendedProps.data
        const { id, title, expired, id_status, id_company , id_employer, id_project  } = data

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

        const project = projects.filter((value) => {
            return parseInt(value.id_project) == parseInt(id_project)
        })

        const projectName = project[0]['name_project']

        const info = {
            id,
            title,
            expired,
            statusName,
            companyName,
            statusClass,
            employerName,
            projectName
        }
  
        setToDoSelected(info)
        changeToOpen()
        
    }

    return (
        <>
            <CalendarView events={todoes} todoClick={clickTodo} />
            <ToDoCardCompany open={open} info={toDoSelected} handleClose={changeToClose} />
        </>
    )
}

export default CompanyHome