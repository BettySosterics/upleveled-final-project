'use client';
import { GoogleMapsEmbed } from '@next/third-parties/google';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './page.module.css';

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
          <label>
            Name of the event:
            <input
              value={title}
              onChange={(event) => setTitle(event.currentTarget.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Short description:
            <input
              value={description}
              onChange={(event) => setDescription(event.currentTarget.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Address:
            <input
              onChange={(event) => setLocation(event.currentTarget.value)}
            />
          </label>
        </div>
        <br />
        <br />
        <button className={styles.loginButton}>Create event</button>
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
