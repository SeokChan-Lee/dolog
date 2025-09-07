import Chip from "./Chip";

export default function Skill() {
  return (
    <>
      <section className="flex gap-2 mb-2">
        <Chip>React</Chip>
        <Chip>Next.js</Chip>
        <Chip>TypeScript</Chip>
        <Chip>JavaScript</Chip>
        <Chip>HTML</Chip>
        <Chip>CSS</Chip>
      </section>
      <section className="flex gap-2">
        <Chip>Tailwind CSS</Chip>
        <Chip>Styled ComponentsReact</Chip>
      </section>
    </>
  );
}
