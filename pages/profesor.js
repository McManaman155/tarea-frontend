import { useEffect, useState } from "react";

export default function Profesor() {
  const [submissions, setSubmissions] = useState([]);
  const [filter, setFilter] = useState("Todas");

  useEffect(() => {
    async function fetchSubmissions() {
      const response = await fetch("https://tarea-backend-production.up.railway.app/submissions");
      const data = await response.json();
      setSubmissions(
        data.map((item) => ({
          ...item,
          status: item.status || "Pendiente",
          comment: item.comment || "",
        }))
      );
    }
    fetchSubmissions();
  }, []);

  const handleStatusChange = (index, newStatus) => {
    const updated = [...submissions];
    updated[index].status = newStatus;
    setSubmissions(updated);
  };

  const handleCommentChange = (index, newComment) => {
    const updated = [...submissions];
    updated[index].comment = newComment;
    setSubmissions(updated);
  };

  const handleSave = async () => {
    await fetch("https://tarea-backend-production.up.railway.app/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissions),
    });
    alert("✅ Cambios guardados correctamente");
  };

  const filteredSubmissions = submissions.filter(submission => {
    if (filter === "Todas") return true;
    return submission.status === filter;
  });

  const downloadCSV = () => {
    const csvRows = [
      ["Alumno", "Texto", "Fecha", "Estado", "Comentario"],
      ...submissions.map(sub => [
        `"${sub.name}"`,
        `"${sub.text.replace(/"/g, '""')}"`,
        `"${new Date(sub.date).toLocaleString()}"`,
        `"${sub.status}"`,
        `"${sub.comment.replace(/"/g, '""')}"`
      ])
    ];

    const csvContent = csvRows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "entregas.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 rounded-2xl shadow-xl bg-white">
      <h1 className="text-3xl font-bold mb-6">📚 Entregas de los alumnos</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded p-2"
        >
          <option value="Todas">Mostrar todas</option>
          <option value="Pendiente">Solo pendientes</option>
          <option value="Revisado">Solo revisados</option>
        </select>

        <button
          onClick={downloadCSV}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          📥 Descargar CSV
        </button>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
        >
          💾 Guardar cambios
        </button>
      </div>

      {filteredSubmissions.length === 0 ? (
        <p className="text-gray-600">No hay entregas para mostrar.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Alumno</th>
              <th className="border border-gray-300 px-4 py-2">Texto</th>
              <th className="border border-gray-300 px-4 py-2">Fecha</th>
              <th className="border border-gray-300 px-4 py-2">Estado</th>
              <th className="border border-gray-300 px-4 py-2">Comentario</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubmissions.map((submission, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{submission.name}</td>
                <td className="border border-gray-300 px-4 py-2">{submission.text}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(submission.date).toLocaleString()}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <select
                    value={submission.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Revisado">Revisado</option>
                  </select>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    className="w-full border rounded p-1"
                    placeholder="Escribe tu comentario..."
                    value={submission.comment}
                    onChange={(e) => handleCommentChange(index, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
