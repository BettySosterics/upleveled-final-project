import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  getUserBySessionToken,
  getUserEventBySessionToken,
} from '../../database/users';
import CreateEventForm from './CreateEventsForm';
import DeleteEventForm from './DeleteEventForm';

export const metadata = {
  title: { default: 'Events | Bandify', template: '%s | Bandify' },
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
    <div>
      <CreateEventForm userId={user.id} />

      <br />
      <br />
      <br />
      <div>
        {userEvent.length > 0 ? (
          <>
            <h2>Events created by you</h2>
            <ul style={{ padding: 20, listStyle: 'none', border: 10 }}>
              {userEvent.map((event) => (
                <li key={`${event.eventId}`} style={{ padding: 10 }}>
                  <h2>{event.title}</h2> <p>{event.description}</p> Address:{' '}
                  {event.location} <DeleteEventForm eventId={event.eventId} />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <h2>No events yet</h2>
        )}
      </div>
    </div>
  );
}
