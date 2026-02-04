import { useState } from "react";

const boxes = [
  { id: 1, image: "/images/boxes/box-1.png" },
  { id: 2, image: "/images/boxes/box-2.png" },
  { id: 3, image: "/images/boxes/box-3.png" },
  { id: 4, image: "/images/boxes/box-4.png" },
  { id: 5, image: "/images/boxes/box-5.png" },
  { id: 6, image: "/images/boxes/box-6.png" },
];

export default function Carousel() {
  const [start, setStart] = useState(0);

  const next = () => setStart((prev) => (prev + 1) % boxes.length);
  const prev = () =>
    setStart((prev) => (prev - 1 + boxes.length) % boxes.length);

  const getVisible = () =>
    Array.from({ length: 3 }, (_, i) => boxes[(start + i) % boxes.length]);

  return (
    <div className="relative mt-10 flex items-center justify-center w-full max-w-5xl overflow-hidden">
      {/* Left Button */}
      <button
        onClick={prev}
        className="absolute left-0 bg-black/60 hover:bg-black/80 p-2 md:p-3 rounded-full z-10"
      >
        ◀
      </button>

      {/* Boxes */}
      <div className="flex flex-nowrap space-x-4 md:space-x-6 transition-transform duration-500">
        {getVisible().map((box) => (
          <div
            key={box.id}
            className="w-36 h-24 md:w-44 md:h-28 flex-shrink-0 flex items-center justify-center transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src={box.image}
              alt={`Box ${box.id}`}
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        ))}
      </div>

      {/* Right Button */}
      <button
        onClick={next}
        className="absolute right-0 bg-black/60 hover:bg-black/80 p-2 md:p-3 rounded-full z-10"
      >
        ▶
      </button>
    </div>
  );
}
