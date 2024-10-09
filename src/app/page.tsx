import Image from "next/image";
import bg from "../../public/photo.jpg";
import AppHeader from "@/components/Layout/AppHeader";
import AppFooter from "@/components/Layout/AppFooter";
export default function Home() {
  return (
    <div className=" flex flex-col ">
      <main className=" min-h-dvh flex-1"></main>
      <figure className=" w-full   relative bg-black">
        <Image src={bg} alt="Background Image" fill className="object-cover " />
      </figure>
    </div>
  );
}
