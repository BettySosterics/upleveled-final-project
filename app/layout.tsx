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
        <nav>
          <div>
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
                <Link
                  href="/events"
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  Events
                </Link>
                <Link
                  href={`/profile/${user.username}`}
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  Profile
                </Link>
                <div>{user.username} is logged in</div>

                <LogoutButton />
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  Register
                </Link>
                <Link
                  href="/login"
                  style={{ color: 'white', textDecoration: 'none' }}
                >
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
