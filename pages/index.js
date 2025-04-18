import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const goToEntrega = () => {
    router.push('/entregar');
  };

  const handleProfesorAccess = () => {
    setShowPasswordInput(true);
  };

  const checkPassword = () => {
    if (password === "profesorCREAL") {
      router.push('/profesor');
    } else {
      alert("❌ Contraseña incorrecta");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center">
        <h1 className="text-4xl font-bold mb-8">📚 Plataforma de Entregas - IES Cañada Real</h1>
        <div className="flex flex-col gap-6">
          <button
            onClick={goToEntrega}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded-xl transition"
          >
            📝 Entregar tarea
          </button>

          {!showPasswordInput ? (
            <button
              onClick={handleProfesorAccess}
              className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-xl font-semibold rounded-xl transition"
            >
              👨‍🏫 Área del profesor
            </button>
          ) : (
            <div className="flex flex-col gap-4">
              <input
                type="password"
                placeholder="Introduce contraseña"
                className="p-3 border border-gray-300 rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={checkPassword}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold"
              >
                Entrar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
