"use client";

import { useRouter } from "next/navigation";
import { Calendar1Icon, Clock, CheckCircle, XCircle } from "lucide-react";

type FilterButtonsProps = {
  currentFilter?: string;
};

const FilterButtons = ({ currentFilter }: FilterButtonsProps) => {
  const router = useRouter();

  const handleFilterChange = (filter: string) => {
    router.push(`?filter=${filter}`);
  };

  console.log(currentFilter);

  return (
    <div className="grid grid-cols-2 gap-y-4 md:flex w-full">
      <div
        className={`flex flex-col items-center cursor-pointer group flex-1 hover:bg-color4 hover:rounded-sm`}
        onClick={() => handleFilterChange("All")}
      >
        <div className="flex gap-4 p-2 items-center">
          <Calendar1Icon className="w-5 h-5" />
          <div className="font-bold text-center text-color1">All events</div>
        </div>

        <div
          className={`w-full h-1 ${
            currentFilter !== "Opened" &&
            currentFilter !== "Confirmed" &&
            currentFilter !== "Cancelled" &&
            "bg-color1"
          }`}
        ></div>
      </div>

      <div
        className={`flex flex-col items-center cursor-pointer group hover:bg-blue-200 hover:rounded-sm flex-1`}
        onClick={() => handleFilterChange("Opened")}
      >
        <div className="flex gap-4 p-2 items-center">
          <Clock className="w-5 h-5 group-hover:text-blue-800" />
          <div className="font-bold text-center text-color1 group-hover:text-blue-800">Opened</div>
        </div>

        <div
          className={`w-full h-1 ${currentFilter === "Opened" && "bg-blue-800"}`}
        ></div>
      </div>
      <div
        className={`flex flex-col items-center cursor-pointer group hover:bg-green-200 hover:rounded-sm flex-1`}
        onClick={() => handleFilterChange("Confirmed")}
      >
        <div className="flex gap-4 p-2 items-center">
          <CheckCircle className="w-5 h-5 group-hover:text-green-800" />
          <div className="font-bold text-center text-color1 group-hover:text-green-800">Confirmed</div>
        </div>

        <div
          className={`w-full h-1 ${
            currentFilter === "Confirmed" && "bg-green-800"
          }`}
        ></div>
      </div>
      <div
        className={`flex flex-col items-center cursor-pointer group hover:bg-red-200 hover:rounded-sm flex-1`}
        onClick={() => handleFilterChange("Cancelled")}
      >
        <div className="flex gap-4 p-2 items-center">
          <XCircle className="w-5 h-5 group-hover:text-red-800" />
          <div className="font-bold text-center text-color1 group-hover:text-red-800">Cancelled</div>
        </div>

        <div
          className={`w-full h-1 ${
            currentFilter === "Cancelled" && "bg-red-800"
          }`}
        ></div>
      </div>

      {/* <div
        className={`flex items-center justify-between cursor-pointer group relative p-4 ${
          currentFilter === "Opened" ? "" : ""
        } bg-gray-500`}
        onClick={() => handleFilterChange("Opened")}
      >
        <Clock className="" />
        <div className="font-bold text-center w-full">Opened</div>
        <div className="w-6"></div>
        <div className="absolute -bottom-1.5 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
      </div>

      <div
        className="flex items-center justify-between cursor-pointer group relative bg-gray-500"
        onClick={() => handleFilterChange("Confirmed")}
      >
        <CheckCircle className="text-color-2 group-hover:text-green-800" />
        <div className="text-color1 font-bold group-hover:text-color3 text-center w-full">
          Confirmed
        </div>
        <div className="w-6"></div>
        <div className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-green-800 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
      </div>

      <div
        className="flex items-center justify-between cursor-pointer group relative bg-gray-500"
        onClick={() => handleFilterChange("Cancelled")}
      >
        <XCircle className="text-color-2 group-hover:text-color3" />
        <div className="text-color1 font-bold group-hover:text-color3 text-center w-full">
          Cancelled
        </div>
        <div className="w-6"></div>
        <div className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-color3 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
      </div> */}
    </div>
  );
};

export default FilterButtons;
