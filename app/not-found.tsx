import Image from 'next/image';
import Link from 'next/link';

export default function RootNotFound() {
  return (
    <main>
      <header
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            color: '#FCF8FF',
            fontSize: '6rem',
            position: 'absolute',
            top: '160px',
            textShadow: '2px 2px 3px black',
          }}
        >
          WHOOPS!
        </div>
        <div
          style={{
            color: '#FCF8FF',
            fontSize: '2rem',
            position: 'absolute',
            top: '280px',
            textShadow: '2px 2px 3px black',
          }}
        >
          You hit the wrong chord!
        </div>

        <div
          style={{
            color: '#FCF8FF',
            fontSize: '0.9rem',
            position: 'absolute',
            top: '350px',
            textShadow: '2px 2px 3px black',
          }}
        >
          Try going{' '}
          <Link href="/" style={{ textDecoration: 'none', color: '#FCF8FF' }}>
            back
          </Link>{' '}
          or visiting a site that exists
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
