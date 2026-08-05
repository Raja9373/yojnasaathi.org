import { useParams, Link } from 'wouter';
import allFaqs from '../data/allSchemesFaqs.json';
import pmKisanFaqs from '../data/pm-kisan-faqs.json';

export default function FaqDetailPage() {
  const params = useParams() as { slug?: string };
  const slug = params?.slug || '';
  const searchText = slug.toLowerCase().replace(/-/g, ' ');

  const combined = [...(allFaqs as any[]), ...(pmKisanFaqs as any[])];

  // 1. Exact match
  let faq = combined.find((f: any) => f.slug === slug || f.id === slug);

  // 2. Loose match - question me slug ke words hain kya
  if (!faq) {
    const keywords = searchText.split(' ').filter(w => w.length > 2);
    faq = combined.find((f: any) => {
      const q = (f.question || f.title || '').toLowerCase();
      return keywords.length > 0 && keywords.every(k => q.includes(k));
    });
  }

  if (!faq) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-bold">FAQ nahi mila</h1>
        <p className="mt-2 text-sm text-slate-500">Slug: {slug} | Total Loaded: {combined.length}</p>
        <Link href="/faqs" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded">
          Sabhi FAQs dekhein
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/faqs" className="text-blue-600 hover:underline text-sm">← All FAQs</Link>
      <h1 className="text-2xl md:text-3xl font-bold mt-4">{faq.question || faq.title}</h1>
      <div className="mt-6 p-6 bg-white dark:bg-slate-800 rounded-lg shadow border">
        <p className="whitespace-pre-wrap leading-7">{faq.answer || faq.content || faq.description}</p>
      </div>
      <div className="mt-6">
        <Link href="/faqs" className="px-4 py-2 bg-blue-600 text-white rounded">Aur FAQs dekhein</Link>
      </div>
    </div>
  );
}
