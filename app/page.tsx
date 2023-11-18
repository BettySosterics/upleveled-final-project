import Image from 'next/image';

export default function Home() {
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
          BANDIFY
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
          Your All-In-One Music Collaboration Platform
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
