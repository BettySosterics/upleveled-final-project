import 'server-only';
import { cache } from 'react';
import { sql } from '../database/connect';
import { Attendee } from '../migrations/00005-createTableAttendees';

export const getAttendees = cache(async () => {
  // return attendees;
  const attendees = await sql<Attendee[]>`
    SELECT
      *
    FROM
      attendees
  `;
  return attendees;
});

export const getAttendeesWithLimitAndOffset = cache(
  async (limit: number, offset: number) => {
    // return attendees;
    const attendees = await sql<Attendee[]>`
      SELECT
        *
      FROM
        attendees
      LIMIT
        ${limit}
      OFFSET
        ${offset}
    `;
    return attendees;
  },
);

export const getAttendeeById = cache(async (id: number) => {
  // Postgres always returns an array
  const [attendee] = await sql<Attendee[]>`
    SELECT
      *
    FROM
      attendees
    WHERE
      id = ${id}
  `;
  return attendee;
});

export const deleteAttendeeById = cache(async (id: number) => {
  const [attendee] = await sql<Attendee[]>`
    DELETE FROM attendees
    WHERE
      id = ${id} RETURNING *
  `;

  return attendee;
});

export const createAttendee = cache(
  async (userId: number, eventId: number, isAttending: boolean) => {
    const [attendee] = await sql<Attendee[]>`
      INSERT INTO
        attendees (
          event_id,
          user_id,
          is_attending
        )
      VALUES
        (
          ${eventId},
          ${userId},
          ${isAttending}
        ) RETURNING *
    `;

    return attendee;
  },
);

export const updateAttendeeById = cache(
  async (id: number, userId: number, eventId: number, isAttending: boolean) => {
    const [attendee] = await sql<Attendee[]>`
      UPDATE attendees
      SET
        user_id = ${userId},
        event_id = ${eventId},
        is_attending = ${isAttending}
      WHERE
        id = ${id} RETURNING *
    `;
    return attendee;
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
