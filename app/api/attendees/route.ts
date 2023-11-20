// import { cookies } from 'next/headers';
// import { NextRequest, NextResponse } from 'next/server';
// import { z } from 'zod';
// import {
//   createAttendee,
//   getAttendeesWithLimitAndOffset,
// } from '../../../database/attendees';
// import { Attendee } from '../../../migrations/00005-createTableAttendees';

// export type Error = {
//   error: string;
// };

// type AttendeesResponseBodyGet =
//   | {
//       attendees: Attendee[];
//     }
//   | Error;

// type AttendeesResponseBodyPost =
//   | {
//       attendee: Attendee;
//     }
//   | Error;

// const attendeeSchema = z.object({
//   userId: z.number(),
//   eventId: z.number(),
//   isAttending: z.boolean(),
// });

// export async function GET(
//   request: NextRequest,
// ): Promise<NextResponse<AttendeesResponseBodyGet>> {
//   const { searchParams } = new URL(request.url);

//   const limit = Number(searchParams.get('limit'));
//   const offset = Number(searchParams.get('offset'));

//   if (!limit || !offset) {
//     return NextResponse.json(
//       {
//         error: 'Limit and Offset need to be passed as params',
//       },
//       { status: 400 },
//     );
//   }

//   // query the database to get all the animals only if a valid session token is passed
//   const attendees = await getAttendeesWithLimitAndOffset(limit, offset);

//   return NextResponse.json({
//     attendees: attendees,
//   });
// }

// export async function POST(
//   request: NextRequest,
// ): Promise<NextResponse<AttendeesResponseBodyPost>> {
//   const body = await request.json();

//   const result = attendeeSchema.safeParse(body);

//   if (!result.success) {
//     // zod send you details about the error
//     // console.log(result.error);
//     return NextResponse.json(
//       {
//         error: 'The data is incomplete',
//       },
//       { status: 400 },
//     );
//   }

//   // Get the users from the database
//   const attendee = await createAttendee(
//     result.data.eventId,
//     result.data.userId,
//     result.data.isAttending,
//   );

//   if (!attendee) {
//     return NextResponse.json(
//       {
//         error: 'Error creating the new animal',
//       },
//       { status: 500 },
//     );
//   }

//   return NextResponse.json({
//     attendee: attendee,
//   });
// }
