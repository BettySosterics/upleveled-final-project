import { cache } from 'react';
import { Event } from '../migrations/00002-createTableEvents';
import { sql } from './connect';

export const createEvent = cache(
  async (userId: number, textContent: string) => {
    const [event] = await sql<Event[]>`
      INSERT INTO
        events (
          user_id,
          text_content
        )
      VALUES
        (
          ${userId},
          ${textContent}
        ) RETURNING *
    `;

    return event;
  },
);
