"use client";

import dynamic from 'next/dynamic';

// Evita que Next.js intente cargar Agora en el servidor
const TallerContent = dynamic(
  () => import('./TallerContent'),
  { ssr: false }
);

export default function TallerPage() {
  return <TallerContent />;
}
