// src/openai.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://openrouter.ai/api/v1', // OpenRouter API base
  headers: {
    'Authorization': 'Bearer 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', // ✅ Include 'Bearer' prefix
    'HTTP-Referer': 'http://localhost:3000', // Replace if deploying online
    'Content-Type': 'application/json',
    'X-Title': 'ChatGPT Clone by Karthick' // Optional, but nice
  }
});

export async function sendMsgToOpenAI(message) {
  try {
    const response = await instance.post('/chat/completions', {
      model: 'openai/gpt-3.5-turbo', // Supported by OpenRouter
      messages: [{ role: 'user', content: message }],
      temperature: 0.7
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('❌ OpenRouter API Error:', error.response?.data || error.message);
    return "❌ Error: Could not fetch response from OpenRouter.";
  }
}
