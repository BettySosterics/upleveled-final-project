import { Sql } from 'postgres';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  passwordHash: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
email varchar(50) NOT NULL UNIQUE,
username varchar(30) NOT NULL UNIQUE,
password_hash varchar(80) NOT NULL
);
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE users `;
}
