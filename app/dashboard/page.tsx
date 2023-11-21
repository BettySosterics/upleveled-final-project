import { cookies } from 'next/headers';
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
      <div className="grid grid-flow-row md:grid-flow-col gap-40 m-20">
        <div>
          <GetAllEvents />
        </div>
        <div>
          <CalendarView />
        </div>
      </div>
    </div>
  );
}
