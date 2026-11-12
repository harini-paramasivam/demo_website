import { voraStore } from '../../server/voraKnowledgeStore.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const { message, history } = req.body || {};
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, error: 'Message is required.' });
    }

    const result = await voraStore.answerQuery(message, history || []);
    return res.status(200).json({
      success: true,
      reply: result.reply,
      sources: result.sources || [],
      metadata: voraStore.getMetadata()
    });
  } catch (error) {
    console.error('Vora Chat Serverless Handler Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

