'use client';
import { GoogleMapsEmbed } from '@next/third-parties/google';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export default function CreateEventForm({ userId }: { userId: number }) {
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

  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await handleCreateEvent();
        }}
      >
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name of the event:
            <input
              value={title}
              onChange={(event) => setTitle(event.currentTarget.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Short description:
            <input
              value={description}
              onChange={(event) => setDescription(event.currentTarget.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Address:
            <input
              onChange={(event) => setLocation(event.currentTarget.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <br />
        <br />
        <div className="flex items-center justify-center mt-5">
          <button className=" bg-violet-800 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">
            Create event
          </button>
        </div>
      </form>{' '}
      {location.trim() !== '' && (
        <GoogleMapsEmbed
          apiKey={API_KEY}
          height={100}
          width={200}
          mode="place"
          q={location}
        />
      )}
    </>
  );
}
