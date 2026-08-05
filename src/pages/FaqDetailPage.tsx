import { useParams, Link } from 'wouter';
import allFaqsData from '../data/allSchemesFaqs.json';
import pmKisanData from '../data/pm-kisan-faqs.json';

export default function FaqDetailPage() {
  const params = useParams() as { slug?: string };
  const slug = params?.slug || '';

  const getArray = (data: any) => Array.isArray(data) ? data : data.faqs || data.data || [];
  const combined = [...getArray(allFaqsData), ...getArray(pmKisanData)];

  // ONLY exact slug match - no random related
  const faq = combined.find((f: any) => f.slug === slug);

  if (!faq) {
    const prettyTitle = slug.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link href="/faqs" className="text-blue-600 text-sm">← All FAQs</Link>
        <h1 className="text-2xl md:text-3xl font-bold mt-4">{prettyTitle}</h1>
        <div className="mt-2 text-xs text-slate-500">Yojana: PM Kisan | Updated: May 2026</div>
        <div className="mt-6 p-6 bg-white dark:bg-slate-800 rounded-lg shadow border leading-7 space-y-3">
          <p><strong>{prettyTitle}</strong> - is vishay par hum jaldi hi detailed update kar rahe hain.</p>
          <p><strong>PM Kisan + CM Kisan Kalyan:</strong> PM Kisan me kendra sarkar dwara ₹6000/year (3 kist) diye jate hain. Madhya Pradesh me CM Kisan Kalyan Yojana ke tahat atirikt ₹4000/year milakar kul ₹10,000 ka labh milta hai.</p>
          <p>Jodne ke liye: PM Kisan portal pmkisan.gov.in par registration aur MP ke Saral portal par CM Kisan Kalyan me apply karna hota hai. Patrata: MP ka nivasi kisan, 2 hectare tak bhumi.</p>
          <p className="text-sm text-slate-600">Source: pmkisan.gov.in | mp.gov.in</p>
        </div>
        <div className="mt-6">
          <Link href="/faqs" className="px-4 py-2 bg-blue-600 text-white rounded">Sabhi FAQs dekhein</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/faqs" className="text-blue-600 text-sm">← All FAQs</Link>
      <h1 className="text-2xl md:text-3xl font-bold mt-4">{faq.q}</h1>
      {faq.cat && <span className="mt-3 inline-block text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded">{faq.cat}</span>}
      <div className="mt-6 p-6 bg-white dark:bg-slate-800 rounded-lg shadow border">
        <p className="whitespace-pre-wrap leading-7">{faq.a}</p>
      </div>
    </div>
  );
}
