import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  getUserBySessionToken,
  getUserEventBySessionToken,
} from '../../database/users';
import CreateEventForm from './CreateEventsForm';
import DeleteEventForm from './DeleteEventForm';
import styles from './page.module.css';

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
      {/* <CreateEventForm userId={user.id} /> */}

      <br />
      <br />
      <br />
      <div>
        {userEvent.length > 0 ? (
          <>
            <h2>Events for you</h2>
            <ul>
              {userEvent.map((event) => (
                <li key={`${event.eventId}`} className={styles.eventCard}>
                  <div>
                    <h2>{event.title}</h2> <p>{event.description}</p> Address:{' '}
                    {event.location}
                  </div>
                </li>
              ))}
            </ul>
            {/* <ul>
              {userEvent.map((event) => (
                <li key={`${event.eventId}`} className={styles.eventCard}>
                  <h2>{event.title}</h2> <p>{event.description}</p> Address:{' '}
                  {event.location} <DeleteEventForm eventId={event.eventId} />
                </li>
              ))}
            </ul> */}
            <div className={styles.createEventCard}>
              <CreateEventForm userId={user.id} />
            </div>
          </>
        ) : (
          <>
            <h2>No events yet</h2>
          </>
        )}
      </div>
    </div>
  );
}
