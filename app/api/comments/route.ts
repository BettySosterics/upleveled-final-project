// import { cookies } from 'next/headers';
// import { NextRequest, NextResponse } from 'next/server';
// import { z } from 'zod';
// import { createComment } from '../../../database/comments';
// import { getValidSessionByToken } from '../../../database/sessions';

// const commentSchema = z.object({
//   userId: z.number(),
//   eventId: z.number(),
//   username: z.string(),
//   textContent: z.string().min(5),
// });

// export type CreateCommentResponseBodyPost =
//   | {
//       comment: {
//         userId: number;
//         eventId: number;
//         username: string;
//         textContent: string;
//       };
//     }
//   | {
//       errors: { message: string }[];
//     };

// export async function POST(
//   request: NextRequest,
// ): Promise<NextResponse<CreateCommentResponseBodyPost>> {
//   // 1. Get the note data from the request
//   const body = await request.json();

//   // 2. Validate the data
//   const result = commentSchema.safeParse(body);

//   if (!result.success) {
//     return NextResponse.json(
//       { errors: result.error.issues },
//       {
//         status: 400,
//       },
//     );
//   }

//   // 1. get the token from the cookie
//   const sessionTokenCookie = cookies().get('sessionToken');

//   // 2. check if the token has a valid session
//   const session =
//     sessionTokenCookie &&
//     (await getValidSessionByToken(sessionTokenCookie.value));

//   if (!session) {
//     return NextResponse.json(
//       {
//         errors: [{ message: 'Authentication token is invalid' }],
//       },
//       { status: 401 },
//     );
//   }

//   // 3. Create the comment
//   const newComment = await createComment(
//     result.data.userId,
//     result.data.eventId,
//     result.data.username,
//     result.data.textContent,
//   );

//   // 4. If the comment creation fails, return an error

//   if (!newComment) {
//     return NextResponse.json(
//       {
//         errors: [{ message: 'Comment creation failed' }],
//       },
//       { status: 500 },
//     );
//   }

//   // 6. Return the text content of the event
//   return NextResponse.json({
//     comment: {
//       userId: newComment.userId,
//       eventId: newComment.eventId,
//       username: newComment.username,
//       textContent: newComment.textContent,
//     },
//   });
// }
