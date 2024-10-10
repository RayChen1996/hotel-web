"use client";
import Image from "next/image";
import bg from "../../public/photo.jpg";
import Block1 from "@/components/pages/Block1";
import Recommand from "@/components/pages/Recommand";
import Banner from "@/components/pages/Banner";
import Rooms from "@/components/pages/Rooms";
import Map from "@/components/pages/Map";
import { enterHome } from "@/jotai/Layout";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
export default function Home() {
  const [home, setHome] = useAtom(enterHome);
  const pathname = usePathname();

  useEffect(() => {
    setHome(true);
    return () => {
      console.log("exit");
      setHome(false);
    };
  }, [pathname]);
  return (
    <div className="flex flex-col">
      <main className="min-h-dvh flex-1">
        <figure className="w-full relative bg-black">
          <Image
            src={bg}
            alt="Background Image"
            fill
            className="object-cover"
          />

          <Block1 />
          <Recommand />
          <Banner />
          <Rooms />
          <Map />
        </figure>
      </main>
    </div>
  );
}
