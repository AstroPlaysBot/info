import { useState, useEffect } from "react";

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

  // Automatisches Rotieren alle 10 Sekunden
  useEffect(() => {
    const interval = setInterval(() => {
      setStart((prev) => (prev + 1) % boxes.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // 3 sichtbare Boxen
  const getVisible = () =>
    Array.from({ length: 3 }, (_, i) => boxes[(start + i) % boxes.length]);

  return (
    <div className="relative mt-10 flex justify-center w-full overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: "translateX(0)" }} // Sliding wird über start gesteuert
      >
        {getVisible().map((box, index) => {
          const isCenter = index === 1; // mittlere Box

          return (
            <div
              key={box.id}
              className={`
                w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12
                flex-shrink-0
                flex items-center justify-center
                transition-all duration-700 ease-in-out
                ${isCenter ? "scale-110 opacity-100 z-10" : "scale-90 opacity-60"}
              `}
            >
              <img
                src={box.image}
                alt={`Box ${box.id}`}
                className="w-full h-full object-contain"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
