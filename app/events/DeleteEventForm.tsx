'use client';

import { useRouter } from 'next/navigation';

export default function DeleteEventForm({ eventId }: { eventId: number }) {
  const router = useRouter();

  async function handleDeleteEvent() {
    await fetch(`/api/events/`, {
      method: 'DELETE',
    });
    router.refresh();
  }
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await handleDeleteEvent();
      }}
    >
      <button>Delete event</button>
    </form>
  );
}
