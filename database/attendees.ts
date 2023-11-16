import { cache } from 'react';
import { Attendee } from '../migrations/00003-createTableAttendees';
import { sql } from './connect';

// export type EventAttendees = {
//   eventId: number;
//   userId: number;
//   isAttending: boolean;
// };

export const createAttendee = cache(
  async (eventId: number, userId: number, isAttending: boolean) => {
    const [attendee] = await sql<Attendee[]>`
      INSERT INTO
        attendees (
          event_id,
          user_id,
          is_attending
        )
      VALUES
        (
          ${eventId},
          ${userId},
          ${isAttending}
        ) RETURNING *
    `;

    return attendee;
  },
);
