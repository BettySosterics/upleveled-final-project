'use client';
import { useState } from 'react';
import { Event } from '../../migrations/00002-createTableEvents';

type Props = {
  events: Event[];
};

export default function EventsForm({ events }: Props) {
  const [eventList, setEventList] = useState(events);
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [locationInput, setLocationInput] = useState('');

  const [onEditId, setOnEditId] = useState(0);
  const [onEditTitleInput, setOnEditTitleInput] = useState('');
  const [onEditDescriptionInput, setOnEditDescriptionInput] = useState('');
  const [onEditLocationInput, setOnEditLocationInput] = useState('');

  async function createEvent() {
    const response = await fetch('/api/events', {
      method: 'POST',
      body: JSON.stringify({
        title: titleInput,
        description: descriptionInput,
        location: locationInput,
      }),
    });

    const data = await response.json();

    setEventList([...eventList, data.event]);
  }

  async function updateEventById(id: number) {
    const response = await fetch(`/api/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: onEditTitleInput,
        description: onEditDescriptionInput,
        location: onEditLocationInput,
      }),
    });

    const data = await response.json();

    setEventList(
      eventList.map((event) => {
        if (event.id === data.event.id) {
          return data.event;
        }
        return event;
      }),
    );
  }

  async function deleteEventById(id: number) {
    const response = await fetch(`/api/events/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    setEventList(eventList.filter((event) => event.id !== data.event.id));
  }

  return (
    <>
      <div>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await createEvent();
          }}
        >
          <label>
            Title
            <input
              value={titleInput}
              onChange={(event) => setTitleInput(event.currentTarget.value)}
            />
          </label>
          <br />
          <label>
            Description
            <input
              value={descriptionInput}
              onChange={(event) =>
                setDescriptionInput(event.currentTarget.value)
              }
            />
          </label>
          <br />
          <label>
            Location
            <input
              value={locationInput}
              onChange={(event) => setLocationInput(event.currentTarget.value)}
            />
          </label>
          <br />
          <button>Create event</button>
        </form>
      </div>
      <br />
      <>
        {eventList.map((event) => {
          return (
            <div key={`event-inputs-${event.id}`}>
              <input
                value={event.id !== onEditId ? event.title : onEditTitleInput}
                onChange={(event) =>
                  setOnEditTitleInput(event.currentTarget.value)
                }
                disabled={event.id !== onEditId}
              />
              <input
                value={
                  event.id !== onEditId
                    ? event.description
                    : onEditDescriptionInput
                }
                onChange={(event) =>
                  setOnEditDescriptionInput(event.currentTarget.value)
                }
                disabled={event.id !== onEditId}
              />
              <input
                value={
                  event.id !== onEditId
                    ? event.location || ''
                    : onEditLocationInput
                }
                onChange={(event) =>
                  setOnEditLocationInput(event.currentTarget.value)
                }
                disabled={event.id !== onEditId}
              />
              {onEditId === event.id ? (
                <button
                  onClick={async () => {
                    await updateEventById(event.id);
                    setOnEditId(0);
                  }}
                >
                  update
                </button>
              ) : (
                <button
                  onClick={() => {
                    setOnEditTitleInput(event.title);
                    setOnEditDescriptionInput(event.description);
                    setOnEditLocationInput(event.location || '');
                    setOnEditId(event.id);
                  }}
                >
                  Edit
                </button>
              )}
              <button onClick={async () => await deleteEventById(event.id)}>
                Delete
              </button>
            </div>
          );
        })}
      </>
    </>
  );
}
