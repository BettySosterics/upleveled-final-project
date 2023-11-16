import { cache } from 'react';
import { Event } from '../migrations/00002-createTableEvents';
import { sql } from './connect';

export type UserEvent = {
  eventId: number;
  title: string;
  description: string;
  location: string;
};

export const createEvent = cache(
  async (
    userId: number,
    title: string,
    description: string,
    location: string,
  ) => {
    const [event] = await sql<Event[]>`
      INSERT INTO
        events (
          user_id,
          title,
          description,
          location
        )
      VALUES
        (
          ${userId},
          ${title},
          ${description},
          ${location}
        ) RETURNING *
    `;

    return event;
  },
);
