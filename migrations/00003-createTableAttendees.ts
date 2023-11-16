import { Sql } from 'postgres';

export type Attendee = {
  id: number;
  eventId: number;
  userId: number;
  isAttending: boolean;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      attendees (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        event_id INTEGER NOT NULL REFERENCES events (id) ON DELETE CASCADE,
        user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        is_attending BOOLEAN NOT NULL
      );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE attendees `;
}
