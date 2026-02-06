import { useState, useEffect, useRef } from "react";

const boxes = [
  { id: 1, image: "/images/boxes/box-1.png" },
  { id: 2, image: "/images/boxes/box-2.png" },
  { id: 3, image: "/images/boxes/box-3.png" },
  { id: 4, image: "/images/boxes/box-4.png" },
  { id: 5, image: "/images/boxes/box-5.png" },
  { id: 6, image: "/images/boxes/box-6.png" },
];

export default function AutoSwipeCarousel() {
  const [start, setStart] = useState(0);
  const [visibleCount, setVisibleCount] = useState(
    typeof window !== "undefined" && window.innerWidth < 640 ? 1 : 3
  );

  const containerRef = useRef(null);
  const startX = useRef(0);
  const isDragging = useRef(false);
  const autoScrollRef = useRef(null);

  // Responsive
  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(window.innerWidth < 640 ? 1 : 3);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Automatisches Scrollen
  useEffect(() => {
    autoScrollRef.current = setInterval(() => {
      setStart((prev) => (prev + 1) % boxes.length);
    }, 3000);

    return () => clearInterval(autoScrollRef.current);
  }, []);

  // Swipe/Drag
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
    clearInterval(autoScrollRef.current); // Stoppt auto-scroll beim Drag
  };

  const handleMouseUp = (e) => {
    if (!isDragging.current) return;
    const diff = e.clientX - startX.current;
    if (diff > 50) prev();
    else if (diff < -50) next();
    isDragging.current = false;

    // Restart Auto-scroll nach Drag
    autoScrollRef.current = setInterval(() => {
      setStart((prev) => (prev + 1) % boxes.length);
    }, 3000);
  };

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    clearInterval(autoScrollRef.current);
  };

  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - startX.current;
    if (diff > 50) prev();
    else if (diff < -50) next();

    autoScrollRef.current = setInterval(() => {
      setStart((prev) => (prev + 1) % boxes.length);
    }, 3000);
  };

  const prev = () => setStart((prev) => (prev - 1 + boxes.length) % boxes.length);
  const next = () => setStart((prev) => (prev + 1) % boxes.length);

  const centerIndex = Math.floor(visibleCount / 2);

  return (
    <div
      className="w-full overflow-hidden mt-10"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => (isDragging.current = false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex items-center gap-4 md:gap-6 transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${start * (100 / visibleCount)}%)`,
        }}
      >
        {[...boxes, ...boxes].map((box, index) => {
          const relativeIndex = index % boxes.length;
          const isCenter =
            visibleCount === 1
              ? relativeIndex === start
              : relativeIndex === (start + centerIndex) % boxes.length;

          return (
            <div
              key={index}
              className={`flex-shrink-0 transform transition-transform duration-700 ease-in-out ${
                isCenter ? "scale-110 z-10" : "scale-100 opacity-80"
              }`}
              style={{ width: `${100 / visibleCount}%` }}
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
