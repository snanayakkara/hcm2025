export interface FAQItem {
  category: string;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    category: 'general',
    question: 'What are your operating hours?',
    answer: 'Our main clinic at Cabrini Hospital Malvern is open Monday-Friday 8:30am-5:00pm. Other locations have varying hours - Pakenham is open Monday-Friday 9:00am-5:00pm and Saturday 9:00am-1:00pm. Please call your preferred location to confirm specific hours.'
  },
  {
    category: 'general',
    question: 'Do I need a referral to see a cardiologist?',
    answer: 'Yes, you need a referral from your GP or another specialist to see our cardiologists. This ensures Medicare rebates are available and helps us understand your medical history and the reason for your visit.'
  },
  {
    category: 'general',
    question: 'What should I bring to my first appointment?',
    answer: 'Please bring your Medicare card, private health insurance details, referral letter from your GP, a list of current medications, and any previous cardiac test results or reports.'
  },
  {
    category: 'billing',
    question: 'Do you accept Medicare?',
    answer: 'Yes, we accept Medicare and offer bulk billing for eligible patients. We also work with most private health insurance funds for gap-free or reduced gap consultations. To make it easier for you, we can process your Medicare claims on the spot at the end of your appointment.'
  },
  {
    category: 'billing',
    question: 'What are the consultation fees?',
    answer: 'Consultation fees vary depending on the type and length of appointment. We offer Medicare rebates for the consultations, and work with private health insurers for our procedures. Our reception team can provide specific fee information when booking.'
  },
  {
    category: 'general',
    question: 'Where can I learn more about heart conditions and procedures?',
    answer: 'Our comprehensive Library contains detailed information about heart conditions, procedures, and patient journey maps. You can access educational videos, procedure guides, and step-by-step explanations of what to expect during your care. Visit our Library for in-depth medical information and educational resources.'
  },
  {
    category: 'general',
    question: 'How do I book an appointment?',
    answer: 'You can book an appointment by calling our reception team at (03) 9509 5009. We have locations at Malvern, Pakenham, and Clyde. Our team will help you choose the most convenient location and time slot that suits your needs.'
  },
  {
    category: 'general',
    question: 'What locations do you have?',
    answer: 'We have three convenient locations: Cabrini Hospital Malvern (our main clinic), Heart Clinic Pakenham, and Casey Medical Centre Clyde. Each location offers different services, and our reception team can advise which location is best for your specific needs.'
  },
  {
    category: 'general',
    question: 'Do you offer telehealth consultations?',
    answer: 'Yes, we offer telehealth consultations for suitable cases. This is particularly useful for follow-up appointments, medication reviews, and certain consultations. Please discuss with our reception team when booking to determine if telehealth is appropriate for your appointment.'
  }
];
