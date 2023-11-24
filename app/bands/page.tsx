import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getUserBySessionToken } from '../../database/users';
import CreateBandForm from './CreateBandsForm';

export const metadata = {
  title: { default: 'Bands | Bandify' },
  description: 'Bandify app',
};

export default async function BandsPage() {
  const sessionTokenCookie = cookies().get('sessionToken');

  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!user) redirect('/login?returnTo=/bands');

  return (
    <div className="grid grid-cols-2 gap-10 m-20">
      <div className="bg-backgroundNavbar/75 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-center text-2xl mb-4 text-textColorNavbar">
          ALL BANDS
        </h2>
        <div className="hover:bg-backgroundNavbar/75 rounded px-8 pt-6 pb-6 text-textColorNavbar">
          <Link href="/bands">
            <div className="text-xl font-medium">Green Day</div>
            <div className="text-sm">created by greendaybillie</div>
          </Link>
        </div>
      </div>
      <div>
        <div className="bg-backgroundNavbar/75 shadow-md rounded px-4 pt-6 pb-8 mb-4 block">
          <h2 className="place-self-center mb-4 text-center text-2xl text-textColorNavbar">
            BANDS CREATED BY YOU
          </h2>
          <ul>
            <li>
              <div className="bg-backgroundNavbar/75 shadow-md rounded px-4 pt-6 pb-8 mb-4 block text-textColorNavbar ">
                <Link href="/bands">
                  <h2 className="text-l font-bold">Fall Out Boy</h2>
                </Link>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <CreateBandForm />
        </div>
      </div>
    </div>
  );
}
