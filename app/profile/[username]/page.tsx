import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserBySessionToken } from '../../../database/users';
import ProfilePage from './ProfilePage';

type Props = {
  params: {
    user: string | undefined;
  };
};

export default async function UserDashboardPage({ params }: Props) {
  // 1. Checking if the sessionToken cookie exists
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  // 2. Get the current logged in user from the database using the sessionToken value
  const user =
    sessionToken && (await getUserBySessionToken(sessionToken.value));

  if (!sessionToken) {
    return redirect(`/login?returnTo=/login/${params.user}`);
  }
  return (
    <div className="flex items-center justify-center">
      <ProfilePage user={user?.id} />
    </div>
  );
}
