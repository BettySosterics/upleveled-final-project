import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEventById } from '../../../database/events';

export async function generateMetadata({ params }) {
  const singleEvent = await getEventById(Number(params.eventId));

  return {
    title: singleEvent ? singleEvent.title : '',
  };
}

export default async function EventPage(props) {
  const singleEvent = await getEventById(Number(props.params.eventId));
  if (!singleEvent) {
    return notFound();
  }
  return (
    <div>
      <h1>{singleEvent.title}</h1>
      <p>{singleEvent.description}</p>
      <Link href="/events">back to all events</Link>
    </div>
  );
}
