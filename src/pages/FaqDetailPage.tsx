import { useParams } from "react-router-dom";
import { allFaqs } from "../data/faqs";

export default function FaqDetailPage() {
  const { slug } = useParams();
  const faq = allFaqs.find((f: any) => f.slug === slug);

  if (!faq) {
    return <div className="p-10 text-center">FAQ Not Found - <a href="/faqs">All FAQs</a></div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{faq.question}</h1>
      <div className="prose mt-6" dangerouslySetInnerHTML={{ __html: faq.answer }} />
      <div className="mt-10">
        <a href="/faqs" className="text-blue-600">← Back to All FAQs</a>
      </div>
    </div>
  );
}
