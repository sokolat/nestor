import React, { useEffect, useState } from "react";
import { CgOrganisation } from "react-icons/cg";
import { MdOutlineSubtitles } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";

export default function Card({ space, cardSelected, onCardClick }) {
  const { images, name, organisation, capacity } = space;
  const [remainTimeBeforeNext, setRemainTimeBeforeNext] = useState(0);
  const [hasOngoingActivity, setHasOngoingActivity] = useState(false);

  const current = new Date();
  const handleClick = (e) => {
    e.preventDefault();
    onCardClick(cardSelected, space);
  };

  const checkOngoingActivity = () => {
    setHasOngoingActivity(
      space.availabilities.some((avail) => {
        const localEndTime = new Date(avail.endAt);
        const utcEndTime = new Date(
          localEndTime.getUTCFullYear(),
          localEndTime.getUTCMonth(),
          localEndTime.getUTCDate(),
          localEndTime.getUTCHours(),
          localEndTime.getUTCMinutes(),
          localEndTime.getUTCSeconds(),
        );
        return (
          avail.isBooked &&
          (utcEndTime.getTime() - current.getTime()) / 1000 > 1800
        );
      }),
    );
  };

  useEffect(() => {
    alertNextAvailability();
    checkOngoingActivity();
  }, []);

  const alertNextAvailability = () => {
    space.availabilities.some((avail) => {
      const localStartTime = new Date(avail.startAt);
      const utcStartTime = new Date(
        localStartTime.getUTCFullYear(),
        localStartTime.getUTCMonth(),
        localStartTime.getUTCDate(),
        localStartTime.getUTCHours(),
        localStartTime.getUTCMinutes(),
        localStartTime.getUTCSeconds(),
      );
      if (
        !avail.isBooked &&
        utcStartTime.getTime() - current.getTime() > 0 &&
        (utcStartTime.getTime() - current.getTime()) / 1000 < 300
      ) {
        setRemainTimeBeforeNext(
          Math.floor((utcStartTime.getTime() - current.getTime()) / 60000),
        );
      }
      return (
        !avail.isBooked &&
        utcStartTime.getTime() - current.getTime() > 0 &&
        (utcStartTime.getTime() - current.getTime()) / 1000 < 300
      );
    });
  };
  return (
    <a
      className="card rounded-lg flex flex-col gap-2 border"
      href=""
      onClick={handleClick}
    >
      <div className="">
        <img
          className="rounded-lg object-cover w-full h-[200px]"
          src={images[0].url}
          alt="space photo"
        />
      </div>
      <div className="flex flex-col px-1 py-2 gap-1 flex-1">
        <p className="text-base font-bold flex items-center gap-2">
          <MdOutlineSubtitles className="w-5" />
          {name}
        </p>
        <p className="text-base flex items-center gap-2">
          <CgOrganisation className="w-5" />
          {organisation}
        </p>
        <p className="text-base flex items-center gap-2">
          <IoPeopleOutline className="w-5" />
          {capacity} {capacity > 1 ? "personnes" : "personne"}
        </p>
      </div>
      <div>
        {hasOngoingActivity && (
          <div className="flex flex-row-reverse">
            <p className="bg-[#cccccc] py-1 px-2 rounded-full border-2 border-white font-bold my-1 mx-3">
              Activité en cours
            </p>
          </div>
        )}
        {remainTimeBeforeNext > 0 && (
          <div className="flex flex-row-reverse">
            <p className="bg-[#cccccc] py-1 px-2 rounded-full border-2 border-white font-bold my-2 mx-3">
              {`Dispo dans ${remainTimeBeforeNext} minute${remainTimeBeforeNext > 1 ? "s" : ""}`}
            </p>
          </div>
        )}
      </div>
    </a>
  );
}
