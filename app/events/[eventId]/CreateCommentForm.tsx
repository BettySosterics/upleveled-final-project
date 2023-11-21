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
    // setTextContent('');
    // setCreatedBy('');
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await handleCreateComment();
      }}
      className={'bg-lynch-100'}
    >
      <label>
        <input
          value={textContent}
          onChange={(event) => setTextContent(event.currentTarget.value)}
          className="shadow appearance-none  rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </label>
      <br />
      <br />
      <button className="flex justify-center place-items-center bg-lynch-700 hover:bg-buttonHover text-lynch-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">
        Post
      </button>
    </form>
  );
}
