import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  deleteCommentById,
  getCommentById,
  updateCommentById,
} from '../../../../database/comments';
import { Comment } from '../../../../migrations/00003-createTableComments';
import { Error } from '../route';

type CommentResponseBodyGet = { comment: Comment } | Error;
type CommentResponseBodyPut = { comment: Comment } | Error;
type CommentResponseBodyDelete = { comment: Comment } | Error;

const commentSchema = z.object({
  userId: z.number(),
  eventId: z.number(),
  username: z.string(),
  textContent: z.string(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<CommentResponseBodyGet>> {
  console.log(params);
  const commentId = Number(params.commentId);

  if (!commentId) {
    return NextResponse.json(
      {
        error: 'Animal id is not valid',
      },
      { status: 400 },
    );
  }

  const comment = await getCommentById(commentId);

  if (!comment) {
    return NextResponse.json(
      {
        error: 'Comment Not Found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ comment: comment });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<CommentResponseBodyPut>> {
  const commentId = Number(params.commentId);

  if (!commentId) {
    return NextResponse.json(
      {
        error: 'Comment id is not valid',
      },
      { status: 400 },
    );
  }

  const body = await request.json();

  // zod please verify the body matches my schema
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

  // query the database to update the animal
  const comment = await updateCommentById(
    commentId,
    result.data.eventId,
    result.data.userId,
    result.data.username,
    result.data.textContent,
  );

  if (!comment) {
    return NextResponse.json(
      {
        error: 'Error updating the comment',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    comment: comment,
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<CommentResponseBodyDelete>> {
  const commentId = Number(params.commentId);

  if (!commentId) {
    return NextResponse.json(
      {
        error: 'Comment id is not valid',
      },
      { status: 400 },
    );
  }

  const comment = await deleteCommentById(commentId);

  if (!comment) {
    return NextResponse.json(
      {
        error: 'Error deleting the comment',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    comment: comment,
  });
}
