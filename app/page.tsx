import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import {
  getUserBySessionToken,
  getUserEventBySessionToken,
} from '../database/users';

export const metadata = {
  title: { default: 'Home | Bandify', template: '%s | Bandify' },
  description: 'Bandify app',
};

export default async function Home() {
  const sessionTokenCookie = cookies().get('sessionToken');

  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!user) redirect('/login?returnTo=/dashboard');
  if (user) redirect('/dashboard');
  // Display the notes for the current logged in user
  const userEvent = await getUserEventBySessionToken(sessionTokenCookie.value);
  return (
    <main>
      <header>
        <div className="absolute top-40 text-center left-0 right-0 px-4 py-2 ">
          <div className="text-8xl text-white font-medium drop-shadow-2xl">
            BANDIFY
          </div>
          <div className="text-xl text-white font-medium drop-shadow-2xl">
            Your All-In-One Music Collaboration Platform
          </div>
        </div>
        <Image
          src="/images/cover.jpg"
          alt="background image"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
        />
      </header>
    </main>
  );
}
