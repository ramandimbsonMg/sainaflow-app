import { modules } from "./modules-data";

export function ModulesSection() {
  return (
    <section id="modules" className="scroll-mt-20 bg-[#fafaff] py-20">
      <div className="mx-auto w-full max-w-[1280px] px-6">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#e0e7ff] bg-white px-3.5 py-1 text-xs font-semibold text-[#4F46E5]">
            Les modules
          </div>
          <h2 className="mb-3 text-3xl font-extrabold tracking-[-0.02em] text-gray-900 lg:text-4xl">
            Tout ce qu&apos;il faut pour{" "}
            <span className="text-[#4F46E5]">piloter</span>
          </h2>
          <p className="text-[15px] text-gray-500">
            Huit modules integres qui couvrent l&apos;ensemble des besoins d&apos;une
            agence digitale, accessibles depuis un seul tableau de bord.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((m) => (
            <div
              key={m.title}
              className="group rounded-[16px] border border-[#f0f0f0] bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#c7d2fe] hover:shadow-[0_12px_30px_rgba(79,70,229,0.12)]"
            >
              <div
                className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${m.color}`}
              >
                <m.icon size={20} className={m.textColor} />
              </div>
              <div className="mb-1.5 text-[15px] font-bold text-gray-900">
                {m.title}
              </div>
              <p className="text-xs leading-[1.6] text-gray-500">
                {m.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
