import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SEOHead } from '../components/SEOHead';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, HelpCircle, Landmark } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { lang, t } = useLanguage();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 sm:px-6">
      <SEOHead
        title={t('संपर्क करें एवं सहायता (Contact Us) - YojnaSaathi.org', 'Contact Us & Support - YojnaSaathi.org')}
        description={t(
          'सरकारी योजनाओं व सब्सिडी संबंधी किसी भी प्रश्न, सुझाव या सहायता के लिए YojnaSaathi.org टीम से संपर्क करें।',
          'Get in touch with the YojnaSaathi.org editorial & support team for grievances, feedback, or portal assistance.'
        )}
      />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#1E3A8A] to-[#1E40AF] text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-slate-900 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Mail className="w-3.5 h-3.5" />
            <span>{t('सहायता एवं फीडबैक', 'Support & Feedback')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t('हमसे संपर्क करें (Contact Us)', 'Contact Us')}
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 mt-2 max-w-2xl leading-relaxed">
            {t(
              'क्या आपके पास सरकारी योजनाओं अथवा हमारी वेबसाइट से संबंधित कोई सवाल या सुझाव है? कृपया नीचे दिए गए फॉर्म के माध्यम से हमसे संपर्क करें।',
              'Have questions or feedback regarding government schemes or our portal? Reach out to our dedicated support team.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Side: Contact Info & Helplines */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-slate-700">
              <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Landmark className="w-4 h-4 text-blue-700" />
                <span>{t('पोर्टल संपर्क विवरण', 'Portal Contact Info')}</span>
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">{t('ईमेल (Official Email):', 'Official Email:')}</strong>
                    <a href="mailto:contact@yojnasaathi.org" className="text-blue-700 hover:underline">
                      contact@yojnasaathi.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">{t('मुख्यालय (Headquarters):', 'Headquarters:')}</strong>
                    <p className="text-slate-600">YojnaSaathi Research Cell, KG Marg, New Delhi - 110001, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Official National Helplines */}
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 shadow-sm space-y-3 text-amber-950">
              <h2 className="text-sm font-bold flex items-center gap-2 text-amber-900">
                <Phone className="w-4 h-4 text-amber-600" />
                <span>{t('प्रमुख राष्ट्रीय हेल्पलाइन (Govt Helplines)', 'Major Official Helplines')}</span>
              </h2>

              <ul className="space-y-2 text-xs font-medium">
                <li className="flex justify-between border-b border-amber-200 pb-1.5">
                  <span>PM Kisan Helpline:</span>
                  <span className="font-bold text-amber-900">155261 / 011-24300606</span>
                </li>
                <li className="flex justify-between border-b border-amber-200 pb-1.5">
                  <span>Ayushman Bharat:</span>
                  <span className="font-bold text-amber-900">14555</span>
                </li>
                <li className="flex justify-between border-b border-amber-200 pb-1.5">
                  <span>PMAY Housing:</span>
                  <span className="font-bold text-amber-900">1800-11-6163</span>
                </li>
                <li className="flex justify-between">
                  <span>National Toll-Free:</span>
                  <span className="font-bold text-amber-900">1800-11-0001</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="md:col-span-2 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900 pb-2 border-b border-slate-100">
              {t('हमें संदेश भेजें (Send Us a Message)', 'Send Us a Message')}
            </h2>

            {formSubmitted ? (
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-950">
                  {t('आपका संदेश सफलतापूर्वक प्राप्त हुआ!', 'Your message has been sent successfully!')}
                </h3>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  {t(
                    'हमारी टीम 24 से 48 घंटों में आपके दिए गए ईमेल पर जवाब देगी। YojnaSaathi.org का उपयोग करने के लिए धन्यवाद!',
                    'Our team will respond to your email within 24 to 48 hours. Thank you for reaching out to YojnaSaathi.org!'
                  )}
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="bg-[#1E40AF] text-white text-xs font-bold px-6 py-2.5 rounded-xl cursor-pointer"
                >
                  {t('दूसरा संदेश भेजें', 'Send Another Message')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                      {t('आपका पूरा नाम *', 'Your Full Name *')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t('अपना नाम लिखें', 'Enter full name')}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                      {t('आपका ईमेल एड्रेस *', 'Your Email Address *')}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="example@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                      {t('मोबाइल नंबर (वैकल्पिक)', 'Phone Number (Optional)')}
                    </label>
                    <input
                      type="tel"
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                      {t('विषय (Subject)', 'Subject')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('संदेश का विषय चुनें', 'Message subject')}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    {t('आपका सवाल / सुझाव *', 'Your Question / Feedback *')}
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={t('यहां अपना सवाल या फीडबैक लिखें...', 'Write your message or inquiry here...')}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-600"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-[#1E40AF] hover:bg-blue-900 text-white font-bold text-xs sm:text-sm px-8 py-3 rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-2 transition"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>{t('संदेश भेजें (Send Message)', 'Send Message')}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
