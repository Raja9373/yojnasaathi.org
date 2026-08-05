import { useParams, Link } from 'wouter';

export default function FaqDetailPage() {
  const params = useParams() as { slug?: string };
  const slug = params?.slug || '';

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/faqs" className="text-blue-600 hover:underline">← All FAQs</Link>
      <h1 className="text-2xl font-bold mt-4 capitalize">{slug.replace(/-/g, ' ')}</h1>
      <p className="mt-4 text-slate-600">Is FAQ ka detailed answer jaldi add hoga. Filhal aap sabhi FAQs yaha dekh sakte hain.</p>
      <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded">
        <p className="text-sm">Slug: {slug}</p>
      </div>
      <div className="mt-6">
        <Link href="/faqs" className="px-4 py-2 bg-blue-600 text-white rounded">Sabhi FAQs dekhein</Link>
      </div>
    </div>
  );
}
