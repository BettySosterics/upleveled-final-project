'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateCommentForm({
  userId,
  eventId,
  username,
}: {
  userId: number;
  eventId: number;
  username: string;
}) {
  const [textContent, setTextContent] = useState('');
  const [createdBy, setCreatedBy] = useState(username);

  const router = useRouter();

  async function handleCreateComment() {
    await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        eventId,
        username,
        textContent,
      }),
    });
    router.refresh();
    setTextContent('');
    setCreatedBy('');
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await handleCreateComment();
      }}
    >
      <label>
        <input
          value={textContent}
          onChange={(event) => setTextContent(event.currentTarget.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </label>
      <br />
      <br />
      <button className="flex justify-center place-items-center bg-violet-800 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">
        Post
      </button>
    </form>
  );
}
