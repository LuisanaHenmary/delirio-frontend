import { Box, Typography } from "@mui/material"
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { useEffect, useState } from "react";
import "./index.css"

const sizing = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    legend: { hidden: true },
};


const PieEmployer = ({ data }) => {
    const { todoes, name_employer } = data
    const [dataPie, setDataPie] = useState([])

    useEffect(() => {


        if (todoes.length > 0) {
            const noStartCount = todoes.reduce((conteo, toDo) => {
                return toDo.data.id_status == 1 ? conteo + 1 : conteo;
            }, 0);

            const inProcesingCount = todoes.reduce((conteo, toDo) => {
                return toDo.data.id_status == 2 ? conteo + 1 : conteo;
            }, 0);

            const doneCount = todoes.reduce((conteo, toDo) => {
                return toDo.data.id_status == 3 ? conteo + 1 : conteo;
            }, 0);

            const info = [
                { label: 'To-do', value: noStartCount, color: 'antiquewhite' },
                { label: 'In procesing', value: inProcesingCount, color: 'rgb(148, 152, 249)' },
                { label: 'Done', value: doneCount, color: 'greenyellow' },
            ];

            setDataPie(info)
        }

    }, [todoes])

    const getPercents = (params) => {
        const total = todoes.length;
        const percent = params.value / total;
        return percent > 0 ? `${(percent * 100).toFixed(0)}%` : null;
    }


    return (
        <Box width={250} height={250} component="div" className="pie-container" >
            <Typography variant="h4" component="h4" > {name_employer} </Typography>

            <Box component="div" className="employer-progress" >
                {(dataPie.length > 0) && (<PieChart
                    series={[
                        {
                            outerRadius: 80,
                            data: dataPie,
                            arcLabel: getPercents,
                        },
                    ]}
                    sx={{
                        [`& .${pieArcLabelClasses.root}`]: {
                            fill: 'black',
                            fontSize: 14,
                        },
                    }}
                    {...sizing}
                />)}

                {(dataPie.length < 1) && ( <Typography variant="h6" component="p" >
                    El empleado aun no tiene tareas asignadas
                </Typography> )}
            </Box>

        </Box>
    )
}

export default PieEmployer