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
  const [visibleCount, setVisibleCount] = useState(
    typeof window !== "undefined" && window.innerWidth < 640 ? 1 : 3
  );

  const startX = useRef(0);
  const isDragging = useRef(false);
  const intervalRef = useRef(null);

  // Responsive: Anzahl sichtbarer Boxen
  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(window.innerWidth < 640 ? 1 : 3);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Automatisches Scrollen
  useEffect(() => {
    startAutoScroll();
    return () => clearInterval(intervalRef.current);
  }, []);

  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      setStart((prev) => (prev + 1) % boxes.length);
    }, 3000);
  };

  // Drag / Touch
  const handleStart = (x) => {
    isDragging.current = true;
    startX.current = x;
    clearInterval(intervalRef.current);
  };

  const handleEnd = (x) => {
    if (!isDragging.current) return;
    const diff = x - startX.current;
    if (diff > 50) prev();
    else if (diff < -50) next();
    isDragging.current = false;
    startAutoScroll();
  };

  const prev = () => setStart((prev) => (prev - 1 + boxes.length) % boxes.length);
  const next = () => setStart((prev) => (prev + 1) % boxes.length);

  const centerIndex = Math.floor(visibleCount / 2);

  return (
    <div
      className="w-full overflow-hidden mt-10"
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseUp={(e) => handleEnd(e.clientX)}
      onMouseLeave={() => (isDragging.current = false)}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientX)}
    >
      <div className="flex items-center gap-4 md:gap-6">
        {boxes.map((box, index) => {
          // Bestimme Position relativ zum Start
          let relIndex = (index - start + boxes.length) % boxes.length;
          const isCenter = relIndex === centerIndex;

          // Breite: 100% / Anzahl sichtbarer Boxen
          const widthPercent = 100 / visibleCount;

          return (
            <div
              key={index}
              className={`flex-shrink-0 transform transition-transform duration-700 ease-in-out ${
                isCenter ? "scale-110 z-10" : "scale-100 opacity-80"
              }`}
              style={{
                width: `${widthPercent}%`,
                order: relIndex // Position im flex
              }}
            >
              <img
                src={box.image}
                alt={`Box ${box.id}`}
                className="object-contain h-auto max-h-[300px] md:max-h-[350px] lg:max-h-[400px] w-auto"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
