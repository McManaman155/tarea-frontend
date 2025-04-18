import { useState, useEffect } from "react";

export default function Profesor() {
  const [passwordInput, setPasswordInput] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/submissions');
      const data = await res.json();
      setSubmissions(data);
    } catch (error) {
      console.error('Error al cargar entregas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    if (passwordInput === "profesorCREAL") {
      setAccessGranted(true);
    } else {
      alert("❌ Contraseña incorrecta");
    }
  };

  useEffect(() => {
    if (accessGranted) {
      fetchSubmissions();
    }
  }, [accessGranted]);

  const handleSave = async () => {
    try {
      await fetch('/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissions)
      });
      alert('✅ Cambios guardados correctamente');
    } catch (error) {
      console.error('Error al guardar cambios:', error);
      alert('❌ Error al guardar cambios');
    }
  };

  const handleDownloadCSV = () => {
    if (submissions.length === 0) {
      alert("⚠️ No hay entregas para exportar.");
      return;
    }

    const headers = ['Nombre', 'Curso', 'Grupo', 'Redacción', 'Comentario', 'Estado'];
    const rows = submissions.map(submission => [
      submission.name,
      submission.course,
      submission.group,
      submission.text,
      submission.comment || '',
      submission.status
    ]);

    let csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(x => `"${(x || '').replace(/"/g, '""')}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'entregas_alumnos.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!accessGranted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md text-center">
          <h1 className="text-3xl font-bold mb-6">🔒 Área de Profesor</h1>
          <input
            type="password"
            placeholder="Introduce la contraseña"
            className="p-3 border border-gray-300 rounded-xl w-full"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl w-full"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-3xl shadow-2xl w-full max-w-7xl">
        <h1 className="text-3xl font-bold mb-8 text-center">📚 Revisión de entregas</h1>

        {loading ? (
          <div className="text-center text-gray-500">Cargando entregas...</div>
        ) : submissions.length === 0 ? (
          <div className="text-center text-gray-500">No hay entregas todavía.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Nombre</th>
                  <th className="p-2">Curso</th>
                  <th className="p-2">Grupo</th>
                  <th className="p-2">Redacción</th>
                  <th className="p-2">Comentario</th>
                  <th className="p-2">Estado</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission, index) => (
                  <tr key={submission.id || index} className="border-b">
                    <td className="p-2">{submission.name}</td>
                    <td className="p-2">{submission.course}</td>
                    <td className="p-2">{submission.group}</td>
                    <td className="p-2">{submission.text}</td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={submission.comment || ''}
                        onChange={(e) => {
                          const updated = [...submissions];
                          updated[index].comment = e.target.value;
                          setSubmissions(updated);
                        }}
                        className="p-1 border rounded"
                      />
                    </td>
                    <td className="p-2">
                      <select
                        value={submission.status}
                        onChange={(e) => {
                          const updated = [...submissions];
                          updated[index].status = e.target.value;
                          setSubmissions(updated);
                        }}
                        className="p-1 border rounded"
                      >
                        <option>Pendiente</option>
                        <option>Revisado</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl"
          >
            💾 Guardar cambios
          </button>

          <button
            onClick={handleDownloadCSV}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl"
          >
            📥 Descargar CSV
          </button>
        </div>
      </div>
    </div>
  );
}


