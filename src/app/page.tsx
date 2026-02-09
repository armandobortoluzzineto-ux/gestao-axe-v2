export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <main className="max-w-4xl text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-slate-900 md:text-7xl">
          Gestão Axé 2.0
        </h1>
        <p className="text-2xl font-medium text-slate-600 md:text-3xl">
          Em Construção
        </p>
        <div className="mt-12 rounded-2xl bg-white/80 p-8 shadow-2xl backdrop-blur-sm">
          <p className="text-lg text-slate-700">
            Sistema de gestão para comunidades religiosas – em breve uma
            experiência completa e moderna.
          </p>
          <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-2/3 animate-pulse bg-slate-400"></div>
          </div>
        </div>
      </main>
      <footer className="absolute bottom-8 text-sm text-slate-500">
        <p>Próxima atualização: Março 2026</p>
      </footer>
    </div>
  );
}
