import { CategoryInfo, CategorySlug } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: 'kisan',
    name_hi: 'किसान कल्याण',
    name_en: 'Farmer Welfare',
    icon: 'Sprout',
    description_hi: 'कृषि, खाद, उपकरण, फसल बीमा और सम्मान निधि योजनाएं',
    description_en: 'Agriculture, subsidies, crop insurance & farmer income support schemes',
    bgColor: 'bg-emerald-50 border-emerald-200',
    textColor: 'text-emerald-700'
  },
  {
    slug: 'subsidy',
    name_hi: 'सरकारी सब्सिडी / सब्सिडी योजनाएं',
    name_en: 'Govt Subsidies',
    icon: 'Percent',
    description_hi: 'सोलर, कृषि उपकरण, ईवी, डेयरी, सूक्ष्म सिंचाई व एमएसएमई सब्सिडी',
    description_en: 'Solar, EV, farm machinery, dairy & MSME government subsidies',
    bgColor: 'bg-amber-50 border-amber-200',
    textColor: 'text-amber-800'
  },
  {
    slug: 'mahila',
    name_hi: 'महिला सशक्तिकरण',
    name_en: 'Women Empowerment',
    icon: 'HeartHandshake',
    description_hi: 'महिलाओं के लिए आर्थिक सहायता, रोजगार और सुरक्षा योजनाएं',
    description_en: 'Financial aid, self-employment & welfare schemes for women',
    bgColor: 'bg-rose-50 border-rose-200',
    textColor: 'text-rose-700'
  },
  {
    slug: 'beti',
    name_hi: 'बेटी बचाओ - बेटी पढ़ाओ',
    name_en: 'Girl Child Schemes',
    icon: 'Baby',
    description_hi: 'बालिकाओं के स्वास्थ्य, शिक्षा और भविष्य सुरक्षा की योजनाएं',
    description_en: 'Education, health, and financial savings schemes for girls',
    bgColor: 'bg-purple-50 border-purple-200',
    textColor: 'text-purple-700'
  },
  {
    slug: 'shiksha',
    name_hi: 'शिक्षा व छात्रवृत्ति',
    name_en: 'Education & Scholarship',
    icon: 'GraduationCap',
    description_hi: 'छात्रवृत्ति, लैपटॉप वितरण, कौशल विकास और मुफ्त शिक्षा',
    description_en: 'Scholarships, skill development, free education & coaching',
    bgColor: 'bg-blue-50 border-blue-200',
    textColor: 'text-blue-700'
  },
  {
    slug: 'rozgar',
    name_hi: 'रोजगार व व्यवसाय',
    name_en: 'Employment & Business',
    icon: 'Briefcase',
    description_hi: 'मुद्रा लोन, स्वरोजगार, कारीगर व स्ट्रीट वेंडर योजनाएं',
    description_en: 'Mudra loans, self-employment, vendor loans & artisan grants',
    bgColor: 'bg-amber-50 border-amber-200',
    textColor: 'text-amber-700'
  },
  {
    slug: 'awas',
    name_hi: 'आवास योजनाएं',
    name_en: 'Housing Schemes',
    icon: 'Home',
    description_hi: 'ग्रामीण व शहरी क्षेत्रों में पक्के मकान निर्माण हेतु अनुदान',
    description_en: 'Financial grants for pucca housing in rural & urban areas',
    bgColor: 'bg-orange-50 border-orange-200',
    textColor: 'text-orange-700'
  },
  {
    slug: 'pension',
    name_hi: 'पेंशन व वृद्धावस्था',
    name_en: 'Pension & Social Welfare',
    icon: 'UserCheck',
    description_hi: 'वृद्धावस्था, विधवा, विकलांग व सामाजिक सुरक्षा पेंशन',
    description_en: 'Old age, widow, disability, and monthly pension schemes',
    bgColor: 'bg-indigo-50 border-indigo-200',
    textColor: 'text-indigo-700'
  },
  {
    slug: 'swasthya',
    name_hi: 'स्वास्थ्य व दुर्घटना बीमा',
    name_en: 'Health & Medical Insurance',
    icon: 'Activity',
    description_hi: 'मुफ्त 5 लाख तक इलाज, आयुष्मान भारत व स्वास्थ्य सुरक्षा',
    description_en: 'Free health coverage up to ₹5 Lakhs & medical insurance',
    bgColor: 'bg-teal-50 border-teal-200',
    textColor: 'text-teal-700'
  }
];

export const STATES_LIST = [
  { code: 'all', name_hi: 'सभी राज्य (All India / Central)', name_en: 'All States (Central Schemes)', slug: 'all' },
  { code: 'UP', name_hi: 'उत्तर प्रदेश (Uttar Pradesh)', name_en: 'Uttar Pradesh', slug: 'uttar-pradesh' },
  { code: 'MP', name_hi: 'मध्य प्रदेश (Madhya Pradesh)', name_en: 'Madhya Pradesh', slug: 'madhya-pradesh' },
  { code: 'BR', name_hi: 'बिहार (Bihar)', name_en: 'Bihar', slug: 'bihar' },
  { code: 'RJ', name_hi: 'राजस्थान (Rajasthan)', name_en: 'Rajasthan', slug: 'rajasthan' },
  { code: 'MH', name_hi: 'महाराष्ट्र (Maharashtra)', name_en: 'Maharashtra', slug: 'maharashtra' },
  { code: 'DL', name_hi: 'दिल्ली (Delhi)', name_en: 'Delhi', slug: 'delhi' },
  { code: 'HR', name_hi: 'हरियाणा (Haryana)', name_en: 'Haryana', slug: 'haryana' },
  { code: 'PB', name_hi: 'पंजाब (Punjab)', name_en: 'Punjab', slug: 'punjab' },
  { code: 'JH', name_hi: 'झारखंड (Jharkhand)', name_en: 'Jharkhand', slug: 'jharkhand' },
  { code: 'CG', name_hi: 'छत्तीसगढ़ (Chhattisgarh)', name_en: 'Chhattisgarh', slug: 'chhattisgarh' },
  { code: 'WB', name_hi: 'पश्चिम बंगाल (West Bengal)', name_en: 'West Bengal', slug: 'west-bengal' },
  { code: 'GJ', name_hi: 'गुजरात (Gujarat)', name_en: 'Gujarat', slug: 'gujarat' },
  { code: 'TN', name_hi: 'तमिलनाडु (Tamil Nadu)', name_en: 'Tamil Nadu', slug: 'tamil-nadu' },
  { code: 'KA', name_hi: 'कर्नाटक (Karnataka)', name_en: 'Karnataka', slug: 'karnataka' },
  { code: 'AP', name_hi: 'आंध्र प्रदेश (Andhra Pradesh)', name_en: 'Andhra Pradesh', slug: 'andhra-pradesh' },
  { code: 'TS', name_hi: 'तेलंगाना (Telangana)', name_en: 'Telangana', slug: 'telangana' },
  { code: 'OD', name_hi: 'ओडिशा (Odisha)', name_en: 'Odisha', slug: 'odisha' },
  { code: 'KL', name_hi: 'केरल (Kerala)', name_en: 'Kerala', slug: 'kerala' },
  { code: 'AS', name_hi: 'असम (Assam)', name_en: 'Assam', slug: 'assam' },
  { code: 'HP', name_hi: 'हिमाचल प्रदेश (Himachal Pradesh)', name_en: 'Himachal Pradesh', slug: 'himachal-pradesh' },
  { code: 'UK', name_hi: 'उत्तराखंड (Uttarakhand)', name_en: 'Uttarakhand', slug: 'uttarakhand' },
  { code: 'GA', name_hi: 'गोवा (Goa)', name_en: 'Goa', slug: 'goa' },
  { code: 'TR', name_hi: 'त्रिपुरा (Tripura)', name_en: 'Tripura', slug: 'tripura' },
  { code: 'MN', name_hi: 'मणिपुर (Manipur)', name_en: 'Manipur', slug: 'manipur' },
  { code: 'ML', name_hi: 'मेघालय (Meghalaya)', name_en: 'Meghalaya', slug: 'meghalaya' },
  { code: 'MZ', name_hi: 'मिजोरम (Mizoram)', name_en: 'Mizoram', slug: 'mizoram' },
  { code: 'NL', name_hi: 'नागालैंड (Nagaland)', name_en: 'Nagaland', slug: 'nagaland' },
  { code: 'SK', name_hi: 'सिक्किम (Sikkim)', name_en: 'Sikkim', slug: 'sikkim' },
  { code: 'AR', name_hi: 'अरुणाचल प्रदेश (Arunachal Pradesh)', name_en: 'Arunachal Pradesh', slug: 'arunachal-pradesh' },
  { code: 'JK', name_hi: 'जम्मू और कश्मीर (Jammu & Kashmir)', name_en: 'Jammu & Kashmir', slug: 'jammu-kashmir' },
  { code: 'LA', name_hi: 'लद्दाख (Ladakh)', name_en: 'Ladakh', slug: 'ladakh' },
  { code: 'PY', name_hi: 'पुडुचेरी (Puducherry)', name_en: 'Puducherry', slug: 'puducherry' },
  { code: 'CH', name_hi: 'चंडीगढ़ (Chandigarh)', name_en: 'Chandigarh', slug: 'chandigarh' },
  { code: 'AN', name_hi: 'अंडमान और निकोबार (Andaman & Nicobar)', name_en: 'Andaman & Nicobar', slug: 'andaman-nicobar' },
  { code: 'DN', name_hi: 'दादरा व नगर हवेली (Dadra & Nagar Haveli)', name_en: 'Dadra & Nagar Haveli', slug: 'dadra-nagar-haveli' },
  { code: 'LD', name_hi: 'लक्षद्वीप (Lakshadweep)', name_en: 'Lakshadweep', slug: 'lakshadweep' }
];

export const OCCUPATIONS_LIST = [
  { code: 'all', label_hi: 'सभी व्यवसाय (All)', label_en: 'All Occupations' },
  { code: 'farmer', label_hi: 'किसान / कृषि (Farmer)', label_en: 'Farmer / Agriculture' },
  { code: 'student', label_hi: 'छात्र / विद्यार्थी (Student)', label_en: 'Student' },
  { code: 'unemployed', label_hi: 'बेरोजगार युवा (Unemployed)', label_en: 'Unemployed Youth' },
  { code: 'self-employed', label_hi: 'स्वरोजगार / छोटा व्यापारी (Self-Employed)', label_en: 'Self-Employed / Small Vendor' },
  { code: 'worker', label_hi: 'असंगठित मजदूर / श्रमिक (Construction Worker)', label_en: 'Unorganized Worker / Artisan' },
  { code: 'women', label_hi: 'गृहणी / महिला (Homemaker)', label_en: 'Homemaker / Women' },
  { code: 'senior', label_hi: 'वरिष्ठ नागरिक (Senior Citizen)', label_en: 'Senior Citizen' }
];

export const CASTES_LIST = [
  { code: 'all', label_hi: 'सभी वर्ग (All Categories)', label_en: 'All Categories' },
  { code: 'general', label_hi: 'सामान्य (General)', label_en: 'General' },
  { code: 'obc', label_hi: 'अन्य पिछड़ा वर्ग (OBC)', label_en: 'OBC' },
  { code: 'sc', label_hi: 'अनुसूचित जाति (SC)', label_en: 'Scheduled Caste (SC)' },
  { code: 'st', label_hi: 'अनुसूचित जनजाति (ST)', label_en: 'Scheduled Tribe (ST)' },
  { code: 'ews', label_hi: 'ईडब्ल्यूएस (EWS)', label_en: 'Economically Weaker Section (EWS)' }
];

export const INCOME_SLABS = [
  { code: 'all', label_hi: 'सभी आय सीमा (Any Income)', label_en: 'Any Income' },
  { code: '100000', label_hi: '₹1 लाख से कम (Under ₹1 Lakh)', label_en: 'Under ₹1 Lakh', max_value: 100000 },
  { code: '250000', label_hi: '₹1 लाख से ₹2.5 लाख (₹1L - ₹2.5L)', label_en: '₹1 Lakh to ₹2.5 Lakhs', max_value: 250000 },
  { code: '500000', label_hi: '₹2.5 लाख से ₹5 लाख (₹2.5L - ₹5L)', label_en: '₹2.5 Lakhs to ₹5 Lakhs', max_value: 500000 },
  { code: '800000', label_hi: '₹5 लाख से ₹8 लाख (₹5L - ₹8L)', label_en: '₹5 Lakhs to ₹8 Lakhs', max_value: 800000 },
  { code: 'above8', label_hi: '₹8 लाख से अधिक (Above ₹8 Lakhs)', label_en: 'Above ₹8 Lakhs', max_value: 99999999 }
];
