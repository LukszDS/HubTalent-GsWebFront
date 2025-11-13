import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Professional } from "@/app/types/professional";
import { MapPin, Briefcase, GraduationCap, Code, Heart, Sparkles, Mail, ThumbsUp } from "lucide-react";
import { toast } from "sonner";

interface ProfessionalModalProps {
  professional: Professional | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRecommend: (professionalId: number) => void;
  onMessage: (professional: Professional) => void;
}

export const ProfessionalModal = ({
  professional,
  open,
  onOpenChange,
  onRecommend,
  onMessage,
}: ProfessionalModalProps) => {
  if (!professional) return null;

  const handleRecommend = () => {
    onRecommend(professional.id);
    toast.success("Recomendação enviada!", {
      description: `Você recomendou ${professional.name}. O profissional foi notificado.`,
    });
    onOpenChange(false);
  };

  const handleMessage = () => {
    onMessage(professional);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Perfil do Profissional</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[calc(90vh-8rem)] pr-4 ">
          <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col items-center space-y-4 text-center sm:flex-row sm:text-left sm:space-y-0 sm:space-x-6">
              <img
                src={professional.photo}
                alt={professional.name}
                className="h-32 w-32 rounded-full shadow-card"
              />
              <div className="flex-1 space-y-2">
                <h2 className="text-2xl font-bold">{professional.name}</h2>
                <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    <span>{professional.position}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{professional.city}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <Badge variant="outline">{professional.area}</Badge>
                </div>
              </div>
            </div>

            <Separator />

            {/* Education */}
            <div className="space-y-3 border-b pb-4 border-gray-500">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-semibold">Formação Acadêmica</h3>
              </div>
              <p className="text-muted-foreground">{professional.education}</p>
            </div>

            <Separator />

            {/* Experience */}
            <div className="space-y-3 border-b pb-4  border-gray-500">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary  text-blue-500" />
                <h3 className="text-lg font-semibold">Experiência</h3>
              </div>
              <p className="text-muted-foreground">{professional.experience}</p>
            </div>

            <Separator />

            {/* Technical Skills */}
            <div className="space-y-3 border-b pb-4  border-gray-500">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary  text-blue-500" />
                <h3 className="text-lg font-semibold">Habilidades Técnicas</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {professional.allSkills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Soft Skills */}
            <div className="space-y-3 border-b pb-4  border-gray-500">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary  text-blue-500" />
                <h3 className="text-lg font-semibold">Soft Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {professional.softSkills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Hobbies */}
            <div className="space-y-3 border-b pb-4  border-gray-500">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary  text-blue-500" />
                <h3 className="text-lg font-semibold">Hobbies & Interesses</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {professional.hobbies.map((hobby) => (
                  <Badge key={hobby} className="bg-accent text-accent-foreground">
                    {hobby}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <Button
                onClick={handleRecommend}
                className="flex-1 gap-2 cursor-pointer"
                variant="default"
              >
                <ThumbsUp className="h-4 w-4" />
                Recomendar profissional
              </Button>
              <Button
                onClick={handleMessage}
                className="flex-1 gap-2 cursor-pointer"
                variant="outline"
              >
                <Mail className="h-4 w-4" />
                Enviar mensagem
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
