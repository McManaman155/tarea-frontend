import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Método ${req.method} no permitido` });
  }

  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('💥 Error al obtener entregas de Supabase:', error);
    return res.status(500).json({ error: 'Error al obtener entregas', details: error.message });
  }

  return res.status(200).json(data);
}




