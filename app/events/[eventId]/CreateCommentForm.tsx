'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateCommentForm({
  userId,
  eventId,
}: {
  userId: number;
  eventId: number;
}) {
  const [textContent, setTextContent] = useState('');

  const router = useRouter();

  async function handleCreateComment() {
    await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        eventId,
        textContent,
      }),
    });
    router.refresh();
    setTextContent('');
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await handleCreateComment();
      }}
    >
      <label>
        Add Note:
        <input
          value={textContent}
          onChange={(event) => setTextContent(event.currentTarget.value)}
        />
      </label>
      <br />
      <br />
      <button>Post</button>
    </form>
  );
}
