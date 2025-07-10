export interface FaqItem {
  question: string;
  answer: string;
}

export interface ProcedureFaq {
  id: string;
  title: string;
  faqs: FaqItem[];
}

export interface FaqData {
  [key: string]: ProcedureFaq;
}

// No longer need procedure title mapping since the JSON file uses procedure slugs as keys directly

interface JsonFaqItem {
  question: string;
  answer: string;
}

interface JsonProcedureData {
  procedure: string;
  faq: JsonFaqItem[];
}

interface JsonFaqDataStructure {
  [key: string]: JsonProcedureData;
}

export async function parseFaqDataFromJson(jsonData: JsonFaqDataStructure): Promise<FaqData> {
  const faqData: FaqData = {};
  
  const procedureKeys = Object.keys(jsonData);
  console.log(`Processing ${procedureKeys.length} procedure(s) from JSON:`, procedureKeys);
  
  procedureKeys.forEach((procedureId, index) => {
    const procedureData = jsonData[procedureId];
    const title = procedureData.procedure;
    
    console.log(`Processing procedure ${index + 1}: "${procedureId}" - "${title}"`);
    console.log(`FAQ items count: ${procedureData.faq.length}`);
    
    // Convert JSON FAQ items to our FaqItem format
    const faqs: FaqItem[] = procedureData.faq.map(item => ({
      question: item.question,
      answer: item.answer
    }));
    
    if (faqs.length > 0) {
      faqData[procedureId] = {
        id: procedureId,
        title: title,
        faqs: faqs
      };
      console.log(`Successfully added ${faqs.length} FAQ items for procedure: ${procedureId}`);
    }
  });
  
  return faqData;
}

// Keep the old function for backwards compatibility, but it's no longer used
export async function parseFaqData(faqText: string): Promise<FaqData> {
  console.warn('parseFaqData is deprecated. Use parseFaqDataFromJson instead.');
  return {};
}

export async function loadFaqData(): Promise<FaqData> {
  try {
    console.log('Loading FAQ data from /procedures_detailfaq_json.txt');
    const response = await fetch('/procedures_detailfaq_json.txt');
    if (!response.ok) {
      throw new Error(`Failed to load FAQ data: ${response.statusText}`);
    }
    const jsonText = await response.text();
    console.log('FAQ JSON loaded, length:', jsonText.length);
    const jsonData = JSON.parse(jsonText);
    const parsedData = await parseFaqDataFromJson(jsonData);
    console.log('Parsed FAQ data:', parsedData);
    console.log('Number of procedures with FAQ data:', Object.keys(parsedData).length);
    return parsedData;
  } catch (error) {
    console.error('Error loading FAQ data:', error);
    return {};
  }
}