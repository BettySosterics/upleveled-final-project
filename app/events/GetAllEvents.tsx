import Link from 'next/link';
import { getEvents } from '../../database/events';

export const metadata = {
  title: 'Events',
};

export default async function GetAllEvents() {
  const events = await getEvents();

  return (
    <div>
      {events.map((event) => {
        return (
          <div
            key={`event-${event.id}`}
            className="bg-backgroundNavbar/75 shadow-lg rounded px-8 pt-6 pb-8 mb-4 text-textColorNavbar font-medium "
          >
            <Link href={`/events/${event.id}`}>
              <div className="text-xl">
                {event.title} {event.description}
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
