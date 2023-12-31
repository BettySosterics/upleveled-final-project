import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createUser,
  getUsersWithLimitAndOffset,
} from '../../../database/users';
import { User } from '../../../migrations/00000-createTableUsers';

export type Error = {
  error: string;
};

type UsersResponseBodyGet =
  | {
      users: User[];
    }
  | Error;

type UsersResponseBodyPost =
  | {
      user: User;
    }
  | Error;

const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  passwordHash: z.string(),
  email: z.string(),
});

export async function GET(
  request: NextRequest,
): Promise<NextResponse<UsersResponseBodyGet>> {
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
  const users = await getUsersWithLimitAndOffset(limit, offset);

  return NextResponse.json({
    users: users,
  });
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<UsersResponseBodyPost>> {
  const body = await request.json();

  const result = userSchema.safeParse(body);

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
  const user = await createUser(
    result.data.firstName,
    result.data.lastName,
    result.data.username,
    result.data.passwordHash,
    result.data.email,
  );

  if (!user) {
    return NextResponse.json(
      {
        error: 'Error creating the new animal',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    user: user,
  });
}
