import Link from 'next/link';
import { getEvents } from '../../database/events';

export default async function GetAllEvents() {
  const events = await getEvents();

  return (
    <div>
      {events.map((event) => {
        return (
          <div
            key={`event-${event.id}`}
            className="hover:bg-backgroundNavbar/75 rounded px-8 pt-6 pb-6 text-textColorNavbar font-medium "
          >
            <Link href={`/events/${event.id}`}>
              <div className="text-l">{event.title}</div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
