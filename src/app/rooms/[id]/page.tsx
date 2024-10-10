"use client";
import { atom, useAtom, useSetAtom } from "jotai";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Swiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
// NOTE 型別
import { SwiperSlide, type SwiperClass } from "swiper/react";
import clsx from "clsx";
import Image from "next/image";
import numbro from "numbro";
import Map from "@/components/pages/Map";
import Link from "next/link";

/** - swiper`atom` */
const swiperAtom = atom<SwiperClass | null>(null);
/** - swiperIndex`atom` */
const swiperIndexAtom = atom(0);

export default function Page() {
  const currentPhotos: string[] = [
    "/detail1.avif",
    "/detail2.avif",
    "/detail3.avif",
  ];

  const amenities = [
    { icon: "wifi", label: "Wi-Fi" },
    { icon: "tv", label: "Television" },
    { icon: "ac_unit", label: "Air Conditioner" },
    { icon: "smoke_free", label: "Smoke Free" },
    { icon: "breakfast_dining", label: "Breakfast" },
    { icon: "local_bar", label: "Mini Bar" },
    { icon: "kitchen", label: "Refrigerator" },
    { icon: "room_service", label: "Room Service" },
    { icon: "pets", label: "Pet-Friendly" },
    { icon: "visibility_off", label: "Great View", disabled: true },
    { icon: "child_care", label: "Child-Friendly", disabled: true },
    { icon: "weekend", label: "Sofa", disabled: true },
  ];

  return (
    <div className="relative">
      <div className=" w-8/12 m-auto">
        <section className=" w-2/3 mt-10">
          <PhotosArea data={currentPhotos} />
          <div className="right-20 top-10 text-right h-full translate-y-64 fixed mt-20 z-50">
            <span className="flex text-right justify-end items-end gap-2">
              <span className="text-black font-bold text-3xl">
                {numbro(1899).format({
                  thousandSeparated: true,
                  prefix: "\u00A0$\u00A0",
                })}
              </span>
              NTD / night
            </span>
            <p>holiday price - $2,000 NTD / night</p>

            <div className="flex flex-col [&>div]:py-6 [&>div]:px-8 bg-white border-2 w-96 ">
              <div className="flex items-center border">
                <span className="material-icons">date_range</span>
                <select className="uppercase select bg-white w-full">
                  <option value="">check-in</option>
                </select>
              </div>
              <div className="flex items-center border">
                <span className="material-icons">date_range</span>
                <select className="uppercase select bg-white w-full">
                  <option value="">check-in</option>
                </select>
              </div>
              <Link href={"/reservation"} className="w-full">
                <button
                  type="button"
                  className="btn w-full bg-blue rounded-none border-none text-white uppercase"
                >
                  reserve now
                </button>
              </Link>
            </div>
          </div>
        </section>

        <section>
          <h3 className=" text-2xl text-black font-bold mt-12 mb-6">
            description
          </h3>

          <div className="mt-12 mb-6">
            <p>1 Guest・1 Bed (Small Double)・1 Private Bath・22 m²</p>

            <p>
              Deluxe Single Room is only reserved for one guest. There is a
              bedroom with a small double size bed and a private bathroom.
              Everything you need prepared for you: sheets and blankets, towels,
              soap and shampoo, hairdryer are provided. In the room there is AC
              and of course WiFi.
            </p>

            <p>
              Check-in is from 3pm to 7pm <br /> Check-out is before 11am
            </p>
          </div>
        </section>

        <section>
          <h3 className=" text-2xl text-black font-bold  mt-12 mb-6">
            Amenities
          </h3>
          <div className="grid grid-cols-3 gap-4 mt-12 mb-6">
            {amenities.map((item, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 ${
                  item.disabled ? "text-gray-400" : ""
                }`}
              >
                <span className="material-icons">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Map />
    </div>
  );
}
function VerticalTitle() {
  return (
    <div className="-left-60 absolute top-7 h-full flex items-center z-50 ">
      <h1 className="transform rotate-90 whitespace-nowrap text-6xl bg-white italic font-light origin-center translate-y-[-50%] text-gray-800">
        Deluxe Single Room
      </h1>
    </div>
  );
}

/** - 圖片區域 */
const PhotosArea = memo(function PhotosArea({ data }: { data: string[] }) {
  const setSwiperAtom = useSetAtom(swiperAtom);
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [swiperIndex, setSwiperIndex] = useAtom(swiperIndexAtom);
  const _onSlideChange = useCallback(
    (swiperCore: SwiperClass) => {
      const { realIndex } = swiperCore;
      setSwiperIndex(realIndex);
    },
    [setSwiperIndex]
  );
  useEffect(() => {
    setSwiperAtom(swiper);
  }, [swiper, setSwiperAtom]);
  return (
    <div className="aspect-square">
      {data.length === 0 ? (
        <div role="status" className="skeleton w-full h-full rounded" />
      ) : (
        <div className="flex flex-1 flex-col">
          <div className="    relative">
            <div id="photos_container" className="aspect-[3/2]">
              <Swiper
                loop
                spaceBetween={10}
                modules={[FreeMode, Thumbs]}
                className="w-full h-full"
                onSwiper={setSwiper}
                onSlideChange={_onSlideChange}
              >
                {data.map(_renderItem)}
              </Swiper>
            </div>
          </div>
          <div>
            <Swiper
              style={
                {
                  "--swiper-navigation-size": "15px",
                } as React.CSSProperties | undefined
              }
              slidesPerView={6}
              freeMode={true}
              watchSlidesProgress={true}
              navigation={true}
              modules={[FreeMode, Navigation, Thumbs]}
            >
              {data.map((item, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={clsx(
                      "flex flex-1 items-center justify-center relative w-[50px] sm:w-[65px] lg:w-[75px] aspect-[1/1] border-[2px] bg-[#cbd5e1]",
                      swiperIndex === index
                        ? "border-[2px] border-[#9c4d0e]"
                        : ""
                    )}
                  >
                    <span className="loading loading-spinner loading-md" />
                    <Image
                      alt={item}
                      src={item}
                      fill
                      sizes="(min-width: 1024px) 70vw, 100vw"
                      className="object-cover"
                      onClick={() => {
                        swiper?.slideTo?.(index);
                        setSwiperIndex(index);
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
});

function _renderItem(item: string, index: number) {
  const key = "carousel" + index;
  return (
    <SwiperSlide key={key}>
      <div className="flex flex-col w-full h-full">
        <div className="flex-1 relative flex justify-center items-center mb-4">
          <span className="loading loading-spinner loading-md" />
          <VerticalTitle />
          <Image
            alt={key}
            src={item}
            fill
            className="object-cover aspect-[4/3]"
          />
        </div>
      </div>
    </SwiperSlide>
  );
}
