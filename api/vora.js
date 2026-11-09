import { voraStore } from '../server/voraKnowledgeStore.js';

export default async function handler(req, res) {
  const { path } = req.query;
  const action = req.url.split('?')[0].replace('/api/vora/', '').replace('/api/vora', '');

  try {
    if (action === 'chat' && req.method === 'POST') {
      const { message } = req.body || {};
      const result = voraStore.answerQuery(message);
      return res.status(200).json({
        success: true,
        reply: result.reply,
        sources: result.sources,
        metadata: voraStore.getMetadata()
      });
    }

    if (action === 'knowledge' || action === '') {
      return res.status(200).json({
        success: true,
        metadata: voraStore.getMetadata(),
        pagesCount: voraStore.getPages().length,
        activeCareersCount: voraStore.getCareers({ status: 'Active' }).length,
        pages: voraStore.getPages().map(p => ({ id: p.id, title: p.title, url: p.url, category: p.category })),
        activeCareers: voraStore.getCareers({ status: 'Active' })
      });
    }

    if (action.startsWith('careers')) {
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
    }

    if (action === 'sync') {
      const result = voraStore.syncAll();
      return res.status(200).json(result);
    }

    return res.status(200).json({
      success: true,
      metadata: voraStore.getMetadata()
    });
  } catch (error) {
    console.error('Vora Serverless Handler Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

