import { GoogleMapsEmbed } from '@next/third-parties/google';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  getUserBySessionToken,
  getUserEventBySessionToken,
} from '../../database/users';
import CreateEventForm from './CreateEventsForm';
import styles from './page.module.css';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

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
    <>
      <div
        style={{
          position: 'absolute',
        }}
      >
        <br />
        <br />
        <br />
        <div>
          {userEvent.length > 0 ? (
            <>
              <h2
                style={{
                  color: '#FCF8FF',
                  fontSize: '2rem',
                  textShadow: '2px 2px 3px black',
                }}
              >
                Events for you
              </h2>
              <ul>
                {userEvent.map((event) => (
                  <li key={`${event.eventId}`} className={styles.eventCard}>
                    <Link
                      href={`/events/${event.eventId}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div style={{ color: '#845EC2' }}>
                        <h2>{event.title}</h2> <p>{event.description}</p>
                        {event.location}{' '}
                        <GoogleMapsEmbed
                          apiKey={API_KEY}
                          height={100}
                          width={400}
                          mode="place"
                          q={event.location}
                        />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className={styles.createEventCard}>
                <CreateEventForm userId={user.id} />
              </div>
            </>
          ) : (
            <>
              <h2>No events yet</h2>
              <div className={styles.createEventCard}>
                <CreateEventForm userId={user.id} />
              </div>
            </>
          )}
        </div>
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
