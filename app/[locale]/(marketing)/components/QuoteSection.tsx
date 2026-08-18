export function QuoteSection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto w-full max-w-[1280px] px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef2ff] text-[#4F46E5]">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path d="M10 7H8c-1.66 0-3 1.34-3 3v2c0 1.66 1.34 3 3 3h2v-3H9v-2h1V7zm8 0h-2c-1.66 0-3 1.34-3 3v2c0 1.66 1.34 3 3 3h2v-3h-1v-2h1V7z" />
            </svg>
          </div>
          <blockquote className="text-2xl font-bold leading-[1.4] tracking-[-0.01em] text-gray-900 lg:text-[28px]">
            &laquo; Avec SainaFlow, toute l&apos;activite de l&apos;agence est au meme
            endroit : le client, le projet, les emails et les documents. On
            gagne un temps enorme au quotidien. &raquo;
          </blockquote>
          <div className="mt-6">
            <div className="text-sm font-semibold text-gray-900">
              Equipe SainaFlow
            </div>
            <div className="text-xs text-gray-400">
              Plateforme tout-en-un pour agences digitales
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
