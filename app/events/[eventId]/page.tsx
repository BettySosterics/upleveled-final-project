import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEventById } from '../../../database/events';

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
        <Link href="/events">back to all events</Link>
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
