import { Checkbox } from '@/components/ui/checkbox';
import { useTechnologiesQuery } from '../hooks/useTechnologies';

export const TechOptions = ({
  selectedTech,
  onChange,
}: {
  selectedTech: string[];
  onChange: (techIds: string[]) => void;
}) => {
  const { data: techOptions, isLoading } = useTechnologiesQuery();

  const handleTechChange = (techId: string) => {
    console.log('selectedTech', selectedTech);
    onChange(
      selectedTech.includes(techId)
        ? selectedTech.filter((id) => id !== techId)
        : [...selectedTech, techId],
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {techOptions?.data?.map((tech) => (
        <div
          key={tech.id}
          className={`flex items-start space-x-3 rounded-lg border p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 ${
            selectedTech.includes(tech.id)
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30'
              : ''
          }`}
        >
          <Checkbox
            id={`tech-${tech.id}`}
            checked={selectedTech.includes(tech.name)}
            onCheckedChange={() => handleTechChange(tech.name)}
          />
          <div className="space-y-1">
            <label
              htmlFor={`tech-${tech.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {tech.name}
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {tech.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
