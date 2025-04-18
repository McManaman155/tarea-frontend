import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const submissionsPath = path.join(process.cwd(), 'submissions.json');

      if (fs.existsSync(submissionsPath)) {
        const fileData = fs.readFileSync(submissionsPath);
        const submissions = JSON.parse(fileData);
        return res.status(200).json(submissions);
      } else {
        return res.status(200).json([]);
      }
    } catch (error) {
      console.error('💥 Error en /api/submissions:', error);
      return res.status(500).json({ error: 'Error al leer entregas' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}



