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
      className=" bg-backgroundNavbar/75 shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className=" text-textColorNavbar text-m font-medium mb-2 flex justify-center">
        <input
          value={textContent}
          onChange={(event) => setTextContent(event.currentTarget.value)}
          className="shadow appearance-none  rounded w-full py-2 px-3 text-sm bg-backgroundNavbar font-light leading-tight focus:outline-none focus:shadow-outline"
          required
        />
        <button className=" bg-backgroundNavbar border-textColorNavbar text-textColorNavbar font-medium py-2 px-4 border rounded hover:bg-buttonHover">
          Post
        </button>
      </div>
    </form>
  );
}
