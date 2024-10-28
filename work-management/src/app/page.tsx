'use client';

import { useUser } from "@/context/userContext";

import  Router, { useRouter }  from 'next/navigation';
export default function Home() {
  const { user } = useUser();
  // const router = useRouter()
  //   if(!user){
  //       router.refresh();
  //   }
  return (
    <div className="bg-add-task bg-cover bg-center min-h-screen flex flex-col justify-center items-center">
    <br />
    <br />
    {user && (
      <h3 className="flex text-5xl">
        Hello <span className="text-black ml-1">{user.name}</span>
      </h3>
    )}
    <h1 className="text-6xl">Welcome to Work Manager xD</h1>
  </div>

  );
}
