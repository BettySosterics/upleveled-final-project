import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
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

  if (user) redirect('/dashboard');
  // Display the notes for the current logged in user

  return (
    <main>
      <header>
        <div className="absolute top-40 text-center left-0 right-0 bg-backgroundNavbar/75 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-9xl text-textColorNavbar  font-medium drop-shadow-2xl">
            B A N D I F Y
          </h1>
          <p className="text-3xl text-textColorNavbar   font-medium drop-shadow-2xl">
            Your All-In-One Music Collaboration Platform
          </p>

          <p className="text-2xl text-textColorNavbar   font-light drop-shadow-2xl mt-10">
            Got tired of switching between apps when planning your next gig?
          </p>
          <p className="text-3xl text-textColorNavbar   font-medium drop-shadow-2xl mt-10">
            Then let us show you what we've got!
          </p>
          <Link href="/register">
            <p className="text-3xl text-textColorNavbar font-medium drop-shadow-2xl mt-10  ">
              Register here
            </p>
          </Link>
        </div>

        <Image
          src="/images/appcover.jpg"
          alt="background image"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: '100%' }}
        />
      </header>
    </main>
  );
}
