// app/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react"; // 💜 Ícono de corazón

/** Hook para revelar secciones al hacer scroll */
function useReveal<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1, ...(options || {}) }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, visible };
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section
      ref={ref}
      className={`relative rounded-2xl border border-white/10 bg-gray-900/50 p-6 md:p-8 backdrop-blur 
      transition duration-700 ease-out transform hover:scale-[1.01] hover:shadow-lg hover:shadow-purple-500/20
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <h2 className="mb-4 text-2xl md:text-3xl font-semibold text-white">
        {title}
      </h2>
      <div className="prose prose-invert prose-sm md:prose-base max-w-none">
        {children}
      </div>
      {/* Glow inferior sutil */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-6 h-12 bg-gradient-to-b from-purple-500/10 to-transparent blur-xl" />
    </section>
  );
}

export default function Page() {
  return (
    <main className="min-h-dvh bg-gray-950 text-gray-100 antialiased">
      {/* Fondo decorativo */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-16 h-72 w-72 rounded-full bg-purple-500/30 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -left-20 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />
      </div>

      {/* Header */}
      <header className="relative mx-auto max-w-5xl px-4 pt-16 md:pt-24 space-y-6 text-left">
        <h1
          className="text-4xl md:text-6xl font-extrabold leading-tight 
          bg-gradient-to-r from-white via-purple-400 to-purple-500 
          bg-clip-text text-transparent drop-shadow-lg
          animate-gradient bg-[length:200%_200%]"
        >
          Fasturno
        </h1>
        <p
          className="max-w-3xl text-base md:text-lg text-gray-300 
          leading-relaxed drop-shadow-sm text-justify"
        >
          <strong>Fasturno</strong> es una iniciativa conceptual de sistema de
          información orientado a la{" "}
          <em>agilización de agendamiento y gestión de citas</em>, apoyado por
          automatización conversacional y flujos operativos claros. Este
          documento reúne el marco de objetivos, la misión y visión
          institucional, y el planteamiento del problema que justifica su
          diseño.
        </p>
      </header>

      {/* Contenido */}
      <div
        id="contenido"
        className="relative mx-auto max-w-5xl px-4 py-12 md:py-16 space-y-8 md:space-y-10"
      >
        {/* Planteamiento del Problema */}
        <Section title="Planteamiento del Problema">
          <p className="mb-3">
            En numerosas organizaciones, la programación de citas se realiza con
            procesos manuales o fragmentados, lo que deriva en{" "}
            <strong>sobrecarga operativa</strong>,
            <strong> errores de coordinación</strong>, <strong>no-shows</strong>{" "}
            y <strong>falta de visibilidad</strong> sobre la demanda real. Esta
            situación impide planificar capacidades, medir desempeño y ofrecer
            una experiencia consistente al usuario final. Como respuesta,{" "}
            <strong>fasturno</strong> busca reducir la incertidumbre, optimizar
            agendas y habilitar la evaluación continua de resultados.
          </p>
        </Section>

        {/* Objetivo General */}
        <Section title="Objetivo General">
          <p>
            Establecer el marco conceptual de <strong>fasturno</strong> para
            orientar el diseño y la gestión de un sistema de información
            centrado en la programación y administración de citas, garantizando
            claridad terminológica, alineación con objetivos organizacionales y
            soporte a la toma de decisiones.
          </p>
        </Section>

        {/* Objetivos Específicos */}
        <Section title="Objetivos Específicos">
          <ul className="grid gap-3 md:grid-cols-2">
            {[
              "Identificar y precisar los conceptos clave de sistemas de información que fundamentan fasturno.",
              "Delimitar el alcance, actores y flujos de información relevantes para la gestión de citas.",
              "Describir la tipología de sistemas relacionada (SPO, SAO, SIA, SSD, SSE) y su papel dentro del marco conceptual.",
              "Estructurar las fases del ciclo de vida del desarrollo para orientar futuras implementaciones.",
            ].map((obj, i) => (
              <li
                key={i}
                className="rounded-lg border border-white/10 bg-gray-900/60 p-4 
                transition transform hover:scale-105 hover:border-purple-400/40 hover:bg-gray-900/80 hover:shadow-md hover:shadow-purple-500/20"
              >
                {obj}
              </li>
            ))}
          </ul>
        </Section>

        {/* Misión y Visión */}
        <Section title="Misión y Visión">
          <div className="grid gap-4 md:grid-cols-2">
            <div
              className="rounded-xl border border-white/10 bg-gray-900/60 p-5 
              transition transform hover:scale-105 hover:border-purple-400/40 hover:bg-gray-900/80 hover:shadow-md hover:shadow-purple-500/20"
            >
              <h3 className="mb-2 text-lg font-semibold text-white">Misión</h3>
              <p>
                Proveer un marco conceptual claro y práctico para{" "}
                <strong>fasturno</strong> que permita estandarizar la
                programación de citas, mejorar la coordinación entre actores y
                facilitar decisiones informadas en la operación diaria.
              </p>
            </div>
            <div
              className="rounded-xl border border-white/10 bg-gray-900/60 p-5 
              transition transform hover:scale-105 hover:border-purple-400/40 hover:bg-gray-900/80 hover:shadow-md hover:shadow-purple-500/20"
            >
              <h3 className="mb-2 text-lg font-semibold text-white">Visión</h3>
              <p>
                Consolidar a <strong>fasturno</strong> como referencia académica
                y organizacional en la gestión conceptual de agendas,
                destacándose por su enfoque en eficiencia, trazabilidad y mejora
                continua basada en información.
              </p>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <footer className="pt-6 text-center text-xs text-gray-400">
          <p className="flex items-center justify-center gap-1">
            Made with{" "}
            <Heart className="w-4 h-4 text-purple-400 animate-pulse transition-transform hover:scale-125" />{" "}
            by Javier Chacón
          </p>
        </footer>
      </div>
    </main>
  );
}
