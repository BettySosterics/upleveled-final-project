import Image from 'next/image';

export default function Home() {
  return (
    <main>
      <div
        style={{
          color: '#845ec2',
          fontSize: 42,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        BANDIFY
      </div>
      <div
        style={{
          color: '#845ec2',
          fontSize: 30,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        Your All-In-One Music Collaboration Platform
      </div>
      <Image
        src="/images/cover.jpg"
        alt="background image"
        width={1350}
        height={750}
      />
    </main>
  );
}
