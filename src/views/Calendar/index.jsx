import axios from "axios";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box } from "@mui/material"


const CalendarView = ({events}) => {




    return (
        <Box height={"50%"} width={"100%"}>
            <Fullcalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={"dayGridMonth"}
                headerToolbar={{
                    start: "title",
                    end: "today prev,next",
                }}
                dateClick={(e) => {
                    console.log(e)
                    console.log(events)
                }}
                events={events}
            />
        </Box>
    )
}

export default CalendarView