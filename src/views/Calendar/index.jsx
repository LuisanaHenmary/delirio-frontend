import axios from "axios";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box, Typography } from "@mui/material"

const CalendarView = ({events, todoClick}) => {

  const classes = {1:"to-do", 2:"in-progress", 3:"done"}

    const renderEventContent = (eventInfo) => {

        const index = parseInt(eventInfo.event.extendedProps.data.id_status)

        return (
          <Typography

            variant="h6"
            component='span'
            className={classes[index]}
            sx={{
              borderRadius: '5px',
              padding: '5px',
              color: 'black',
              margin: '2px',
              textAlign: 'center',
              textDecorationLine: 'none'
            }}

            
          >
            {eventInfo.event.title}
          </Typography>
        );
      };


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
                eventClick={todoClick}
                eventContent={renderEventContent}
                
            />
        </Box>
    )
}

export default CalendarView