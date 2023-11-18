import { GoogleMapsEmbed } from '@next/third-parties/google';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getEventById } from '../../../database/events';
import {
  getUserBySessionToken,
  getUserEventBySessionToken,
} from '../../../database/users';
import CreateEventForm from './CreateEventsForm';
import styles from './page.module.css';

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
  return (
    <>
      <div style={{ position: 'absolute' }}>
        <h1
          style={{
            color: '#FCF8FF',
            fontSize: '2rem',
            textShadow: '2px 2px 3px black',
          }}
        >
          {singleEvent.title}
        </h1>
        <p
          style={{
            color: '#FCF8FF',
            fontSize: '0.9rem',
            textShadow: '2px 2px 3px black',
          }}
        >
          {singleEvent.description}
        </p>

        <GoogleMapsEmbed
          apiKey={API_KEY}
          height={100}
          width={400}
          mode="place"
          q={singleEvent.location}
        />
        <Link href="/events">back to all events</Link>
      </div>
      <div style={{ position: 'absolute', bottom: '200px' }}></div>
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
