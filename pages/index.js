import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const goToEntrega = () => {
    router.push('/entregar');
  };

  const goToProfesor = () => {
    router.push('/profesor');
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
          <button
            onClick={goToProfesor}
            className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-xl font-semibold rounded-xl transition"
          >
            👨‍🏫 Área del profesor
          </button>
        </div>
      </div>
    </div>
  );
}
