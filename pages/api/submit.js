import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Método ${req.method} no permitido` });
  }

  const { name, text } = req.body;

  if (!name || !text) {
    return res.status(400).json({ error: 'Nombre o texto faltan' });
  }

  const { data, error } = await supabase.from('submissions').insert([
    {
      name: name,
      text: text,
      date: new Date().toISOString(),
      status: 'Pendiente',
      comment: ''
    }
  ]);

  if (error) {
    console.error('💥 Error al insertar en Supabase:', error);
    return res.status(500).json({ error: 'Error al guardar la entrega', details: error.message });
  }

  return res.status(200).json({ message: 'Entrega recibida correctamente', data });
}



