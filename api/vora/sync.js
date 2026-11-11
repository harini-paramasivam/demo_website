import { voraStore } from '../../server/voraKnowledgeStore.js';

export default async function handler(req, res) {
  try {
    const result = await voraStore.syncAll(true);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Vora Sync Handler Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
