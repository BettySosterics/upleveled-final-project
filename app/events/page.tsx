// import { GoogleMapsEmbed } from '@next/third-parties/google';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  getUserBySessionToken,
  getUserEventBySessionToken,
} from '../../database/users';
import CalendarView from '../dashboard/CalendarView';
import CreateEventForm from './CreateEventsForm';
import GetAllEvents from './GetAllEvents';

// import DeleteEventForm from './DeleteEventForm';
// import GetAllEvents from './GetAllEvents';

// const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export const metadata = {
  title: { default: 'Events | Bandify' },
  description: 'Bandify app',
};

export default async function EventsPage() {
  // Task: Restrict access to the notes page and only display notes belonging to the current logged in user
  // 1. Check if the sessionToken cookie exists
  // 2. Query user with the sessionToken
  // 3. If the user exists, render the page
  // 4. If the user does not exist, redirect to the

  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');

  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!user) redirect('/login?returnTo=/events');

  // Display the notes for the current logged in user
  const userEvent = await getUserEventBySessionToken(sessionTokenCookie.value);

  // console.log('Checking: ', userEvent);

  return (
    <div className="grid grid-cols-3 gap-10 m-20">
      <div className="bg-backgroundNavbar/75 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-center text-2xl mb-4 text-textColorNavbar">
          ALL EVENTS
        </h2>
        <GetAllEvents />
      </div>
      <div>
        {userEvent.length > 0 ? (
          <>
            <h2 className="place-self-center w-96 px-6 py-6 text-center text-2xl text-textColorNavbar">
              EVENTS CREATED BY YOU
            </h2>
            <ul>
              {userEvent.map((event) => (
                <li key={`event-${event.eventId}`}>
                  <div className="bg-backgroundNavbar/75 shadow-md rounded px-4 pt-6 pb-8 mb-4 block text-textColorNavbar font-bold ">
                    <Link href={`/events/${event.eventId}`}>
                      <h2 className="text-l">{event.title}</h2>
                      <p>{event.description}</p>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>

            <div>
              <CreateEventForm userId={user.id} />
            </div>
          </>
        ) : (
          <div className="bg-backgroundNavbar/75 shadow-md rounded px-4 pt-6 pb-8 mb-4">
            <h2 className="text-center text-2xl mb-4 text-textColorNavbar">
              CREATE AN EVENT
            </h2>
            <CreateEventForm userId={user.id} />
          </div>
        )}
      </div>
      <div className="bg-backgroundNavbar/75 shadow-md rounded px-4 pt-6 pb-8 mb-4">
        <h2 className="text-center text-2xl mb-4 text-textColorNavbar">
          CALENDAR
        </h2>
        <CalendarView />
      </div>
    </div>
  );
}
