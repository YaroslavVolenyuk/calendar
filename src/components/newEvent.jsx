import React, { useState } from 'react';

const NewEvent = ({ setOpenNewEvent, events, setEvents }) => {
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [season, setSeason] = useState('');
  const [status, setStatus] = useState('');
  const [dateVenue, setDateVenue] = useState('');

  console.log('event', events);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      season: parseInt(season, 10),
      status,
      timeVenueUTC: '',
      dateVenue,
      stadium: null,
      homeTeam: {
        name: homeTeam,
        officialName: homeTeam + ' FC',
      },
      awayTeam: {
        name: awayTeam,
        officialName: awayTeam + ' FC',
      },
      result: {
        homeGoals: 0,
        awayGoals: 0,
        winner: null,
      },
    };

    setEvents((currentEvents) => [...currentEvents, newEvent]);

    setHomeTeam('');
    setAwayTeam('');
    setSeason('');
    setStatus('');
    setDateVenue('');
    setOpenNewEvent(false);
  };

  return (
    <div id="new-event-parent">
      {' '}
      <p>Create new event</p>
      <div>
        <form onSubmit={handleSubmit}>
          <div id="new-event-modal">
            <div id="label">
              {' '}
              <label>
                Home Team:
                <input
                  type="text"
                  value={homeTeam}
                  onChange={(e) => setHomeTeam(e.target.value)}
                />
              </label>
            </div>
            <div id="label">
              {' '}
              <label>
                Away Team:
                <input
                  type="text"
                  value={awayTeam}
                  onChange={(e) => setAwayTeam(e.target.value)}
                />
              </label>
            </div>
            <div id="label">
              {' '}
              <label>
                Season:
                <input
                  type="number"
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                />
              </label>{' '}
            </div>
            <div id="label">
              {' '}
              <label>
                Status:
                <input
                  type="text"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </label>
            </div>
            <div id="label">
              {' '}
              <label>
                Date:
                <input
                  type="date"
                  value={dateVenue}
                  onChange={(e) => setDateVenue(e.target.value)}
                />
              </label>
            </div>

            <div id="label">
              <button type="submit">Add</button>
              <button type="button" onClick={() => setOpenNewEvent(false)}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewEvent;
