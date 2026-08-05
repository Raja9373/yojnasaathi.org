import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function FaqDetailPage() {
  const { slug } = useParams();
  const [faq, setFaq] = useState<any>(null);

  useEffect(() => {
    // aapke paas src/data/faqs folder hai usi se load hoga
    import(`../data/faqs/${slug}.json`).then(m => setFaq(m.default || m)).catch(() => {
      // fallback - agar json nahi to AllFaqs se dhoondo
      import("../data/allFaqs.json").then(all => {
        const found = (all.default || all).find((f:any) => f.slug === slug);
        if(found) setFaq(found);
      }).catch(()=>{});
    });
  }, [slug]);

  if(!faq) return <div style={{padding:40}}>Loading FAQ: {slug}... <br/><Link to="/faqs">All FAQs</Link></div>;

  return (
    <div style={{maxWidth:800, margin:"0 auto", padding:20}}>
      <Link to="/faqs">← All FAQs</Link>
      <h1 style={{marginTop:20}}>{faq.question || faq.title}</h1>
      <div style={{marginTop:20, lineHeight:1.7}} dangerouslySetInnerHTML={{__html: faq.answer || faq.content}} />
    </div>
  );
}
