import { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box, Typography } from '@mui/material';

const WeekStatistics = ({ todoes }) => {

    const [daysWeek, setDaysWeek] = useState([])
    const [data, setData] = useState([])

    const getDaysFromToday = () => {


        let d = 0
        const today = new Date(); // Fecha actual
        const dayList = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"]
        let indexDay = dayList.indexOf(today.toLocaleDateString("es-ES", { weekday: 'short' }))
        d = today.getDate()

        while( indexDay > 0 ){
            indexDay--
            d--
        }


        const weekDays = dayList.map((day,index)=>{
            const refence = new Date();
            refence.setDate(d + index);
            return refence.toLocaleDateString("es-ES", { weekday: 'short', month: 'short', day: 'numeric' })
        })

   
        return weekDays;
    }

    useEffect(() => {

        const week = getDaysFromToday()

        if (todoes.length > 0) {

            const allDatesToDoes = todoes.map((elem) => {
                const dateToDo = new Date(elem.end);
                const formatDate = dateToDo.toLocaleDateString("es-ES", { weekday: 'short', month: 'short', day: 'numeric' })

                return {
                    date: formatDate,
                    id_status: parseInt(elem.data.id_status)
                }
            })


            const weekTodoes = allDatesToDoes.filter((elem) => {
                return week.includes(elem.date);
            })

            const data = week.map((day, index) => {
                const noStartCount = weekTodoes.reduce((conteo, toDo) => {
                    return ((toDo.id_status == 1) && (toDo.date === day)) ? conteo + 1 : conteo;
                }, 0);

                const inProcesingCount = weekTodoes.reduce((conteo, toDo) => {
                    return ((toDo.id_status == 2) && (toDo.date === day)) ? conteo + 1 : conteo;
                }, 0);

                const doneCount = weekTodoes.reduce((conteo, toDo) => {
                    return ((toDo.id_status == 3) && (toDo.date === day)) ? conteo + 1 : conteo;
                }, 0);

                return {
                    key: index,
                    x: day,
                    y1: noStartCount,
                    y2: inProcesingCount,
                    y3: doneCount
                }
            })

            setData(data)

        }

        setDaysWeek(week)

    }, [todoes])

    return (
        <Box component="div" >
            {(daysWeek.length > 0) && (data.length > 0) && (
                <>
                    <Typography variant='h2' component="h2"> Progreso de esta semana </Typography>
                    <BarChart
                        height={300}
                        series={[
                            {
                                data: data.map((v) => { return v.y1 }),
                                label: 'To-do',
                                id: 'toDoId1',
                                color: "antiquewhite"
                            },
                            {
                                data: data.map((v) => { return v.y2 }),
                                label: 'In progresing',
                                id: 'toDoId2',
                                color: "rgb(148, 152, 249)"
                            },
                            {
                                data: data.map((v) => { return v.y3 }),
                                label: 'Done', id:
                                    'toDoId3',
                                color: "greenyellow"
                            },
                        ]}
                        xAxis={[{ data: daysWeek, scaleType: 'band' }]}
                    />
                </>
            )}
        </Box>
    );
}

export default WeekStatistics