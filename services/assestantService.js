import OpenAI from 'openai';
import dotenv from 'dotenv';
import Place from '../models/Place.js';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// دالة لاكتشاف اللغة
const detectLanguage = async (text) => {
  const res = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          'Detect the language of the following text. Respond only with the language name in English (e.g., "Arabic", "English", etc.).',
      },
      { role: 'user', content: text },
    ],
    temperature: 0,
    max_tokens: 10,
  });

  return res.choices[0]?.message?.content.trim().toLowerCase();
};

export const getReply = async (userMessage) => {
  try {
    const userLanguage = await detectLanguage(userMessage);

    const relevanceCheck = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an assistant that decides if a user message is relevant to travel planning.
If the message clearly asks about places, locations, tours, or trip planning, respond only with "VALID".
If the message is a joke, greeting, random comment, or not related to travel/tourism, respond only with "INVALID" and translate your response to the user's language.
Make the priority for the user's mentioned location; if there are no exact matches, recommend other places in the same city or area.`,
        },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.2,
      max_tokens: 10,
    });

    const checkResponse = relevanceCheck.choices[0]?.message?.content.trim();

    if (checkResponse !== 'VALID') {
      return JSON.stringify({
        error:
          userLanguage === 'arabic'
            ? 'مرحبًا، أنا ترحال. اسألني أي شيء عن تخطيط السفر.'
            : 'Hi, I am Terhal. Ask me anything about travel planning.',
      });
    }

    // جلب الأماكن من قاعدة البيانات
    const places = await Place.find({}, 'name location category');

    // تحضير نسخة مبسطة من الأماكن بدون ترجمة حالياً
    const simplifiedPlaces = places.map((place) => ({
      name: typeof place.name === 'object' ? place.name.en : place.name,
      location: place.location,
      category: place.category,
    }));

    // الرسالة إلى GPT
    const messages = [
      {
        role: 'system',
        //         content: `
        // You are a helpful assistant in a travel planning app.
        // Always respond ONLY with valid JSON in this format:

        // [
        //   {
        //     "day": "اليوم الأول",
        //     "places": ["قلعة صلاح الدين", "المتحف المصري"]
        //   },
        //   ...
        // ]

        // Your task:
        // - Respond in **Arabic** regardless of user input.
        // - Translate ALL place names from English to Arabic.
        // - Use ONLY places from the following list:
        // ${JSON.stringify(simplifiedPlaces)}

        // Filter places by:
        // 1. Location mentioned by the user
        // 2. Category (e.g., "museum", "adventure", "history")

        // Only output the JSON itinerary. No explanation, no comments.
        //         `,
        content: `
You are a helpful assistant in a travel planning app.

Respond ONLY with valid JSON in the following format:
[
  {
    "day": "Day 1" or "اليوم الأول",
    "places": ["Place Name 1", "Place Name 2"]
  },
  ...
]

Instructions:
- If the user input was in Arabic, respond entirely in Arabic. If it was in English, respond entirely in English.
- Use ONLY the following list of places (stored in English):
${JSON.stringify(simplifiedPlaces)}

- For Arabic input:
  - Translate place names to Arabic.
  - Write day labels as "اليوم الأول", "اليوم الثاني", etc.
- For English input:
  - Keep place names in English.
  - Write day labels as "Day 1", "Day 2", etc.

Filter places based on:
1. The location mentioned by the user.
2. The category (e.g., "museum", "adventure", "history").

Only return the JSON itinerary. No explanations. No additional text.
`

      },
      { role: 'user', content: userMessage },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 2000,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content;
  } catch (error) {
    console.error('Chat error:', error);
    throw new Error('Failed to generate assistant reply');
  }
};
