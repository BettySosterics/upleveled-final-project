import Image from 'next/image';
import Link from 'next/link';

export default function RootNotFound() {
  return (
    <main>
      <header>
        <div className=" text-neutral-300 absolute top-40 text-center left-0 right-0 px-4 py-4 bg-gray-800 opacity-70">
          <div className="text-8xl font-medium drop-shadow-2xl">WHOOPS!</div>
          <div className="text-2xl font-medium drop-shadow-2xl">
            You hit the wrong chord!
          </div>
          <div className="text-l font-medium drop-shadow-2xl">
            Try going <Link href="/">back</Link> or visit a site that exists
          </div>
        </div>
      </header>
      <Image
        src="/images/cover.jpg"
        alt="background image"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
      />
    </main>
  );
}
