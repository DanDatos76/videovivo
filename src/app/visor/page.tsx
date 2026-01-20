 "use client";

import dynamic from 'next/dynamic';

// Cargamos el componente de forma dinámica y desactivamos el SSR
const VisorContent = dynamic(
  () => import('./VisorContent'),
  { ssr: false }
);

export default function VisorPage() {
  return <VisorContent />;
}
