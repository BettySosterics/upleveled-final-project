// import { cache } from 'react';
// import { sql } from '../database/connect';
// import { Image } from '../migrations/00004-createTableImages';

// export const createImage = cache(
//   async (
//     secureUrl: string,
//     publicId: string,
//     title: string,
//     descriptionContent: string,
//     userId: number,
//   ) => {
//     const [image] = await sql<Image[]>`
//       INSERT INTO
//         images (
//           secure_url,
//           public_id,
//           title,
//           description_content,
//           user_id
//         )
//       VALUES
//         (
//           ${secureUrl},
//           ${publicId},
//           ${title},
//           ${descriptionContent},
//           ${userId}
//         ) RETURNING *
//     `;
//     return image;
//   },
// );

// export const getImagesByUserId = cache(async (userId: number) => {
//   const images = await sql<Image[]>`
//     SELECT
//       *
//     FROM
//       images
//     WHERE
//       user_id = ${userId}
//   `;
//   return images;
// });

// // obsolet??
// // export const getSingleVideoByUserId = cache(
// //   // async (id: number, userId: number) => {
// //   async (userId: number) => {
// //     const singleVideos = await sql<Video[]>`
// //       SELECT
// //         *
// //       FROM
// //         videos
// //       WHERE
// //         user_id = ${userId}
// //     `;
// //     return singleVideos;
// //   },
// // );

// export const getSingleImageByUserIdImageId = cache(
//   async (id: number, userId: number) => {
//     const [singleImage] = await sql<Image[]>`
//       SELECT
//         *
//       FROM
//         images
//       WHERE
//         id = ${id}
//         AND user_id = ${userId}
//     `;
//     return singleImage;
//   },
// );

// export const deleteSingleImageByUserIdImageId = cache(
//   async (id: number, userId: number) => {
//     const [singleImage] = await sql<Image[]>`
//       DELETE FROM images
//       WHERE
//         id = ${id}
//         AND user_id = ${userId} RETURNING *
//     `;
//     return singleImage;
//   },
// );
