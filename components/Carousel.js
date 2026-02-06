import { useState, useEffect, useRef } from "react";

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
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setStart((prev) => (prev + 1) % boxes.length);
    }, 3000); // alle 3 Sekunden wechseln

    return () => clearInterval(interval);
  }, []);

  // Berechnet die 3 sichtbaren Boxen
  const visible = Array.from({ length: 3 }, (_, i) => boxes[(start + i) % boxes.length]);

  return (
    <div className="w-full flex justify-center mt-10 overflow-hidden">
      <div
        ref={containerRef}
        className="flex items-center justify-center gap-6 transition-transform duration-700 ease-in-out"
      >
        {visible.map((box, index) => {
          const isCenter = index === 1; // mittlere Box

          return (
            <div
              key={box.id}
              className={`flex-shrink-0 transform transition-transform duration-700 ease-in-out
                ${isCenter ? "scale-125 opacity-100 z-10" : "scale-90 opacity-60"}
              `}
            >
              <img
                src={box.image}
                alt={`Box ${box.id}`}
                className={`object-contain ${isCenter ? "w-32 h-32" : "w-20 h-20"}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
