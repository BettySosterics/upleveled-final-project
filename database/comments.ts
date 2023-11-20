import 'server-only';
import { cache } from 'react';
import { sql } from '../database/connect';
import { Comment } from '../migrations/00003-createTableComments';

export const getComments = cache(async () => {
  // return comments;
  const comments = await sql<Comment[]>`
    SELECT
      *
    FROM
      comments
  `;
  return comments;
});

export const getCommentsWithLimitAndOffset = cache(
  async (limit: number, offset: number) => {
    // return comments;
    const comments = await sql<Comment[]>`
      SELECT
        *
      FROM
        comments
      LIMIT
        ${limit}
      OFFSET
        ${offset}
    `;
    return comments;
  },
);

export const getCommentById = cache(async (id: number) => {
  // Postgres always returns an array
  const [comment] = await sql<Comment[]>`
    SELECT
      *
    FROM
      comments
    WHERE
      id = ${id}
  `;
  return comment;
});

export const getCommentByUsername = cache(async (username: string) => {
  const [comment] = await sql<{ id: number; username: string }[]>`
    SELECT
      id,
      username
    FROM
      comments
    WHERE
      username = ${username.toLowerCase()}
  `;
  return comment;
});

export const deleteCommentById = cache(async (id: number) => {
  const [comment] = await sql<Comment[]>`
    DELETE FROM comments
    WHERE
      id = ${id} RETURNING *
  `;

  return comment;
});

export const createComment = cache(
  async (
    userId: number,
    eventId: number,
    username: string,
    textContent: string,
  ) => {
    const [comment] = await sql<Comment[]>`
      INSERT INTO
        comments (
          user_id,
          event_id,
          username,
          text_content
        )
      VALUES
        (
          ${userId},
          ${eventId},
          ${username},
          ${textContent}
        ) RETURNING *
    `;

    return comment;
  },
);

export const updateCommentById = cache(
  async (
    id: number,
    userId: number,
    eventId: number,
    username: string,
    textContent: string,
  ) => {
    const [comment] = await sql<Comment[]>`
      UPDATE comments
      SET
        user_id = ${userId},
        event_id = ${eventId},
        username = ${username},
        text_content = ${textContent}
      WHERE
        id = ${id} RETURNING *
    `;
    return comment;
  },
);

// export function getAnimal(id: number) {
//   return animals1.find((animal) => animal.id === id);
// }

// animalId: number;
// animalFirstName: string;
// animalType: string;
// animalAccessory: string | null;
// animalFoodId: number;
// animalFoodName: string;
// animalFoodType: string;

// Join query for getting animal with related food/foods
// export const getAttendeesWithFoods = cache(async (id: number) => {
//   const animalsFoods = await sql<AnimalFood[]>`
//     SELECT
//       animals.id AS animal_id,
//       animals.first_name AS animal_first_name,
//       animals.type AS animal_type,
//       animals.accessory AS animal_accessory,
//       foods.id AS animal_food_id,
//       foods.name AS animal_food_name,
//       foods.type AS animal_food_type
//     FROM
//       animals
//       INNER JOIN animal_foods ON animals.id = animal_foods.animal_id
//       INNER JOIN foods ON foods.id = animal_foods.food_id
//     WHERE
//       animals.id = ${id}
//   `;
//   return animalsFoods;
// });

// // Join query for getting a single animal with related food/foods using Json_aag
// export const getAnimalWithFoodsById = cache(async (id: number) => {
//   const [animal] = await sql<AnimalWithFoodsInJsonAgg[]>`
//     SELECT
//       animals.id AS animal_id,
//       animals.first_name AS animal_first_name,
//       animals.type AS animal_type,
//       animals.accessory AS animal_accessory,
//       (
//         SELECT
//           json_agg (
//             foods.*
//           )
//         FROM
//           animal_foods
//           INNER JOIN foods ON animal_foods.food_id = foods.id
//         WHERE
//           animal_foods.animal_id = animals.id
//       ) AS animal_foods
//     FROM
//       animals
//     WHERE
//       animals.id = ${id}
//     GROUP BY
//       animals.first_name,
//       animals.type,
//       animals.accessory,
//       animals.id;
//   `;

//   return animal;
// });
