"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { Filters } from "@/components/Filters";
import { ProfessionalCard } from "@/components/ProfessionalCard";
import { ProfessionalModal } from "@/components/ProfessionalModal";
import { ChatBox } from "@/components/ChatBox";
import { Professional } from "@/app/types/professional";
import professionalsData from "@/app/data/professionals.json";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("Todas");
  const [selectedCity, setSelectedCity] = useState("Todas");
  const [selectedTech, setSelectedTech] = useState("Todas");
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [recommendedIds, setRecommendedIds] = useState<Set<number>>(new Set());
  const [chatOpen, setChatOpen] = useState(false);
  const [chatProfessional, setChatProfessional] = useState<Professional | null>(null);

  const professionals = professionalsData as Professional[];

  const filteredProfessionals = useMemo(() => {
    return professionals.filter((professional) => {
      const matchesSearch =
        searchTerm === "" ||
        professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        professional.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        professional.allSkills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesArea = selectedArea === "Todas" || professional.area === selectedArea;
      const matchesCity = selectedCity === "Todas" || professional.city === selectedCity;
      const matchesTech =
        selectedTech === "Todas" ||
        professional.allSkills.some((skill) => skill === selectedTech);

      return matchesSearch && matchesArea && matchesCity && matchesTech;
    });
  }, [professionals, searchTerm, selectedArea, selectedCity, selectedTech]);

  const handleCardClick = (professional: Professional) => {
    setSelectedProfessional(professional);
    setModalOpen(true);
  };

  const handleRecommend = (professionalId: number) => {
    setRecommendedIds(prev => new Set(prev).add(professionalId));
  };

  const handleOpenChat = (professional: Professional) => {
    setChatProfessional(professional);
    setChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <Header />

      
      <main className="w-full max-w-7xl py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-4 py-8 px-0">
          <h1
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-blue-500"
          >
            Encontre os Melhores Talentos
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conecte-se com profissionais qualificados de diversas áreas e tecnologias
          </p>
        </section>

        {/* Search and Filters */}
        <section className="space-y-6">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <Filters
            selectedArea={selectedArea}
            selectedCity={selectedCity}
            selectedTech={selectedTech}
            onAreaChange={setSelectedArea}
            onCityChange={setSelectedCity}
            onTechChange={setSelectedTech}
          />
        </section>

        {/* Results Count */}
        <div className="text-center">
          <p className="text-muted-foreground">
            {filteredProfessionals.length} profissionais encontrados
          </p>
        </div>

        {/* Professionals Grid */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProfessionals.map((professional) => (
            <ProfessionalCard
              key={professional.id}
              professional={professional}
              onClick={() => handleCardClick(professional)}
              isRecommended={recommendedIds.has(professional.id)}
            />
          ))}
        </section>

        {/* No Results */}
        {filteredProfessionals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              Nenhum profissional encontrado com os filtros selecionados.
            </p>
          </div>
        )}
      </main>

      {/* Professional Modal */}
      <ProfessionalModal
        professional={selectedProfessional}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onRecommend={handleRecommend}
        onMessage={handleOpenChat}
      />

      {/* Chat Box */}
      <ChatBox
        professional={chatProfessional}
        open={chatOpen}
        onOpenChange={setChatOpen}
      />
    </div>
  );
};

export default Index;
