export default function Navbar() {
  return (
    <nav className="fixed top-0 right-0 left-0 h-16 flex justify-end items-center px-5 bg-black/50 backdrop-blur-sm z-50">
      <button className="mr-4 p-2 bg-blue-600 rounded">De/En</button>
      <button className="p-2 bg-purple-600 rounded">Dashboard</button>
    </nav>
  );
}

