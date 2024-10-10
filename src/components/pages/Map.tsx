import React from "react";
import Img from "@/../public/map.png";
import Image from "next/image";

export default function Map() {
  return (
    <div className="relative min-h-96">
      <Image src={Img} fill alt="" className="object-cover aspect-[4/3]" />
    </div>
  );
}
