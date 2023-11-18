import { cache } from 'react';
import { sql } from '../database/connect';
import { User } from '../migrations/00000-createTableUsers';

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export type UserEvent = {
  eventId: number;
  title: string;
  description: string;
  location: string;
};

export const createUser = cache(
  async (
    firstName: string,
    lastName: string,
    username: string,
    passwordHash: string,
    email: string,
  ) => {
    const [user] = await sql<User[]>`
      INSERT INTO
        users (
          first_name,
          last_name,
          username,
          password_hash,
          email
        )
      VALUES
        (
          ${firstName},
          ${lastName},
          ${username.toLowerCase()},
          ${passwordHash},
          ${email}
        ) RETURNING id,
        first_name,
        last_name,
        username,
        email
    `;
    return user;
  },
);
export const getUsers = cache(async () => {
  // return users;
  const users = await sql<User[]>`
    SELECT
      *
    FROM
      users
  `;
  return users;
});

export const getUserById = cache(async (id: number) => {
  // Postgres always returns an array
  const [user] = await sql<User[]>`
    SELECT
      *
    FROM
      users
    WHERE
      id = ${id}
  `;
  return user;
});

export const deleteUserById = cache(async (id: number) => {
  const [user] = await sql<User[]>`
    DELETE FROM users
    WHERE
      id = ${id} RETURNING *
  `;

  return user;
});

export const updateUserById = cache(
  async (
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    passwordHash: string,
    email: string,
  ) => {
    const [user] = await sql<User[]>`
      UPDATE users
      SET
        first_name = ${firstName},
        last_name = ${lastName},
        username = ${username},
        password_hash = ${passwordHash},
        email = ${email}
      WHERE
        id = ${id} RETURNING *
    `;
    return user;
  },
);

export const getUsersWithLimitAndOffset = cache(
  async (limit: number, offset: number) => {
    // return users;
    const users = await sql<User[]>`
      SELECT
        *
      FROM
        users
      LIMIT
        ${limit}
      OFFSET
        ${offset}
    `;
    return users;
  },
);

export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<{ id: number; username: string }[]>`
    SELECT
      id,
      username
    FROM
      users
    WHERE
      username = ${username.toLowerCase()}
  `;
  return user;
});

export const getUserWithPasswordHashByUsername = cache(
  async (username: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
      SELECT
        -- id,
        -- username,
        -- first_name AS "firstName",
        -- last_name AS "lastName",
        -- password_hash AS "passwordHash",
        -- email,
        *
      FROM
        users
      WHERE
        username = ${username.toLowerCase()}
    `;
    return user;
  },
);

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<User[]>`
    SELECT
      users.id,
      users.username,
      users.email,
      users.last_name,
      users.first_name
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
