'use client';
import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: { default: 'Home | Bandify' },
  description: 'Bandify app',
};

export default function HomePage() {
  return (
    <main>
      <header>
        {/* <div className="top-40 text-center left-0 right-0">
          <div className="object-fit">
            {' '}
            <img src="/images/appcover.jpg" alt="background" />
          </div>

          <h1 className="text-9xl text-textColorNavbar font-medium drop-shadow-xl mt-5">
            B A N D I F Y
          </h1>
          <p className="text-3xl text-textColorNavbar font-medium drop-shadow-xl">
            Your All-In-One Music Collaboration Platform
          </p>

          <p className="text-2xl text-textColorNavbar font-light drop-shadow-xl mt-10">
            Got tired of switching between apps when planning your next gig?
          </p>
          <p className="text-3xl text-textColorNavbar font-medium drop-shadow-xl mt-10">
            Then let us show you what we've got!
          </p>

          <p className="text-3xl text-textColorNavbar font-medium drop-shadow-xl mt-10 mb-5 ">
            <Link href="/register">Register here</Link>
          </p>
        </div> */}
        <div>
          <div
            className="relative overflow-hidden bg-cover md:bg-cover bg-no-repeat p-12 text-center "
            style={{
              backgroundImage: `url("https://res.cloudinary.com/dc2znemzw/image/upload/v1702314748/gido5idgqxauudjwn5zp.jpg")`,
              height: `100vh`,
            }}
          >
            <div className="absolute bottom-5 left-0 right-0 top-0 h-screen md:h-full w-full overflow-hidden bg-fixed">
              <div className="flex h-screen md:h-full items-center justify-center">
                <div className="text-textColorNavbar font-medium drop-shadow-xl">
                  <h2 className="mb-4 text-6xl md:text-7xl">B A N D I F Y</h2>
                  <h4 className="mb-6 text-l md:text-xl">
                    Your All-In-One Music Collaboration Platform
                  </h4>
                  <h5 className="mb-6 text-l md:text-xl">
                    Got tired of switching between apps when planning your next
                    gig?
                  </h5>
                  <h5 className="mb-6 text-l md:text-xl">
                    Then let us show you what we've got!
                  </h5>

                  <Link href="/register">
                    <span className="bg-backgroundNavbar/75 hover:bg-buttonHover/75 rounded border-2 px-5 pb-[8px] pt-[10px] text-sm font-medium uppercase leading-normal drop-shadow-xl m-5">
                      Register here
                    </span>
                  </Link>

                  <Link href="/login">
                    <span className="bg-backgroundNavbar/75 hover:bg-buttonHover/75 rounded border-2 px-5 pb-[8px] pt-[10px] text-sm font-medium uppercase leading-normal drop-shadow-xl m-5">
                      Login
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </main>
  );
}
