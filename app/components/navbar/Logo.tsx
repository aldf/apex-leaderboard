'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <>
      <Image
        onClick={() => router.push('/')}
        className="hidden md:block cursor-pointer" 
        src="/images/apex-logo.svg" 
        height="100" 
        width="100" 
        alt="Logo" 
      />
      <div className="text-3xl font-extrabold text-amber-500" >
        Leaders Board
      </div>
    </>
   );
}
 
export default Logo;