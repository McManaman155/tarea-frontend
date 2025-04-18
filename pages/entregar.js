import { useState } from "react";

export default function Entregar() {
  const [studentName, setStudentName] = useState('');
  const [submittedText, setSubmittedText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (studentName.trim() && submittedText.trim()) {
      try {
        await fetch('/api/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: studentName,
            text: submittedText
          })
        });
        setIsSubmitted(true);
      } catch (error) {
        console.error("Error al enviar la tarea:", error);
        alert("❌ Hubo un error al enviar la tarea. Inténtalo de nuevo.");
      }
    } else {
      alert("⚠️ Por favor, escribe tu nombre y tu redacción antes de enviar.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-8">📝 Entrega de tarea</h1>

        {!isSubmitted ? (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Tu nombre o correo"
              className="p-3 border border-gray-300 rounded-xl"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
            <textarea
              placeholder="Escribe aquí tu tarea..."
              className="p-3 border border-gray-300 rounded-xl"
              style={{ minHeight: "800px", width: "400px" }}
              value={submittedText}
              onChange={(e) => setSubmittedText(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl"
            >
              📤 Entregar tarea
            </button>
          </div>
        ) : (
          <div className="text-green-600 text-2xl font-bold">
            ✅ ¡Tarea entregada correctamente!
          </div>
        )}
      </div>
    </div>
  );
}


