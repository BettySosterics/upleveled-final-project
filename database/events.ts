import { cache } from 'react';
import { User } from '../migrations/00000-createTableUsers';
import { Event } from '../migrations/00002-createTableEvents';
import { sql } from './connect';

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

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

export const deleteEventById = cache(async (id: number) => {
  const [event] = await sql<Event[]>`
    DELETE FROM event
    WHERE
      id = ${id} RETURNING *
  `;

  return event;
});

export const updateEventById = cache(
  async (id: number, title: string, description: string, location: string) => {
    const [event] = await sql<Event[]>`
      UPDATE events
      SET
        title,
        description,
        location
      WHERE
        id = ${id} RETURNING *
    `;
    return event;
  },
);

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

export const getEventByUsername = cache(async (username: string) => {
  const [event] = await sql<{ id: number; username: string }[]>`
    SELECT
      id,
      username
    FROM
      users
    WHERE
      username = ${username.toLowerCase()}
  `;
  return event;
});

// export const getEventWithPasswordHashByUsername = cache(
//   async (username: string) => {
//     const [user] = await sql<UserWithPasswordHash[]>`
//       SELECT
//         -- id,
//         -- username,
//         -- first_name AS "firstName",
//         -- last_name AS "lastName",
//         -- password_hash AS "passwordHash",
//         -- email,
//         *
//       FROM
//         users
//       WHERE
//         username = ${username.toLowerCase()}
//     `;
//     return user;
//   },
// );

export const getEventBySessionToken = cache(async (token: string) => {
  const [user] = await sql<User[]>`
    SELECT
      users.id,
      users.username
    FROM
      users
      INNER JOIN sessions ON (
        sessions.token = ${token}
        AND sessions.user_id = users.id
        AND sessions.expiry_timestamp > now ()
      )
  `;
  return user;
});

export const getUserEventBySessionToken = cache(async (token: string) => {
  const events = await sql<UserEvent[]>`
    SELECT
      events.id AS event_id,
      events.title AS title,
      events.description AS description,
      events.location AS location
    FROM
      events
      INNER JOIN users ON events.user_id = users.id
      INNER JOIN sessions ON (
        sessions.token = ${token}
        AND sessions.user_id = users.id
        AND sessions.expiry_timestamp > now ()
      )
  `;
  return events;
});
