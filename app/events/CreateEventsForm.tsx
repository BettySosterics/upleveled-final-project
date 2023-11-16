'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// type Props = {
//   events: Event[];
// };

export default function CreateEventForm({ userId }: { userId: number }) {
  // const [eventList, setEventList] = useState(events);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const router = useRouter();

  async function handleCreateEvent() {
    await fetch('/api/events', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        title,
        description,
        location,
      }),
    });
    router.refresh();
    setTitle('');
    setDescription('');
    setLocation('');
  }
  // async function handleDeleteEvent(id: number) {
  //   const response = await fetch(`/api/events/${id}`, {
  //     method: 'DELETE',
  //   });
  //   const data = await response.json();
  //   setEventList(eventList.filter((event) => event.id !== data.event.id));
  // }

  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await handleCreateEvent();
        }}
      >
        <label>
          Name of the event:
          <input
            value={title}
            onChange={(event) => setTitle(event.currentTarget.value)}
          />
        </label>
        <label>
          Short description:
          <input
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
          />
        </label>
        <label>
          Address:
          <input
            value={location}
            onChange={(event) => setLocation(event.currentTarget.value)}
          />
        </label>

        <br />
        <br />
        <button>Create event</button>
      </form>
      {/* <>
        {eventList.map((event) => {
          return (
            <button onClick={async () => await handleDeleteEvent(event.id)}>
              Delete
            </button>
          );
        })}
      </> */}
    </>
  );
}
