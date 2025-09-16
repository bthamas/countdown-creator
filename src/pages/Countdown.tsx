import { useEffect, useState } from "react";
import { useSearchParams, Link, useParams } from "react-router-dom";
import { CountdownDisplay } from "@/components/CountdownDisplay";
import { countdownSchemes } from "@/data/schemes";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { CountdownScheme } from "@/types/countdown";
import { useCountdown } from "@/hooks/useCountdown";

export default function CountdownPage() {
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const { getCountdown } = useCountdown();
  const [eventName, setEventName] = useState("");
  const [targetDate, setTargetDate] = useState<Date>(new Date());
  const [scheme, setScheme] = useState<CountdownScheme | null>(null);
  const [customBackground, setCustomBackground] = useState<string>();
  const [customColor, setCustomColor] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const loadCountdown = async () => {
      try {
        if (id) {
          try {
            // Load from Supabase using ID
            const countdownData = await getCountdown(id);
            
            setEventName(countdownData.event_name);
            setTargetDate(new Date(countdownData.target_date));
            setCustomBackground(countdownData.custom_background || undefined);
            setCustomColor(countdownData.custom_color || undefined);
            
            if (countdownData.scheme && countdownData.scheme !== 'custom') {
              const foundScheme = countdownSchemes.find(s => s.id === countdownData.scheme);
              if (foundScheme) {
                setScheme(foundScheme);
              }
            }
          } catch (error: any) {
            // If Supabase is not available or has auth issues, fall back to URL parameters
            if (error.message === 'SUPABASE_UNAVAILABLE' || error.message === 'SUPABASE_AUTH_ERROR') {
              console.log('Supabase not available or auth error, falling back to URL parameters');
              // Fall through to URL parameter handling below
            } else {
              throw error;
            }
          }
        }
        
        // If no ID or Supabase failed, try URL parameters
        if (!id || (id && !eventName)) {
          // Load from URL parameters (fallback)
          const name = searchParams.get('name');
          const date = searchParams.get('date');
          const schemeId = searchParams.get('scheme');
          const bg = searchParams.get('bg');
          const color = searchParams.get('color');

          if (!name || !date) {
            setError('Hiányzó paraméterek az URL-ben');
            setIsLoading(false);
            return;
          }

          setEventName(decodeURIComponent(name));
          setTargetDate(new Date(date));
          setCustomColor(color || undefined);
          
          if (bg) {
            setCustomBackground(decodeURIComponent(bg));
          }

          if (schemeId && schemeId !== 'custom') {
            const foundScheme = countdownSchemes.find(s => s.id === schemeId);
            if (foundScheme) {
              setScheme(foundScheme);
            }
          }
        }

        setIsLoading(false);
      } catch (err) {
        setError('Nem sikerült betölteni a visszaszámlálót');
        setIsLoading(false);
      }
    };

    loadCountdown();
  }, [searchParams, id]); // Removed getCountdown from dependencies to prevent infinite re-renders

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Visszaszámláló betöltése...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-6xl">⚠️</div>
          <h1 className="text-2xl font-bold text-foreground">Hiba történt</h1>
          <p className="text-muted-foreground">{error}</p>
          <Button asChild variant="hero">
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Vissza a főoldalra
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Floating Navigation */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          asChild
          variant="glass"
          size="sm"
          className="bg-black/20 backdrop-blur-md border border-white/20 text-white hover:bg-black/30"
        >
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Főoldal
          </Link>
        </Button>
      </div>

      <CountdownDisplay
        targetDate={targetDate}
        eventName={eventName}
        scheme={scheme}
        customBackground={customBackground}
        customColor={customColor}
      />
    </div>
  );
}