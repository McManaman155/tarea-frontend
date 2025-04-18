import { useState, useEffect } from "react";

export default function Profesor() {
  const [submissions, setSubmissions] = useState([]);
  const [password, setPassword] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);

  const fetchSubmissions = async () => {
    const res = await fetch('/api/submissions');
    const data = await res.json();
    setSubmissions(data);
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

  const handleLogin = () => {
    if (password === "profesorCREAL") {
      setAccessGranted(true);
    } else {
      alert("❌ Contraseña incorrecta");
    }
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
      <div className="bg-white p-6 rounded-3xl shadow-2xl w-full max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-center">📚 Revisión de entregas</h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Nombre</th>
                <th className="p-2">Redacción</th>
                <th className="p-2">Comentario</th>
                <th className="p-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{submission.name}</td>
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

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl"
          >
            💾 Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}

