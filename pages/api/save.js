import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const updatedSubmissions = req.body;

      if (!Array.isArray(updatedSubmissions)) {
        return res.status(400).json({ error: 'Formato incorrecto' });
      }

      const submissionsPath = path.join(process.cwd(), 'submissions.json');
      fs.writeFileSync(submissionsPath, JSON.stringify(updatedSubmissions, null, 2));

      return res.status(200).json({ message: 'Cambios guardados correctamente' });

    } catch (error) {
      console.error('💥 Error en /api/save:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}




