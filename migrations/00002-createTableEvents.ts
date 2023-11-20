import { Sql } from 'postgres';

export type Event = {
  id: number;
  userId: number;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      events (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        title VARCHAR(50) NOT NULL,
        description VARCHAR(100) NOT NULL,
        location VARCHAR(50) NOT NULL,
        DATE VARCHAR(30),
        TIME VARCHAR(30)
      );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE events `;
}
