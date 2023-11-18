// 'use client';
// import { GoogleMapsEmbed } from '@next/third-parties/google';
// import { useState } from 'react';

// const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

// export default function MapTest() {
//   const [location, setLocation] = useState('');

//   const handleLocationChange = (event) => {
//     setLocation(event.target.value);
//   };

//   return (
//     <div>
//       <label>
//         Enter Location:
//         <input
//           type="text"
//           placeholder="for e.g. Coco Bar,Vienna"
//           onChange={handleLocationChange}
//         />
//       </label>
//       <button>Show Map</button>

//       {location && (
//         <GoogleMapsEmbed
//           apiKey={API_KEY}
//           height={400}
//           width={700}
//           mode="place"
//           q={location}
//         />
//       )}
//     </div>
//   );
// }
