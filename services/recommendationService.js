
import axios from "axios";
import { OpenAI } from "openai";
import { getPlacesNearby } from "./palcesService.js";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const getSmartRecommendations = async (lat, lng) => {
    // 1. Get weather
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${process.env.WEATHER_API_KEY}`;
    const weatherRes = await axios.get(weatherUrl);
    const weatherData = weatherRes.data;

    const temperature = weatherData.main.temp;
    const weatherDesc = weatherData.weather[0].main;

    // 2. Get nearby places
    const radius = 20; // Default radius in km
    const nearby_places = await getPlacesNearby(lat, lng, radius);
    console.log("Nearby places:", nearby_places);


    // 3. Generate recommendation with AI
    const prompt = `Current location: (${lat}, ${lng}). The weather is currently: ${weatherDesc}, with a temperature of ${temperature}°C. Nearby places: ${nearby_places.map((p, i) => `${i + 1}. ${p.name} - ${p.type}`).join("\n")}

Recommend 3 suitable places for the user to visit right now based on the current weather and location, and explain the reason for each suggestion , make your message short and friendly send respond in json form.
`;

    const aiResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
    });

    const recommendation = aiResponse.choices[0].message.content;

    return {
        lat,
        lng,
        temperature,
        weather: weatherDesc,
        nearby_places,
        recommendation,
    };
};