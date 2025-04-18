import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, text } = req.body;

      if (!name || !text) {
        return res.status(400).json({ error: 'Faltan datos en la entrega' });
      }

      const submissionsPath = path.join(process.cwd(), 'submissions.json');
      let submissions = [];

      if (fs.existsSync(submissionsPath)) {
        const fileData = fs.readFileSync(submissionsPath);
        submissions = JSON.parse(fileData);
      }

      submissions.push({
        name,
        text,
        date: new Date().toISOString(),
        status: "Pendiente",
        comment: ""
      });

      fs.writeFileSync(submissionsPath, JSON.stringify(submissions, null, 2));

      return res.status(200).json({ message: 'Entrega recibida correctamente' });

    } catch (error) {
      console.error('💥 Error en /api/submit:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}


