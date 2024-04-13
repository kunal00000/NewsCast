import Navbar from './navbar';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from 'src/app/api/auth/[...nextauth]/route';

export default async function Nav() {
  // const session = await getServerSession(authOptions);
  return <Navbar />;
  // return <Navbar session={session} />;
}
