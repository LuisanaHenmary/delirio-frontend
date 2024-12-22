import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box, Typography } from "@mui/material"

const CalendarView = ({ events, todoClick }) => {

  const classes = {
    1: "sin-contenido",
    2: "pendiente-aprob",
    3: "aprobado",
    4: "en-proceso",
    5: "publicado",
  }

  const renderEventContent = (eventInfo) => {

    const index = parseInt(eventInfo.event.extendedProps.data.id_status)

    return (
      <Typography

        className={classes[index]}
        variant="h6"
        component='span'
        sx={{
          borderRadius: '5px',
          padding: '5px',
          color: 'black',
          margin: '2px',
          fontSize:"13px",
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