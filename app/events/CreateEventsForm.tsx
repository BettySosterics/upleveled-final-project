'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateEventForm({ userId }: { userId: number }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const router = useRouter();

  async function handleCreateEvent() {
    await fetch('/api/events', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        title,
        description,
        location,
        createdBy,
        date,
        time,
      }),
    });
    router.refresh();
    setTitle('');
    setDescription('');
    setLocation('');
    setDate('');
    setTime('');
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await handleCreateEvent();
      }}
    >
      <label>
        Title of the event
        <input
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </label>

      <label>
        Description
        <input
          value={description}
          onChange={(event) => setDescription(event.currentTarget.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </label>

      <label>
        Location
        <input
          value={location}
          onChange={(event) => setLocation(event.currentTarget.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </label>
      <label>
        Date
        <input
          value={date}
          onChange={(event) => setDate(event.currentTarget.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </label>
      <label>
        Time
        <input
          value={time}
          onChange={(event) => setTime(event.currentTarget.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </label>
      <br />
      <br />
      <button>Create event</button>
    </form>
  );
}
