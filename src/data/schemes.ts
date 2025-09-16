import { CountdownScheme } from "@/types/countdown";

export const countdownSchemes: CountdownScheme[] = [
  {
    id: "newyear",
    name: "Új év",
    icon: "🎆",
    primaryColor: "hsl(var(--newyear-primary))",
    secondaryColor: "hsl(var(--newyear-secondary))",
    gradient: "linear-gradient(135deg, hsl(var(--newyear-primary)), hsl(var(--newyear-secondary)))"
  },
  {
    id: "wedding",
    name: "Esküvő",
    icon: "💍",
    primaryColor: "hsl(var(--wedding-primary))",
    secondaryColor: "hsl(var(--wedding-secondary))",
    gradient: "linear-gradient(135deg, hsl(var(--wedding-primary)), hsl(var(--wedding-secondary)))"
  },
  {
    id: "baby",
    name: "Baba születés",
    icon: "👶",
    primaryColor: "hsl(var(--baby-primary))",
    secondaryColor: "hsl(var(--baby-secondary))",
    gradient: "linear-gradient(135deg, hsl(var(--baby-primary)), hsl(var(--baby-secondary)))"
  },
  {
    id: "birthday",
    name: "Születésnap",
    icon: "🎂",
    primaryColor: "hsl(var(--birthday-primary))",
    secondaryColor: "hsl(var(--birthday-secondary))",
    gradient: "linear-gradient(135deg, hsl(var(--birthday-primary)), hsl(var(--birthday-secondary)))"
  },
  {
    id: "graduation",
    name: "Diploma/Érettségi",
    icon: "🎓",
    primaryColor: "hsl(var(--graduation-primary))",
    secondaryColor: "hsl(var(--graduation-secondary))",
    gradient: "linear-gradient(135deg, hsl(var(--graduation-primary)), hsl(var(--graduation-secondary)))"
  },
  {
    id: "travel",
    name: "Nyaralás/Utazás",
    icon: "✈️",
    primaryColor: "hsl(var(--travel-primary))",
    secondaryColor: "hsl(var(--travel-secondary))",
    gradient: "linear-gradient(135deg, hsl(var(--travel-primary)), hsl(var(--travel-secondary)))"
  },
  {
    id: "christmas",
    name: "Karácsony",
    icon: "🎄",
    primaryColor: "hsl(var(--christmas-primary))",
    secondaryColor: "hsl(var(--christmas-secondary))",
    gradient: "linear-gradient(135deg, hsl(var(--christmas-primary)), hsl(var(--christmas-secondary)))"
  },
  {
    id: "valentine",
    name: "Valentin-nap",
    icon: "❤️",
    primaryColor: "hsl(var(--valentine-primary))",
    secondaryColor: "hsl(var(--valentine-secondary))",
    gradient: "linear-gradient(135deg, hsl(var(--valentine-primary)), hsl(var(--valentine-secondary)))"
  },
  {
    id: "retirement",
    name: "Nyugdíjba vonulás",
    icon: "☀️",
    primaryColor: "hsl(var(--retirement-primary))",
    secondaryColor: "hsl(var(--retirement-secondary))",
    gradient: "linear-gradient(135deg, hsl(var(--retirement-primary)), hsl(var(--retirement-secondary)))"
  },
  {
    id: "work",
    name: "Első munkahely",
    icon: "💼",
    primaryColor: "hsl(var(--work-primary))",
    secondaryColor: "hsl(var(--work-secondary))",
    gradient: "linear-gradient(135deg, hsl(var(--work-primary)), hsl(var(--work-secondary)))"
  }
];