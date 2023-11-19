import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  deleteAttendeeById,
  getAttendeeById,
  updateAttendeeById,
} from '../../../../database/attendees';
import { Attendee } from '../../../../migrations/00003-createTableAttendees';
import { Error } from '../route';

type AttendeeResponseBodyGet = { attendee: Attendee } | Error;
type AttendeeResponseBodyPut = { attendee: Attendee } | Error;
type AttendeeResponseBodyDelete = { attendee: Attendee } | Error;

const attendeeSchema = z.object({
  userId: z.number(),
  eventId: z.number(),
  isAttending: z.boolean(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<AttendeeResponseBodyGet>> {
  console.log(params);
  const attendeeId = Number(params.attendeeId);

  if (!attendeeId) {
    return NextResponse.json(
      {
        error: 'attendee id is not valid',
      },
      { status: 400 },
    );
  }

  const attendee = await getAttendeeById(attendeeId);

  if (!attendee) {
    return NextResponse.json(
      {
        error: 'attendee Not Found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ attendee: attendee });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<AttendeeResponseBodyPut>> {
  const attendeeId = Number(params.attendeeId);

  if (!attendeeId) {
    return NextResponse.json(
      {
        error: 'attendee id is not valid',
      },
      { status: 400 },
    );
  }

  const body = await request.json();

  // zod please verify the body matches my schema
  const result = attendeeSchema.safeParse(body);

  if (!result.success) {
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'The data is incomplete',
      },
      { status: 400 },
    );
  }

  // query the database to update the animal
  const attendee = await updateAttendeeById(
    attendeeId,
    result.data.eventId,
    result.data.userId,
    result.data.isAttending,
  );

  if (!attendee) {
    return NextResponse.json(
      {
        error: 'Error updating the attendee',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    attendee: attendee,
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<AttendeeResponseBodyDelete>> {
  const attendeeId = Number(params.attendeeId);

  if (!attendeeId) {
    return NextResponse.json(
      {
        error: 'attendee id is not valid',
      },
      { status: 400 },
    );
  }

  const attendee = await deleteAttendeeById(attendeeId);

  if (!attendee) {
    return NextResponse.json(
      {
        error: 'Error deleting the attende',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    attendee: attendee,
  });
}
