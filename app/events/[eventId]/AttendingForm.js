'use client';

import { useState } from 'react';

export default function AttendingForm() {
  const [attendees, setAttendees] = useState([]);

  const newAttendee = {
    attending: false,
  };

  const changeAttendingStatus = (index) => {
    const updateAttending = [...attendees];
    updateAttending[index].attending = !updateAttending[index].attending;
    setAttendees(updateAttending);
  };

  return (
    <div>
      {attendees.map((attendee, index) => (
        <li key={`attendee-${nanoid()}`}>
          {JSON.parse(
            JSON.stringify(
              attendee.attending ? 'is attending' : 'is not attending',
            ),
          )}
          <input
            aria-label="attending"
            type="checkbox"
            // checked={id.isAttending}
            checked={attendee.attending}
            onChange={() => {
              changeAttendingStatus(index);
            }}
          />{' '}
        </li>
      ))}
    </div>
  );
}
