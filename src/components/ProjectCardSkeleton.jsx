/** Esqueleto com o mesmo esqueleto de layout do ProjectCard. */
function ProjectCardSkeleton({ destaque = false, className = "" }) {
  const bloco = "animate-pulse rounded-full bg-white/[0.06]";

  return (
    <div
      aria-hidden="true"
      className={`flex flex-col rounded-3xl border border-hairline bg-surface/50 p-6 ${
        destaque ? "sm:p-8" : ""
      } ${className}`}
    >
      <div
        className={`animate-pulse rounded-2xl bg-white/[0.045] ${
          destaque ? "h-44 lg:h-52" : "h-28 sm:h-32"
        }`}
      />
      <div className="mt-5 space-y-3">
        <div className={`${bloco} h-2.5 w-24`} />
        <div className={`${bloco} h-6 ${destaque ? "w-3/5" : "w-2/5"}`} />
        <div className={`${bloco} h-3 w-full`} />
        <div className={`${bloco} h-3 w-4/5`} />
      </div>
      <div className="mt-6 flex gap-1.5">
        <div className={`${bloco} h-6 w-16`} />
        <div className={`${bloco} h-6 w-20`} />
        <div className={`${bloco} h-6 w-14`} />
      </div>
    </div>
  );
}

export default ProjectCardSkeleton;
