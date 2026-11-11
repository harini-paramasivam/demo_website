import { voraStore } from '../../server/voraKnowledgeStore.js';

export default function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { status, type, query } = req.query || {};
      return res.status(200).json({
        success: true,
        careers: voraStore.getCareers({ status, type, query })
      });
    }
    if (req.method === 'POST') {
      const record = voraStore.addCareer(req.body || {});
      return res.status(201).json({ success: true, career: record });
    }
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  } catch (error) {
    console.error('Vora Careers Handler Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
