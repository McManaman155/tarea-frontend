import { useState } from "react";

export default function Home() {
  const [studentName, setStudentName] = useState('');
  const [submittedText, setSubmittedText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (studentName.trim() && submittedText.trim()) {
      await fetch('https://tarea-backend-production.up.railway.app/submit', {
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
    } else {
      alert("Por favor, escribe tu nombre y tu redacción antes de enviar.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 rounded-2xl shadow-xl bg-white">
      <h1 className="text-2xl font-bold mb-4">
        📝 Tarea: Escribe un texto sobre el cambio climático
      </h1>
      {!isSubmitted ? (
        <div>
          <input
            type="text"
            placeholder="Tu nombre o correo"
            className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
          <textarea
            placeholder="Escribe aquí tu redacción..."
            className="w-full min-h-[200px] p-2 border border-gray-300 rounded-lg"
            value={submittedText}
            onChange={(e) => setSubmittedText(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            Entregar
          </button>
        </div>
      ) : (
        <div className="text-green-600 font-semibold">
          ✅ ¡Tarea entregada correctamente!
        </div>
      )}
    </div>
  );
}
