import { Sql } from 'postgres';

export type User = {
  id: number;
  username: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
first_name text NOT NULL,
last_name text NOT NULL,
email_address text NOT NULL,
username varchar(30) NOT NULL,
password_hash varchar(30) NOT NULL
);
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE users `;
}
