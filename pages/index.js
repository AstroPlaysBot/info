import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import ScrollLink from "../components/ScrollLink";
import { translations } from "../lib/i18n";

export default function Home() {
  const t = translations["en"]; // Standard Englisch, später dynamisch

  return (
    <div className="bg-galaxy min-h-screen text-white">
      <Navbar />

      <main className="flex flex-col items-center pt-20 w-full overflow-x-hidden">
        <h1 className="text-5xl font-bold">AstroPlays</h1>
        <p className="mt-2 text-xl">{t.slogan}</p>

        {/* Carousel braucht volle Breite */}
        <div className="w-full flex justify-center">
          <Carousel />
        </div>

        <div className="mt-10 w-full max-w-2xl text-center">
          <ScrollLink label={t.modules} targetId="modules" />
        </div>

        <section id="modules" className="mt-20 w-full max-w-4xl">
          <h2 className="text-3xl mb-5">{t.modules}</h2>
          <ul className="space-y-3">
            <li>Module 1: Funktion A, B, C</li>
            <li>Module 2: Funktion D, E</li>
            <li>Module 3: Funktion F</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
