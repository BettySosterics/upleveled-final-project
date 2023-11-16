import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createEvent } from '../../../database/events';
import { getValidSessionByToken } from '../../../database/sessions';

const eventSchema = z.object({
  userId: z.number(),
  title: z.string().min(3),
  description: z.string().min(3),
  location: z.string().min(3),
});

export type CreateEventResponseBodyPost =
  | {
      event: {
        title: string;
        description: string;
        location: string;
      };
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateEventResponseBodyPost>> {
  // 1. Get the note data from the request
  const body = await request.json();

  // 2. Validate the data
  const result = eventSchema.safeParse(body);

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

  // 3. Create the event
  const newEvent = await createEvent(
    result.data.userId,
    result.data.title,
    result.data.description,
    result.data.location,
  );

  // 4. If the note creation fails, return an error

  if (!newEvent) {
    return NextResponse.json(
      {
        errors: [{ message: 'Event creation failed' }],
      },
      { status: 500 },
    );
  }

  // 6. Return the text content of the event
  return NextResponse.json({
    event: {
      title: newEvent.title,
      description: newEvent.description,
      location: newEvent.location,
    },
  });
}
