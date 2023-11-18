import { Sql } from 'postgres';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  passwordHash: string;
  imageUrl: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        username VARCHAR(30) NOT NULL UNIQUE,
        password_hash VARCHAR(80) NOT NULL,
        image_url VARCHAR(30)
      );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE users `;
}
