 "use client";

import dynamic from 'next/dynamic';

// Importación dinámica para evitar el error "window is not defined"
const LlamadaContent = dynamic(
  () => import('./LlamadaContent'),
  { ssr: false }
);

export default function LlamadaPage() {
  return <LlamadaContent />;
}
