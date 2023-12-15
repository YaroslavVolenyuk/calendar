import React, { useEffect, useState } from 'react';
import { eventData } from '../eventData';

const Calendar = () => {
  const [openModal, setOpenModal] = useState(null);

  console.log('openModal', openModal);
  const [nav, setNav] = useState(0);
  const [days, setDays] = useState([]);
  const [events, setEvents] = useState(eventData.data);
  const [currentMonth, setCurrentMonth] = useState('');

  const weekdays = [
    'Montag',
    'Dienstag',
    'Mittwoch',
    'Donnerstag',
    'Freitag',
    'Samstag',
    'Sonntag',
  ];

  useEffect(() => {
    loadCalendar();
  }, [nav, events]);

  const loadCalendar = () => {
    const dt = new Date();
    if (nav !== 0) {
      dt.setMonth(new Date().getMonth() + nav);
    }

    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateToString = firstDayOfMonth.toLocaleDateString('de-at', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    const paddingDays = weekdays.indexOf(dateToString.split(', ')[0]);
  };

  return (
    <div>
      <div>
        <button>Back</button>
        <button>Next</button>
      </div>

      <div>{currentMonth}</div>
      <div>
        {weekdays.map((weekday) => (
          <div key={weekday}>{weekday}</div>
        ))}
      </div>
      <div>
        {days.map((day, index) => (
          <div key={index}>
            {day.day}

            <div>
              {events.find((e) => e.dateVenue === day.date) && (
                <>
                  <div>
                    {events.find((e) => e.dateVenue === day.date).title}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
