import { cache } from 'react';
import { Event } from '../migrations/00002-createTableEvents';
import { sql } from './connect';

export const createEvent = cache(
  async (
    userId: number,
    title: string,
    description: string,
    location: string,
    date: string,
  ) => {
    const [event] = await sql<Event[]>`
      INSERT INTO
        events (
          user_id,
          title,
          description,
          location,
          DATE
        )
      VALUES
        (
          ${userId},
          ${title},
          ${description},
          ${location},
          ${date}
        ) RETURNING *
    `;

    return event;
  },
);
