import React, { useEffect, useState } from 'react';
import { eventData } from '../eventData';
import Modal from './modal';

const Calendar = () => {
  const [openModal, setOpenModal] = useState(null);
  const [openNewEvent, setOpenNewEvent] = useState(false);

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

    const daysArr = [];
    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      let dayOfMonth = i > paddingDays ? i - paddingDays : null;

      let date = dayOfMonth
        ? `${year}-${(month + 1).toString().padStart(2, '0')}-${dayOfMonth
            .toString()
            .padStart(2, '0')}`
        : null;

      daysArr.push({
        day: dayOfMonth,
        isCurrentDay:
          dayOfMonth === new Date().getDate() &&
          nav === 0 &&
          month === new Date().getMonth(),
        date: date,
      });
    }
    setDays(daysArr);

    setCurrentMonth(
      `${dt.toLocaleDateString('de-at', { month: 'long' })} ${year}`,
    );
  };

  // navigation
  const goToNextMonth = () => {
    setNav(nav + 1);
  };
  const goToPrevMonth = () => {
    setNav(nav - 1);
  };

  const handleDayClick = (day) => {
    if (day.day) {
      setOpenModal(day);
    }
  };

  return (
    <div id="container">
      <div>
        <button id="backButton" onClick={goToPrevMonth}>
          Back
        </button>
        <button id="nextButton" onClick={goToNextMonth}>
          Next
        </button>
        <button id="createButton">Create</button>
      </div>

      <div>{currentMonth}</div>
      <div id="weekdays">
        {weekdays.map((weekday) => (
          <div key={weekday}>{weekday}</div>
        ))}
      </div>
      <div id="calendar">
        {days.map((day, index) => (
          <div
            key={index}
            className={`day ${day.isCurrentDay ? 'currentDay' : ''}`}
            onClick={() => handleDayClick(day)}
          >
            {day.day}

            <div>
              {events.find((e) => e.dateVenue === day.date) && (
                <>
                  <div className="event">
                    {events.find((e) => e.dateVenue === day.date).title}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {openModal && (
        <Modal events={events} day={openModal} setOpenModal={setOpenModal} />
      )}
    </div>
  );
};

export default Calendar;
