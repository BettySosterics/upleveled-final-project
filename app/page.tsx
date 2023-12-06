import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserBySessionToken } from '../database/users';
import HomePage from './HomePage';

export default async function Home() {
  const sessionTokenCookie = cookies().get('sessionToken');

  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (user) redirect('/dashboard');
  // Display the notes for the current logged in user

  return <HomePage />;
}
