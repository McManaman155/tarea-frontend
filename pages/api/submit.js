import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Método ${req.method} no permitido` });
  }

  const { name, course, group, text } = req.body;

  console.log('📥 Datos recibidos:', { name, course, group, text });

  if (!name || !course || !group || !text) {
    console.log('❌ Faltan campos en el body');
    return res.status(400).json({ error: 'Faltan datos: nombre, curso, grupo o texto' });
  }

  const { data, error } = await supabase
    .from('submissions')
    .insert([
      {
        name: name,
        course: course,
        group: group,
        text: text,
        date: new Date().toISOString(),
        status: 'Pendiente',
        comment: ''
      }
    ]);

  if (error) {
    console.error('💥 Error al insertar:', error);
    return res.status(500).json({ error: 'Error al guardar en la base de datos', details: error.message });
  }

  console.log('✅ Inserción correcta en Supabase:', data);

  return res.status(200).json({ message: 'Entrega recibida correctamente', data });
}







