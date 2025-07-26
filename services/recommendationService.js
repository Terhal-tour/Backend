import axios from "axios";
import { OpenAI } from "openai";
import { getPlacesNearby } from "./palcesService.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getSmartRecommendations = async (lat, lng, lang = "ar") => {
  // 1. Get weather
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${process.env.WEATHER_API_KEY}`;
  const weatherRes = await axios.get(weatherUrl);
  const weatherData = weatherRes.data;

  const temperature = weatherData.main.temp;
  const weatherDesc = weatherData.weather[0].main;

  // 2. Get nearby places
  const radius = 20;
  let nearby_places = await getPlacesNearby(lat, lng, radius);

  // ✅ 3. Translate places if lang is Arabic
  if (lang === "ar") {
    nearby_places = nearby_places.map((p) => ({
      name: typeof p.name === "object" ? p.name.ar : p.name,
      type: typeof p.type === "object" ? p.type.ar : p.type,
    }));
  } else {
    nearby_places = nearby_places.map((p) => ({
      name: typeof p.name === "object" ? p.name.en : p.name,
      type: typeof p.type === "object" ? p.type.en : p.type,
    }));
  }

  // 4. Create prompt
  const prompt = `
الموقع الحالي: (${lat}, ${lng}).
الطقس الآن: ${weatherDesc}، ودرجة الحرارة: ${temperature}°C.
الأماكن القريبة:
${nearby_places.map((p, i) => `${i + 1}. ${p.name} - ${p.type}`).join("\n")}

رشّح للمستخدم 3 أماكن مناسبة لزيارتها الآن، بناءً على الطقس الحالي والموقع الجغرافي.
فسّر سبب اختيار كل مكان.
أجب بصيغة JSON فقط بهذا الشكل:

[
  {
    "place": "اسم المكان",
    "reason": "سبب التوصية"
  }
]
يجب أن تكون الإجابة باللغة: ${lang === "ar" ? "العربية" : "الإنجليزية"} فقط.
`;

  const aiResponse = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  let recommendation = aiResponse.choices[0].message.content;

  try {
    recommendation = JSON.parse(recommendation);
  } catch (err) {
    console.warn("GPT didn't return proper JSON. Returning raw content.");
  }

  return {
    lat,
    lng,
    temperature,
    weather: weatherDesc,
    nearby_places,
    recommendation,
  };
};
