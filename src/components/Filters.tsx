import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface FiltersProps {
  selectedArea: string;
  selectedCity: string;
  selectedTech: string;
  onAreaChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onTechChange: (value: string) => void;
}

export const Filters = ({
  selectedArea,
  selectedCity,
  selectedTech,
  onAreaChange,
  onCityChange,
  onTechChange,
}: FiltersProps) => {
  const areas = ["Todas", "Tecnologia", "Design", "Marketing", "Gestão", "Recursos Humanos", "Finanças", "Comercial", "Jurídico"];
  const cities = ["Todas", "São Paulo", "Rio de Janeiro", "Belo Horizonte", "Porto Alegre", "Curitiba", "Florianópolis", "Brasília", "Campinas", "Fortaleza", "Recife"];
  const techs = [
    "Todas",
    "React",
    "Node.js",
    "Python",
    "TypeScript",
    "JavaScript",
    "Java",
    "AWS",
    "Docker",
    "Kubernetes",
    "SQL",
    "PostgreSQL",
    "MongoDB",
    "Figma",
    "Adobe XD",
    "Unity",
    "Swift",
    "Kotlin",
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 ">
      <div className="space-y-2 ">
        <Label htmlFor="area-select">Área</Label>
        <Select value={selectedArea} onValueChange={onAreaChange}>
          <SelectTrigger id="area-select">
            <SelectValue placeholder="Selecione uma área" />
          </SelectTrigger>
          <SelectContent>
            {areas.map((area) => (
              <SelectItem key={area} value={area}>
                {area}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="city-select">Cidade</Label>
        <Select value={selectedCity} onValueChange={onCityChange}>
          <SelectTrigger id="city-select">
            <SelectValue placeholder="Selecione uma cidade" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 ">
        <Label htmlFor="tech-select ">Tecnologia</Label>
        <Select value={selectedTech} onValueChange={onTechChange}>
          <SelectTrigger id="tech-select">
            <SelectValue placeholder="Selecione uma tecnologia" />
          </SelectTrigger>
          <SelectContent>
            {techs.map((tech) => (
              <SelectItem key={tech} value={tech}>
                {tech}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
