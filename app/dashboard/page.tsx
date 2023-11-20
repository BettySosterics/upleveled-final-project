import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  getUserBySessionToken,
  getUserEventBySessionToken,
} from '../../database/users';
import Calendar from './Calendar';
import CalendarView from './Calendar';
import DoubleButton from './Calendar';
import GoogleCalendar from './Calendar';
import styles from './page.module.css';

export const metadata = {
  title: { default: 'Events | Bandify', template: '%s | Bandify' },
  description: 'Bandify app',
};

export default async function DashboardPage() {
  // Task: Restrict access to the notes page and only display notes belonging to the current logged in user
  // 1. Check if the sessionToken cookie exists
  // 2. Query user with the sessionToken
  // 3. If the user exists, render the page
  // 4. If the user does not exist, redirect to the

  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');

  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!user) redirect('/login?returnTo=/dashboard');

  // Display the notes for the current logged in user
  const userEvent = await getUserEventBySessionToken(sessionTokenCookie.value);

  // console.log('Checking: ', userEvent);

  return (
    <>
      <div className="flex items-center ">
        <div>
          <>
            <h2 className="place-self-center w-96 px-6 py-6 text-center bg-violet-900 rounded-lg lg:mt-0 xl:px-10 border-2 text-2xl text-violet-100">
              pentatonix
            </h2>
            <h2 className="place-self-center w-96 px-6 py-6 text-center bg-violet-900 rounded-lg lg:mt-0 xl:px-10 border-2 text-2xl text-violet-100">
              green day
            </h2>
            <h2 className="place-self-center w-96 px-6 py-6 text-center bg-violet-900 rounded-lg lg:mt-0 xl:px-10 border-2 text-2xl text-violet-100">
              tokio hotel
            </h2>
            <h2 className="place-self-center w-96 px-6 py-6 text-center bg-violet-900 rounded-lg lg:mt-0 xl:px-10 border-2 text-2xl text-violet-100">
              fall out boy
            </h2>
            <h2 className="place-self-center w-96 px-6 py-6 text-center bg-violet-900 rounded-lg lg:mt-0 xl:px-10 border-2 text-2xl text-violet-100">
              insalata mestiza
            </h2>
            <h2 className="place-self-center w-96 px-6 py-6 text-center bg-violet-900 rounded-lg lg:mt-0 xl:px-10 border-2 text-2xl text-violet-100">
              tokio hotel
            </h2>
          </>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="absolute top-60 right-100 gap-40">
          <>
            <div>
              <CalendarView />
            </div>
          </>
        </div>
      </div>

      {/* <Image
        src="/images/cover.jpg"
        alt="background image"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
      /> */}
    </>
  );
}
