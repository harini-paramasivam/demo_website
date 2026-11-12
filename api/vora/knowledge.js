import { voraStore } from '../../server/voraKnowledgeStore.js';

export default function handler(req, res) {
  try {
    return res.status(200).json({
      success: true,
      metadata: voraStore.getMetadata(),
      pagesCount: voraStore.getPages().length,
      activeCareersCount: voraStore.getCareers({ status: 'Active' }).length,
      pages: voraStore.getPages().map(p => ({ id: p.id, title: p.title, url: p.url, category: p.category })),
      activeCareers: voraStore.getCareers({ status: 'Active' })
    });
  } catch (error) {
    console.error('Vora Knowledge Handler Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

