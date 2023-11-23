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
    time: string,
  ) => {
    const [event] = await sql<Event[]>`
      INSERT INTO
        events (
          user_id,
          title,
          description,
          location,
          DATE,
          TIME
        )
      VALUES
        (
          ${userId},
          ${title},
          ${description},
          ${location},
          ${date},
          ${time}
        ) RETURNING *
    `;

    return event;
  },
);

export const getEvents = cache(async () => {
  // return events;
  const events = await sql<Event[]>`
    SELECT
      *
    FROM
      events
  `;
  return events;
});

export const getEventsWithLimitAndOffset = cache(
  async (limit: number, offset: number) => {
    // return events;
    const events = await sql<Event[]>`
      SELECT
        *
      FROM
        events
      LIMIT
        ${limit}
      OFFSET
        ${offset}
    `;
    return events;
  },
);

export const getEventById = cache(async (id: number) => {
  // Postgres always returns an array
  const [event] = await sql<Event[]>`
    SELECT
      *
    FROM
      events
    WHERE
      id = ${id}
  `;
  return event;
});
