import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createImage } from '../../../database/images';
import { Image } from '../../../migrations/00004-createTableImages';

const imageSchema = z.object({
  secureUrl: z.string(),
  publicId: z.string(),
  title: z.string(),
  descriptionContent: z.string(),
  userId: z.number(),
});

export type ImageResponseBodyPost =
  | {
      image: Image;
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ImageResponseBodyPost>> {
  const body = await request.json();

  const result = imageSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  const newImage = await createImage(
    result.data.secureUrl,
    result.data.publicId,
    result.data.title,
    result.data.descriptionContent,
    result.data.userId,
  );

  if (!newImage) {
    return NextResponse.json(
      { errors: [{ message: 'Error creating the new image' }] },
      { status: 406 },
    );
  }

  return NextResponse.json({
    image: newImage,
  });
}
