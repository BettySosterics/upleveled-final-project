// 'use client';
import { GoogleMapsEmbed } from '@next/third-parties/google';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect, useRouter } from 'next/navigation';
import { useState } from 'react';
import { getEventById } from '../../../database/events';
import {
  getUserBySessionToken,
  getUserCommentBySessionToken,
  getUserEventBySessionToken,
} from '../../../database/users';
import CreateCommentForm from './CreateCommentForm';

// import { AttendeeResponseBodyPost } from '../../api/attendee/route';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

type Props = {
  params: {
    eventId: string;
    title: string;
    description: string;
    location: string;
  };
};

export async function generateMetadata(props: Props) {
  const singleEvent = await getEventById(Number(props.params.eventId));

  return {
    title: singleEvent ? singleEvent.title : '',
  };
}

export default async function EventPage(props: Props) {
  const sessionTokenCookie = cookies().get('sessionToken');

  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!user) redirect('/login?returnTo=/events');

  // Display the notes for the current logged in user
  const userEvent = await getUserEventBySessionToken(sessionTokenCookie.value);
  const singleEvent = await getEventById(Number(props.params.eventId));
  if (!singleEvent) {
    return notFound();
  }

  // Display the notes for the current logged in user
  const userComment = await getUserCommentBySessionToken(
    sessionTokenCookie.value,
  );

  console.log('Checking: ', userComment);

  return (
    <>
      <div>
        <h1>{singleEvent.title}</h1>
        <p>{singleEvent.description}</p>
      </div>

      <GoogleMapsEmbed
        apiKey={API_KEY}
        height={100}
        width={400}
        mode="place"
        q={singleEvent.location}
      />

      <div>
        {userComment.length > 0 ? (
          <>
            <h2>Comments on the event</h2>
            <ul>
              {userComment.map((comment) => (
                <li key={`${comment.commentId}`}>{comment.textContent}</li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h2>No notes yet</h2>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <CreateCommentForm userId={user.id} eventId={user.id} />
            </div>
          </>
        )}
      </div>

      <Image
        src="/images/cover.jpg"
        alt="background image"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
      />
    </>
  );
}
