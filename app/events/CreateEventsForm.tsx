'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateEventForm({ userId }: { userId: number }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const router = useRouter();

  async function handleCreateEvent() {
    await fetch('/api/events', {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        location,
        date,
      }),
    });
    router.refresh();
    setTitle('');
    setDescription('');
    setLocation('');
    setDate('');
  }

  return (
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
      <label>
        Date:
        <input
          value={date}
          onChange={(event) => setDate(event.currentTarget.value)}
        />
      </label>
      <br />
      <br />
      <button>Create event</button>
    </form>
  );
}
