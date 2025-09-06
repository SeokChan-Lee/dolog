interface ExperienceProps {
  company: string;
  position: string;
  period: string;
  task?: string;
}

export default function Experience({
  company,
  position,
  period,
  task,
}: ExperienceProps) {
  return (
    <div>
      <h2 className="font-semibold text-xl">{company}</h2>
      <div className="mb-4">
        <p className="text-sm text-[#808fa9]">{position}</p>
        <p className="text-sm text-[#808fa9]">{period}</p>
      </div>
      <p className="text-[#808fa9]">{task}</p>
    </div>
  );
}
