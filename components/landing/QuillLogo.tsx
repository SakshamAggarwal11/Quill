export default function QuillLogo() {
  return (
    <div className="relative h-11 w-11">
      <div className="absolute inset-0 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm" />
      <div className="absolute left-2.5 top-2.5 h-6 w-6 rounded-full border-2 border-cyan-300/80" />
      <div className="absolute right-1.5 top-2 h-7 w-3 rotate-[28deg] rounded-t-full rounded-b-[3px] bg-gradient-to-b from-violet-300 to-cyan-300" />
      <div className="absolute right-2 top-8 h-0 w-0 border-l-[5px] border-r-[5px] border-t-[8px] border-l-transparent border-r-transparent border-t-cyan-200" />
    </div>
  );
}
