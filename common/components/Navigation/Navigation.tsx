import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { Path } from "common/enums/path";

type NavLink = {
  label: string;
  href: string;
};

type Props = {
  navLinks: NavLink[];
};


/* __________________MENU_________ */
const Navigation = ({ navLinks }: Props) => {
  const pathname = usePathname();
  const session = useSession();

  console.log(session);

  return (
  <>
  {navLinks.map(link => {
    const isActive = pathname === link.href
    return (
      <Link key={link.label}
      href={link.href}
      className={isActive? 'active' : ''}
      >
        {link.label}
      </Link>
    )
  })} 

  {session?.data && (
    <Link href={Path.PROFILE}>Profile</Link>
  )}
  {session?.data 
  ? <Link href={'#'} onClick={()=>signOut({
    callbackUrl: '/'
  })}>Sign out</Link> 
  : <Link href={'/api/auth/signin'}>SignIn</Link>
  
}
  
  </>
  )
};

export {Navigation}
