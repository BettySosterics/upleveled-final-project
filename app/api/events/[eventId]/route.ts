import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  deleteEventById,
  getEventById,
  updateEventById,
} from '../../../../database/events';
import { Event } from '../../../../migrations/00002-createTableEvents';
import { Error } from '../route';

type EventResponseBodyGet = { event: Event } | Error;
type EventResponseBodyPut = { event: Event } | Error;
type EventResponseBodyDelete = { event: Event } | Error;

const eventSchema = z.object({
  userId: z.number(),
  title: z.string().min(3),
  description: z.string().min(3),
  location: z.string().min(3),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<EventResponseBodyGet>> {
  console.log(params);
  const eventId = Number(params.eventId);

  if (!eventId) {
    return NextResponse.json(
      {
        error: 'Event id is not valid',
      },
      { status: 400 },
    );
  }

  const event = await getEventById(eventId);

  if (!event) {
    return NextResponse.json(
      {
        error: 'Event Not Found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ event: event });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<EventResponseBodyPut>> {
  const eventId = Number(params.eventId);

  if (!eventId) {
    return NextResponse.json(
      {
        error: 'event id is not valid',
      },
      { status: 400 },
    );
  }

  const body = await request.json();

  // zod please verify the body matches my schema
  const result = eventSchema.safeParse(body);

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
  const event = await updateEventById(
    eventId,
    result.data.title,
    result.data.description,
    result.data.location,
  );

  if (!event) {
    return NextResponse.json(
      {
        error: 'Error updating the event',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    event: event,
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<EventResponseBodyDelete>> {
  const eventId = Number(params.eventId);

  if (!eventId) {
    return NextResponse.json(
      {
        error: 'event id is not valid',
      },
      { status: 400 },
    );
  }

  const event = await deleteEventById(eventId);

  if (!event) {
    return NextResponse.json(
      {
        error: 'Error deleting the event',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    event: event,
  });
}
