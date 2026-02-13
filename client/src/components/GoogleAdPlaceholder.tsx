export function GoogleAdPlaceholder({ variant = "banner" }: { variant?: "banner" | "square" }) {
  const isBanner = variant === "banner";
  
  return (
    <div className={`
      relative overflow-hidden rounded-xl border border-dashed border-border 
      bg-muted/30 flex items-center justify-center text-muted-foreground text-xs font-mono
      transition-colors hover:bg-muted/50
      ${isBanner ? "h-[100px] w-full" : "h-[250px] w-full max-w-sm mx-auto"}
    `}>
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
      <span className="relative z-10 flex flex-col items-center gap-2">
        <span className="px-2 py-1 rounded bg-muted text-[10px] uppercase tracking-wider font-semibold">Advertisement</span>
        [ Google Ad - {isBanner ? "Banner" : "Square"} Area ]
      </span>
    </div>
  );
}
