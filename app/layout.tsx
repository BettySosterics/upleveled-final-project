import './globals.css';
import { Rubik } from 'next/font/google';
import Head from 'next/head';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import LogoutButton from '../app/(auth)/logout/LogoutButton';
import { getUserBySessionToken } from '../database/users';

const rubik = Rubik({ subsets: ['latin'] });

export const metadata = {
  title: { default: 'Home page | Bandify' },
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
    <html lang="en" className={rubik.className}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon-apple-touch.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body className="bg-gradient-to-br from-background   via-buttonHover to-lynch-400 ">
        <nav className="fixed top-0 right-0 left-0">
          <div className="flex items-center justify-center max-w-full h-14 gap-40 bg-backgroundNavbar/75 text-textColorNavbar hover:text-hoverTextColorNavbar font-medium">
            <Link href="/">B A N D I F Y</Link>
            {user ? (
              <>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/bands">Bands</Link>
                <Link href="/events">Events</Link>

                <div className="flex items-center justify-center gap-4">
                  <Link href={`/profile/${user.username}`}>
                    <div className="text-lynch-900">
                      <Image
                        className="mx-auto rounded-full "
                        src="/images/avatars/avatar4.svg"
                        alt="author avatar"
                        width={30}
                        height={30}
                      />
                    </div>
                  </Link>

                  <div className="border border-white rounded-full px-5 py-1 hover:bg-buttonHover">
                    <LogoutButton />
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className="border border-white rounded-full px-5 py-1  hover:bg-buttonHover"
                >
                  Register
                </Link>
                <Link
                  href="/login"
                  className="border border-white rounded-full px-5 py-1  hover:bg-buttonHover"
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
