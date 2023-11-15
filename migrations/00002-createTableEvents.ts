import { Sql } from 'postgres';

export type Event = {
  id: number;
  userId: number;
  title: string;
  description: string;
  location: string;
  date: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      events (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        title text NOT NULL,
        description text NOT NULL,
        location text NOT NULL,
        DATE TIME NOT NULL
      );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE events `;
}
