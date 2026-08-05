import { useParams, Link } from 'wouter';
import allFaqsData from '../data/allSchemesFaqs.json';
import pmKisanData from '../data/pm-kisan-faqs.json';

export default function FaqDetailPage() {
  const params = useParams() as { slug?: string };
  const slug = params?.slug || '';

  const getArray = (data: any) => Array.isArray(data) ? data : data.faqs || data.data || [];

  const combined = [...getArray(allFaqsData), ...getArray(pmKisanData)];

  // Find by slug or id
  let faq = combined.find((f: any) => f.slug === slug || String(f.id) === slug);

  // If not found, try to find related by keywords (cm + kisan + kalyan)
  if (!faq) {
    const keywords = slug.split('-').filter(w => w.length > 2 && w !== 'me' && w !== 'ka');
    faq = combined.find((f: any) => {
      const text = `${f.q || ''} ${f.q_en || ''}`.toLowerCase();
      return keywords.some((k: string) => text.includes(k));
    });
  }

  // If still not found - show SEO friendly fallback page (not error)
  if (!faq) {
    const title = slug.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link href="/faqs" className="text-blue-600 text-sm">← All FAQs</Link>
        <h1 className="text-2xl md:text-3xl font-bold mt-4">{title} - YojanaSaathi</h1>
        <div className="mt-6 p-6 bg-white dark:bg-slate-800 rounded-lg shadow border leading-7">
          <p><strong>{title}</strong> se sambandhit jaankari jaldi update ki ja rahi hai.</p>
          <p className="mt-3">PM Kisan Samman Nidhi Yojana ke tahat kisanon ko har saal ₹6000 ki sahayata di jaati hai. CM Kisan Kalyan Yojana Madhya Pradesh sarkar ki yojana hai jisme atirikt sahayata di jaati hai.</p>
          <p className="mt-3">Adhik jaankari ke liye official portal pmkisan.gov.in par jayen.</p>
        </div>
        <div className="mt-6 flex gap-3">
          <Link href="/faqs" className="px-4 py-2 bg-blue-600 text-white rounded">Sabhi FAQs dekhein</Link>
          <Link href="/" className="px-4 py-2 bg-slate-100 rounded">Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/faqs" className="text-blue-600 text-sm">← All FAQs</Link>
      <h1 className="text-2xl md:text-3xl font-bold mt-4">{faq.q || faq.question || faq.q_en}</h1>
      {faq.cat && <span className="mt-2 inline-block text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded">{faq.cat}</span>}
      <div className="mt-6 p-6 bg-white dark:bg-slate-800 rounded-lg shadow border leading-7">
        <p className="whitespace-pre-wrap">{faq.a || faq.answer || faq.a_en}</p>
      </div>
    </div>
  );
}
