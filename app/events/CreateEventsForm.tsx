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
    setCreatedBy('');
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await handleCreateEvent();
      }}
      className="bg-backgroundNavbar/75 shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <label className="block text-textColorNavbar text-m font-medium mb-2">
        Title of the event
        <input
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-sm bg-backgroundNavbar font-light leading-tight focus:outline-none focus:shadow-outline"
        />
      </label>

      <label className="block text-textColorNavbar text-m font-medium mb-2">
        Description
        <input
          value={description}
          onChange={(event) => setDescription(event.currentTarget.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-sm bg-backgroundNavbar font-light leading-tight focus:outline-none focus:shadow-outline"
        />
      </label>

      <label className="block text-textColorNavbar text-m font-medium mb-2">
        Location
        <input
          value={location}
          onChange={(event) => setLocation(event.currentTarget.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-sm bg-backgroundNavbar font-light leading-tight focus:outline-none focus:shadow-outline"
        />
      </label>
      <label className="block text-textColorNavbar text-m font-medium mb-2">
        Date
        <input
          value={date}
          onChange={(event) => setDate(event.currentTarget.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-sm bg-backgroundNavbar font-light leading-tight focus:outline-none focus:shadow-outline"
        />
      </label>
      <label className="block text-textColorNavbar text-m font-medium mb-2">
        Time
        <input
          value={time}
          onChange={(event) => setTime(event.currentTarget.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-sm bg-backgroundNavbar font-light leading-tight focus:outline-none focus:shadow-outline"
        />
      </label>
      <br />
      <br />
      <button className="flex justify-center place-items-center bg-backgroundNavbar border-textColorNavbar text-textColorNavbar font-medium py-2 px-4 border rounded hover:bg-buttonHover">
        Create event
      </button>
    </form>
  );
}
