import { useParams, Link } from 'wouter';
import allFaqsData from '../data/allSchemesFaqs.json';
import pmKisanData from '../data/pm-kisan-faqs.json';

export default function FaqDetailPage() {
  const params = useParams() as { slug?: string };
  const slug = params?.slug || '';

  // Handle both array and {faqs: []} format
  const getArray = (data: any) => Array.isArray(data)? data : data.faqs || data.data || data.questions || [];

  const allFaqs = getArray(allFaqsData);
  const pmFaqs = getArray(pmKisanData);
  const combined = [...allFaqs,...pmFaqs];

  let faq = combined.find((f: any) => f.slug === slug || f.id === slug);

  if (!faq) {
    const first = combined[0];
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-xl font-bold">DEBUG - FAQ nahi mila</h1>
        <p className="mt-2 text-sm">Slug: {slug} | Loaded: {combined.length} (all:{allFaqs.length} + pm:{pmFaqs.length})</p>
        <div className="mt-4 p-3 bg-slate-100 text-xs overflow-auto">
          <p className="font-bold">First item structure:</p>
          <pre>{JSON.stringify(first, null, 2).slice(0, 800)}</pre>
        </div>
        <Link href="/faqs" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded">Sabhi FAQs</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/faqs" className="text-blue-600 text-sm">← All FAQs</Link>
      <h1 className="text-2xl font-bold mt-4">{faq.question || faq.title}</h1>
      <div className="mt-6 p-6 bg-white rounded shadow border"><p className="whitespace-pre-wrap leading-7">{faq.answer || faq.content}</p></div>
    </div>
  );
}
