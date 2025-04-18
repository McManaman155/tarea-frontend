import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Método ${req.method} no permitido` });
  }

  const { name, curso, grupo, text } = req.body;

  console.log('📥 Datos recibidos en API submit:', { name, curso, grupo, text });

  if (!name || !curso || !grupo || !text) {
    console.log('❌ Faltan campos en el body');
    return res.status(400).json({ error: 'Faltan datos: nombre, curso, grupo o texto' });
  }

  const { data, error } = await supabase
    .from('submissions')
    .insert([
      {
        name: name,
        course: curso,
        group: grupo,
        text: text,
        date: new Date().toISOString(),
        status: 'Pendiente',
        comment: ''
      }
    ]);

  if (error) {
    console.error('💥 Error REAL al insertar en Supabase:', error);
    return res.status(500).json({ error: 'Error al guardar en la base de datos', details: error.message });
  }

  console.log('✅ Inserción correcta en Supabase:', data);

  return res.status(200).json({ message: 'Entrega recibida correctamente', data });
}






