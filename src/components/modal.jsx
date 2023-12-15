import React from 'react';

const Modal = ({ events, setOpenModal, day }) => {
  const eventsForDay = events.filter((event) => event.dateVenue === day.date);

  return (
    <div>
      <div id="modalBackDrop">
        <h2>Details for {day.date}</h2>

        {eventsForDay.length > 0 ? (
          <div>
            {eventsForDay.map((event, index) => (
              <div key={index}>
                <p>
                  Home Team:{' '}
                  {event.homeTeam ? event.homeTeam.officialName : 'N/A'}
                </p>

                {event.status !== 'scheduled' && event.result ? (
                  <div>
                    <p>Home Goals: {event.result.homeGoals}</p>
                    <p>Away Goals: {event.result.awayGoals}</p>
                    <p>Winner: {event.result.winner}</p>
                  </div>
                ) : (
                  ''
                )}

                <p>
                  Away Team:{' '}
                  {event.awayTeam ? event.awayTeam.officialName : 'N/A'}
                </p>
                <p>Season: {event.season}</p>
                <p>Status: {event.status}</p>
                <p>Date: {event.dateVenue}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No games today!</p>
        )}
        <button onClick={() => setOpenModal(null)}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
