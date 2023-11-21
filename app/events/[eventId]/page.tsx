import {
  CalendarDaysIcon,
  CalendarIcon,
  MapPinIcon,
} from '@heroicons/react/24/solid';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { getEventById } from '../../../database/events';
import {
  getUserBySessionToken,
  getUserCommentBySessionToken,
} from '../../../database/users';
import CreateCommentForm from './CreateCommentForm';
import GetAllComments from './GetAllComments';
import GetAllUsers from './GetAllUsers';

// import CreateCommentForm from './CreateCommentForm';

// import { AttendeeResponseBodyPost } from '../../api/attendee/route';

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
    <div className="grid grid-rows-4 gap-10 m-20">
      <div className="relative bg-backgroundNavbar/75 text-textColorNavbar shadow-md rounded px-8 pt-6 pb-8 ">
        <h1 className="text-3xl flex justify-center mb-4">
          {singleEvent.title.toUpperCase()}
        </h1>
        <h2 className="text-xl flex justify-center mb-2">DETAILS</h2>
        <GetAllUsers />
        <p>
          {'  '}
          {singleEvent.description}
        </p>
        <div className="absolute bottom-3 left-5 bg-backgroundNavbar py-1 px-3 rounded-lg">
          {singleEvent.location}
        </div>
      </div>
      <div>
        {userComment.length > 0 ? (
          <>
            <div>
              <div className="bg-backgroundNavbar/75 shadow-md rounded px-8 pt-6 pb-8 mb-4  block ">
                <h2 className="text-xl text-textColorNavbar flex justify-center mb-2">
                  COMMENTS
                </h2>
                <GetAllComments />
              </div>
            </div>
            <div>
              <CreateCommentForm
                userId={user.id}
                eventId={user.id}
                username={user.username}
              />
            </div>
          </>
        ) : (
          <>
            <div className="bg-backgroundNavbar/75 shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h2 className="text-xl text-textColorNavbar flex justify-center">
                COMMENTS
              </h2>
              <h2 className="text-m text-textColorNavbar flex justify-center">
                No comments yet. Create one now!
              </h2>
            </div>
            <div>
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
  );
}
