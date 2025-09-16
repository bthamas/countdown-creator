import { Link } from "react-router-dom";
import { countdownSchemes } from "@/data/schemes";
import { SchemeCard } from "@/components/SchemeCard";
import { Button } from "@/components/ui/button";
import { Plus, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="w-12 h-12 text-white" />
              <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
                Countdown Creator
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Készíts gyönyörű visszaszámlálókat különleges eseményeidhez. 
              Testreszabható, megosztható és teljesen ingyenes.
            </p>
            <div className="pt-6">
              <Button
                asChild
                variant="glass"
                size="lg"
                className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 hover:scale-105 px-8 py-4 text-lg font-semibold"
              >
                <Link to="/create">
                  <Plus className="w-6 h-6 mr-2" />
                  Új visszaszámláló létrehozása
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Schemes Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">
            Válassz a kész sémák közül
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Minden eseményhez tökéletes sémákat készítettünk. 
            Kattints egyre és kezdj el dolgozni vele!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 animate-scale-in">
          {countdownSchemes.map((scheme, index) => (
            <div
              key={scheme.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link to="/create" state={{ preselectedScheme: scheme.id }}>
                <SchemeCard
                  scheme={scheme}
                  onSelect={() => {}}
                />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            variant="hero"
            size="lg"
          >
            <Link to="/create">
              <Plus className="w-5 h-5 mr-2" />
              Kezdjük el!
            </Link>
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-background-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 glass-card p-6 hover-lift">
              <div className="w-12 h-12 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Valós idejű</h3>
              <p className="text-muted-foreground">
                Minden másodpercben frissül, hogy pontosan tudd, mennyi idő van hátra.
              </p>
            </div>

            <div className="text-center space-y-4 glass-card p-6 hover-lift">
              <div className="w-12 h-12 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Testreszabható</h3>
              <p className="text-muted-foreground">
                Saját képeket tölthetsz fel vagy választhatsz a kész sémák közül.
              </p>
            </div>

            <div className="text-center space-y-4 glass-card p-6 hover-lift">
              <div className="w-12 h-12 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                <div className="w-6 h-6 text-white">🔗</div>
              </div>
              <h3 className="text-xl font-semibold">Megosztható</h3>
              <p className="text-muted-foreground">
                Egyedi link segítségével bárki megtekintheti a visszaszámlálót.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}