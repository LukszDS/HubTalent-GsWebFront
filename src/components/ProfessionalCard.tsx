import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, Star } from "lucide-react";
import { Professional } from "@/app/types/professional";

interface ProfessionalCardProps {
  professional: Professional;
  onClick: () => void;
  isRecommended?: boolean;
}

export const ProfessionalCard = ({ professional, onClick, isRecommended }: ProfessionalCardProps) => {
  return (
    <Card
      className={`group cursor-pointer transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 border border-gray-200 dark:border-black hover:text-accent-foreground dark:hover:ring-2 dark:hover:ring-blue-400 ${
        isRecommended ? 'ring-2 ring-primary shadow-card-hover' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="relative">
            <img
              src={professional.photo}
              alt={professional.name}
              className="h-24 w-24 rounded-full border-4 border-gray-200 shadow-sm dark:border-black dark:shadow-none transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-accent border-2 border-background"></div>
            {isRecommended && (
              <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-primary border-2 border-background flex items-center justify-center">
                <Star className="h-4 w-4 text-primary-foreground fill-primary-foreground" />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-card-foreground">
              {professional.name}
            </h3>
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <Briefcase className="h-4 w-4" />
              <span>{professional.position}</span>
            </div>
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{professional.city}</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {professional.mainSkills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
