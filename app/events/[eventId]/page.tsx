// 'use client';
import { GoogleMapsEmbed } from '@next/third-parties/google';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { getEventById } from '../../../database/events';
import {
  getUserBySessionToken,
  getUserCommentBySessionToken,
} from '../../../database/users';
import CreateCommentForm from './CreateCommentForm';
import GetAllComments from './GetAllComments';

// import CreateCommentForm from './CreateCommentForm';

// import { AttendeeResponseBodyPost } from '../../api/attendee/route';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

type Props = {
  params: {
    eventId: string;
    username: string;
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

  const singleEvent = await getEventById(Number(props.params.eventId));

  // Display the notes for the current logged in user
  const userComment = await getUserCommentBySessionToken(
    sessionTokenCookie.value,
  );

  if (!singleEvent) {
    return notFound();
  }

  console.log('Checking: ', userComment);

  return (
    <>
      <div className=" grid grid-cols-3 gap-40 mx-20">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1>{singleEvent.title}</h1>
          <h4>{singleEvent.description}</h4>
        </div>

        {/* <GoogleMapsEmbed
          apiKey={API_KEY}
          height={100}
          width={400}
          mode="place"
          q={singleEvent.location}
        /> */}

        <div>
          {userComment.length > 0 ? (
            <>
              <div>
                <div>
                  <GetAllComments />
                </div>
                {/* <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  {userComment.map((comment) => (
                    <div key={`${comment.commentId}`}>
                      {comment.textContent} {comment.username}
                    </div>
                  ))}
                </div> */}
              </div>
              <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <CreateCommentForm
                  userId={user.id}
                  eventId={user.id}
                  username={user.username}
                />
              </div>
            </>
          ) : (
            <>
              <h2>No comments yet</h2>
              <p>Create one now!</p>
              <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <CreateCommentForm
                  userId={user.id}
                  eventId={user.id}
                  username={user.username}
                />
              </div>
            </>
          )}
        </div>
      </div>
      {/* <Image
        src="/images/cover.jpg"
        alt="background image"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
      /> */}
    </>
  );
}
