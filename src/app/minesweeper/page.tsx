import Minesweeper from "@/components/Minesweeper";

export default function Page() {
  return (
    <main className="min-h-screen grid place-items-center p-6">
      <Minesweeper rows={9} cols={9} mines={15} />
    </main>
  );
}
