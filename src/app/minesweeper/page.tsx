import Minesweeper from "@/components/Minesweeper";

export default function Page() {
  return (
    <main className="min-h-screen grid place-items-center ">
      <Minesweeper rows={10} cols={10} mines={15} />
    </main>
  );
}
