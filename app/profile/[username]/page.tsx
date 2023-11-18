import { CldImage } from 'next-cloudinary';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { getUserBySessionToken } from '../../../database/users';
import UploadForm from './UploadForm';

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
    <>
      <div className="profileCard" style={{ position: 'absolute' }}>
        {user ? (
          <>
            <h2>Profile</h2>

            <UploadForm />
            <div>{user.imageUrl}</div>
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

      <Image
        src="/images/cover.jpg"
        alt="background image"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
      />
    </>
  );
}
