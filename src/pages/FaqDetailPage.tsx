import { useParams, Link } from 'wouter';
import allFaqs from '../data/allSchemesFaqs.json';
import pmKisanFaqs from '../data/pm-kisan-faqs.json';

export default function FaqDetailPage() {
  const params = useParams() as { slug?: string };
  const slug = params?.slug || '';
  
  // Combine all FAQs
  const combinedFaqs = [...(allFaqs as any[]), ...(pmKisanFaqs as any[])];
  
  // Find FAQ by slug - check slug, id, or question converted to slug
  const faq = combinedFaqs.find((f: any) => {
    const fSlug = f.slug || f.id || f.question?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return fSlug === slug;
  });

  if (!faq) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-bold">FAQ nahi mila</h1>
        <p className="mt-2 text-slate-600">Slug: {slug}</p>
        <Link href="/faqs" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded">Sabhi FAQs dekhein</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/faqs" className="text-blue-600 hover:underline text-sm">← All FAQs</Link>
      <h1 className="text-2xl md:text-3xl font-bold mt-4">{faq.question || faq.title}</h1>
      <div className="mt-6 p-6 bg-white dark:bg-slate-800 rounded-lg shadow border leading-relaxed">
        <p className="whitespace-pre-wrap">{faq.answer || faq.content || faq.description}</p>
      </div>
      <div className="mt-6 flex gap-3">
        <Link href="/faqs" className="px-4 py-2 bg-blue-600 text-white rounded">Sabhi FAQs</Link>
        <Link href="/" className="px-4 py-2 bg-slate-100 rounded">Home</Link>
      </div>
    </div>
  );
}
