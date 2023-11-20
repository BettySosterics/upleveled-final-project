// 'use client';

// import { useState } from 'react';
// import { Event } from '../../migrations/00002-createTableEvents';

// // type Props = {
// //   events: Event[];
// // };

// export default function DeleteEventForm({ eventId }: { eventId: number }) {
//   // const [eventList, setEventList] = useState('');

//   async function deleteEventById(id: number) {
//     const response = await fetch(`/api/events/${id}`, {
//       method: 'DELETE',
//     });

//     // const data = await response.json();

//     // setEventList(eventList.filter((event) => event.id !== data.event.id));
//   }

//   return (
//     <button
//       onClick={async () => await deleteEventById(eventId)}
//       className=" bg-white hover:bg-white text-violet-800 font-bold py-2 px-4 rounded outline "
//     >
//       Delete
//     </button>
//   );
// }
