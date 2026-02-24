import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { styled, Typography } from "@mui/material"
import esLocale from '@fullcalendar/core/locales/es';
import { useRef, useEffect, useState } from "react";

const CalendarView = ({ events, todoClick }) => {

  const classes = {
    1: "sin-contenido",
    2: "pendiente-aprob",
    3: "aprobado",
    4: "en-proceso",
    5: "publicado",
  }


  const calendarRef = useRef(null);
  const [calendarWidth, setCalendarWidth] = useState(0);

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
          fontSize: "13px",
          textAlign: 'center',
          textDecorationLine: 'none'
        }}


      >
        {eventInfo.event.title}
      </Typography>
    );
  };

  const CalendarWrapper = styled('div')(({ theme }) => ({
    '& .fc': {
      fontFamily: 'Montserrat, sans-serif',
    },
    '& .fc-toolbar-title': {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    '& .fc-daygrid-day-number, & .fc-col-header-cell': {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 400,
    },
  }));

  useEffect(() => {
    const updateCalendarWidth = () => {
      if (calendarRef.current) {
        setCalendarWidth(calendarRef.current.getBoundingClientRect().width);
      }
    };

    updateCalendarWidth();
    window.addEventListener('resize', updateCalendarWidth);

    return () => window.removeEventListener('resize', updateCalendarWidth);
  }, []);


  return (
    <CalendarWrapper ref={calendarRef} style={{ width: '100%', padding: '20px' }}>
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "title",
          end: "today prev,next",
        }}
        events={events}
        eventClick={todoClick}
        eventContent={renderEventContent}
        locale={esLocale}
        height="auto"
        contentHeight="auto"
        aspectRatio={calendarWidth < 600 ? 0.7 : 1.35}
      />
    </CalendarWrapper>
  )
}

export default CalendarView