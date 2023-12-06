'use client';
import Image from 'next/image';
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
        <div className="absolute top-40 text-center left-0 right-0 bg-black/50">
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
        </div>

        <Image
          src="/images/appcover.jpg"
          alt="background image"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: '100%' }}
        />
      </header>
    </main>
  );
}
