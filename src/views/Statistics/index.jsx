import { useEffect, useState } from "react";
import { Container, Box, Typography } from '@mui/material';
import { useToDoContext } from "../../hooks/useToDoContext";
import { useEmployersContext } from '../../hooks/useEmployersContext';
import WeekStatistics from "../../components/WeekStatistics"
import PieEmployer from "../../components/PieEmployer";



const Statistics = () => {
    const { todoes } = useToDoContext()
    const { employers } = useEmployersContext()
    const [toDoesPerEmployer, setToDoesPerEmployer] = useState([])

    useEffect(() => {

        if(todoes.length > 0){
            const data = employers.map((v) => {
                const toDoes = todoes.filter((value) => {
                    return parseInt(value.data.id_employer) === parseInt(v.id_employer)
                })
    
                return {
                    "name_employer": v.name_employer,
                    "todoes": toDoes
                }
            })
    
            setToDoesPerEmployer(data)
        }
    }, [todoes])

    return (
        <Container>
            <WeekStatistics todoes={todoes} />

            <Typography component="h2" variant="h2" > Estadisticas de los empleados </Typography>
            <Box component="div" sx={{ width:"100%", display:"flex", flexWrap:"wrap", justifyContent:'space-around'}} >
                
                {
                    toDoesPerEmployer.length > 0 && (
                        <>
                            {toDoesPerEmployer.map((employer, index) => (
                                <PieEmployer data={employer}  key={index} />
                            ))}
                        </>
                    )
                }
            </Box> 
            
        </Container>
    );
}

export default Statistics