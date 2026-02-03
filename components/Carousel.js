import { useState } from "react";

const boxes = [
  { id: 1, label: "Box 1" },
  { id: 2, label: "Box 2" },
  { id: 3, label: "Box 3" },
  { id: 4, label: "Box 4" },
  { id: 5, label: "Box 5" },
  { id: 6, label: "Box 6" }
];

export default function Carousel() {
  const [start, setStart] = useState(0);

  const next = () => setStart((prev) => (prev + 1) % boxes.length);
  const prev = () =>
    setStart((prev) => (prev - 1 + boxes.length) % boxes.length);

  const getVisible = () => {
    let visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(boxes[(start + i) % boxes.length]);
    }
    return visible;
  };

  return (
    <div className="relative mt-10 flex items-center justify-center w-full max-w-4xl overflow-hidden">
      <button
        onClick={prev}
        className="absolute left-0 bg-blue-700 p-3 rounded-full z-10"
      >
        ◀
      </button>

      <div className="flex transition-transform duration-500 space-x-5">
        {getVisible().map((box) => (
          <div
            key={box.id}
            className="w-48 h-48 bg-blue-500 flex items-center justify-center text-2xl font-bold rounded-lg shadow-lg"
          >
            {box.label}
          </div>
        ))}
      </div>

      <button
        onClick={next}
        className="absolute right-0 bg-blue-700 p-3 rounded-full z-10"
      >
        ▶
      </button>
    </div>
  );
}

