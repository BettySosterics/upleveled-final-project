import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';
import { getUserBySessionToken } from '../../../database/users';

type Props = {
  params: {
    user: string;
  };
};

export default async function ProfilePage({ params }: Props) {
  // 1. Checking if the sessionToken cookie exists
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  // 2. Get the current logged in user from the database using the sessionToken value
  const user =
    sessionToken && (await getUserBySessionToken(sessionToken.value));

  // added 14.11.23
  if (!sessionToken) {
    return redirect(`/login?returnTo=/login/${params.user}`);
  }
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="absolute top-20 ">
          <div className="place-self-center w-96 px-6 py-6 text-center bg-violet-900 rounded-lg lg:mt-0 xl:px-10 border-2">
            <div className="space-y-4 xl:space-y-6">
              <Image
                className="mx-auto rounded-full h-40 w-40 border-2"
                src="/images/cover.jpg"
                alt="author avatar"
                width={200}
                height={200}
              />
              <div className="space-y-2">
                <div className="flex justify-center items-center flex-col space-y-3 text-lg font-medium leading-6">
                  <h3 className="text-2xl text-violet-100">
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <p className="text-violet-100 font-light">{user?.username}</p>
                  <p className="text-violet-100 font-light">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
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
    </>
  );
}
