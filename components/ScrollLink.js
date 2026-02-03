export default function ScrollLink({ label, targetId }) {
  const scroll = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      onClick={scroll}
      className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-500"
    >
      {label}
    </button>
  );
}

