import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getUserBySessionToken } from '../../database/users';
import GetAllEvents from '../events/GetAllEvents';
import CalendarView from './CalendarView';

export const metadata = {
  title: { default: 'Dashboard | Bandify' },
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
  // const userEvent = await getUserEventBySessionToken(sessionTokenCookie.value);

  // console.log('Checking: ', userEvent);

  return (
    <div>
      <div className="grid grid-cols-3 gap-10 m-20">
        <div className="bg-backgroundNavbar/75 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-center text-2xl mb-4 text-textColorNavbar">
            Events of your band
          </h2>
          <GetAllEvents />
        </div>

        <div className="bg-backgroundNavbar/75 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-center text-2xl mb-4 text-textColorNavbar">
            Your bands
          </h2>
          <div className="hover:bg-backgroundNavbar/75 rounded px-8 pt-6 pb-6 text-textColorNavbar">
            <Link href="/bands">
              <div className="text-xl font-medium">Green Day</div>
              <div className="text-sm italic">by greendaybillie</div>
            </Link>
          </div>
        </div>

        <div>
          <CalendarView />
        </div>
      </div>
    </div>
  );
}
