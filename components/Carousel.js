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

  useEffect(() => {
    const interval = setInterval(() => {
      setStart((prev) => (prev + 1) % boxes.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const visible = Array.from({ length: 3 }, (_, i) => boxes[(start + i) % boxes.length]);

  return (
    <div className="w-full flex justify-center mt-10 overflow-hidden">
      {/* HIER ist der entscheidende Fix */}
      <div className="flex flex-nowrap items-center justify-center gap-6 w-[200px]">
        {visible.map((box, index) => {
          const isCenter = index === 1;

          return (
            <div
              key={box.id}
              className={`
                flex-shrink-0
                transition-transform duration-700 ease-in-out
                ${isCenter ? "scale-110 opacity-100 z-10" : "scale-100 opacity-60"}
              `}
            >
              <img
                src={box.image}
                alt={`Box ${box.id}`}
                className="w-12 h-12 object-contain"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
