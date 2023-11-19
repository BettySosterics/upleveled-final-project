import { Sql } from 'postgres';

export type Image = {
  id: number;
  secureUrl: string;
  publicId: string;
  title: string;
  descriptionContent: string;
  userId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      images (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        secure_url VARCHAR(150) NOT NULL UNIQUE,
        -- provided by cloudinary
        public_id VARCHAR(50),
        -- provided by cloudinary
        title VARCHAR(50),
        description_content VARCHAR(200),
        user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE
      );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE images `;
}
