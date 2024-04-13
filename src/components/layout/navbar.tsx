'use client';

import Image from 'next/image';
import Link from 'next/link';
import useScroll from 'src/lib/hooks/use-scroll';
// import { useSignInModal } from './sign-in-modal';
import UserDropdown from './user-dropdown';
import { Session } from 'next-auth';

export default function NavBar({ session }: { session: Session | null }) {
  // const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <>
      {/* <SignInModal /> */}
      <div
        className={`fixed top-0 flex w-full justify-center ${
          scrolled
            ? 'border-b border-gray-200 bg-white/40 backdrop-blur-xl'
            : 'bg-white/0'
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 w-full max-w-screen-xl items-center justify-between text-white">
          <Link href="/" className="flex items-center text-2xl">
            <Image
              src="/logo.webp"
              alt="logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p className="font-oswald">NewsCast</p>
          </Link>
          <div>
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <Link
                className="rounded-full border border-white bg-white p-1.5 px-4 text-sm font-semibold text-black transition-all hover:bg-black hover:text-white"
                // onClick={() => setShowSignInModal(true)}
                href="#join-waitlist"
              >
                Get Access
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
