import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createAttendee } from '../../../database/attendees';
import { getValidSessionByToken } from '../../../database/sessions';

const attendeeSchema = z.object({
  eventId: z.number(),
  userId: z.number(),
  isAttending: z.boolean(),
});

export type CreateAttendeeResponseBodyPost =
  | {
      attendee: {
        eventId: string;
        userId: string;
        isAttending: boolean;
      };
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateAttendeeResponseBodyPost>> {
  // 1. Get the attendee data from the request
  const body = await request.json();

  // 2. Validate the data
  const result = attendeeSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  // 1. get the token from the cookie
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. check if the token has a valid session
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  if (!session) {
    return NextResponse.json(
      {
        errors: [{ message: 'Authentication token is invalid' }],
      },
      { status: 401 },
    );
  }

  // 3. Create the attendee
  const newAttendee = await createAttendee(
    result.data.eventId,
    result.data.userId,
    result.data.isAttending,
  );

  // 4. If the note creation fails, return an error

  if (!newAttendee) {
    return NextResponse.json(
      {
        errors: [{ message: 'Attendee creation failed' }],
      },
      { status: 500 },
    );
  }

  // 6. Return the text content of the event
  return NextResponse.json({
    attendee: {
      eventId: newAttendee.eventId,
      userId: newAttendee.userId,
      isAttending: newAttendee.isAttending,
    },
  });
}
