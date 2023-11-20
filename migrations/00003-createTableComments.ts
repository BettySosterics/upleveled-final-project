import { Sql } from 'postgres';

export type Comment = {
  id: number;
  userId: number;
  eventId: number;
  username: string;
  textContent: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      comments (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        event_id INTEGER NOT NULL REFERENCES events (id) ON DELETE CASCADE,
        username VARCHAR(30) NOT NULL REFERENCES users (
          username
        ) ON DELETE CASCADE,
        text_content text NOT NULL
      );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE comments `;
}
