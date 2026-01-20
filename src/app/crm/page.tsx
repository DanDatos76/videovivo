 "use client";
import dynamic from 'next/dynamic';

const CrmContent = dynamic(
  () => import('./CrmContent'),
  { ssr: false }
);

export default function CrmPage() {
  return <CrmContent />;
}
