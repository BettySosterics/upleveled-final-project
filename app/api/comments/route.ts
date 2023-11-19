import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createComment,
  getCommentsWithLimitAndOffset,
} from '../../../database/comments';
import { Comment } from '../../../migrations/00005-createTableComments';

export type Error = {
  error: string;
};

type CommentsResponseBodyGet =
  | {
      comments: Comment[];
    }
  | Error;

type CommentsResponseBodyPost =
  | {
      comment: Comment;
    }
  | Error;

const commentSchema = z.object({
  userId: z.number(),
  eventId: z.number(),
  textContent: z.string(),
});

export async function GET(
  request: NextRequest,
): Promise<NextResponse<CommentsResponseBodyGet>> {
  const { searchParams } = new URL(request.url);

  const limit = Number(searchParams.get('limit'));
  const offset = Number(searchParams.get('offset'));

  if (!limit || !offset) {
    return NextResponse.json(
      {
        error: 'Limit and Offset need to be passed as params',
      },
      { status: 400 },
    );
  }

  // query the database to get all the animals only if a valid session token is passed
  const comments = await getCommentsWithLimitAndOffset(limit, offset);

  return NextResponse.json({
    comments: comments,
  });
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CommentsResponseBodyPost>> {
  const body = await request.json();

  const result = commentSchema.safeParse(body);

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

  // Get the users from the database
  const comment = await createComment(
    result.data.userId,
    result.data.eventId,
    result.data.textContent,
  );

  if (!comment) {
    return NextResponse.json(
      {
        error: 'Error creating the new animal',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    comment: comment,
  });
}
