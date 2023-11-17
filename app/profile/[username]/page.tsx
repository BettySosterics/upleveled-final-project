import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { getUserBySessionToken } from '../../../database/users';

export const metadata = {
  title: { default: 'Profile | Bandify', template: '%s | Bandify' },
  description: 'Bandify app',
};

type Props = {
  params: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  children: ReactNode;
};

export default async function UserProfilePage({ params }: Props) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user =
    sessionToken && (await getUserBySessionToken(sessionToken.value));
  if (!user) redirect('/login?returnTo=/events');

  return (
    <div className="profileCard">
      {user ? (
        <>
          <h2>Profile</h2>
          <div>{user.username}</div>
          <div>{user.email} </div>
          <div>{user.firstName} </div>
          <div>{user.lastName} </div>
        </>
      ) : (
        <>
          <h1>please log in</h1>
        </>
      )}
    </div>
  );
}
