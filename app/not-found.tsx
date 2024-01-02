'use client';
import Link from 'next/link';

export const metadata = {
  title: { default: 'Page Not Found | Bandify' },
  description: 'Bandify app',
};

export default function RootNotFound() {
  return (
    <main>
      <header>
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
                  <h2 className="mb-4 text-6xl md:text-7xl">WHOOPS!</h2>
                  <h4 className="mb-6 text-l md:text-xl">
                    You hit the wrong chord!
                  </h4>

                  <h5 className="mb-6 text-l md:text-xl">
                    Try going <Link href="/">back</Link> or visit a site that
                    exists
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

/* <div className=" text-neutral-300 absolute top-40 text-center left-0 right-0 px-4 py-4 bg-gray-800 opacity-70">
          <div className="text-8xl font-medium drop-shadow-2xl">WHOOPS!</div>
          <div className="text-2xl font-medium drop-shadow-2xl">
            You hit the wrong chord!
          </div>
          <div className="text-l font-medium drop-shadow-2xl">
            Try going <Link href="/">back</Link> or visit a site that exists
          </div>
        </div> */

/* <Image
        src="/images/cover.jpg"
        alt="background image"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
      /> */
