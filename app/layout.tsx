import './globals.css';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import LogoutButton from '../app/(auth)/logout/LogoutButton';
import { getUserBySessionToken } from '../database/users';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: { default: 'Home page | Bandify', template: '%s | Bandify' },
  description: 'Bandify app',
};

type Props = {
  children: ReactNode;
};

export default async function RootLayout(props: Props) {
  // Task: Display the logged in user's username in the navigation bar and hide the login and register links depending on whether the user is logged in or not
  // 1. Checking if the sessionToken cookie exists
  // 2. Get the current logged in user from the database using the sessionToken value
  // 3. Make decision whether to show the login and register links or not

  // 1. Checking if the sessionToken cookie exists
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user =
    sessionToken && (await getUserBySessionToken(sessionToken.value));

  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="sticky top-0">
          <div className="flex items-center justify-center max-w-full h-14 gap-40 bg-violet-900 text-neutral-300 font-medium">
            <Link href="/">
              <Image
                src="/images/logo-transparent.png"
                alt="bandify logo"
                width={200}
                height={100}
              />
            </Link>
            {user ? (
              <>
                <Link href="/dashboard" className="hover:text-white">
                  Dashboard
                </Link>
                <Link href="/bands" className="hover:text-white">
                  My bands
                </Link>
                <Link href="/events" className="hover:text-white">
                  My events
                </Link>

                <div className="flex items-center justify-center gap-4">
                  <Link
                    href={`/profile/${user.username}`}
                    className="hover:text-white"
                  >
                    <div>{user.username}</div>
                  </Link>

                  <div className="border border-white rounded-full px-5 py-1  hover:bg-violet-700 ">
                    <LogoutButton />
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link href="/register" className="hover:text-white">
                  Register
                </Link>
                <Link href="/login" className="hover:text-white">
                  Login
                </Link>
              </>
            )}
          </div>
        </nav>

        {props.children}
      </body>
    </html>
  );
}
