import { useEffect, useState } from "react";
import { TimeRemaining } from "@/types/countdown";
import { Button } from "@/components/ui/button";
import { Copy, Check, Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CountdownDisplayProps {
  targetDate: Date;
  eventName: string;
  scheme: any;
  customBackground?: string;
  customColor?: string;
}

export function CountdownDisplay({ 
  targetDate, 
  eventName, 
  scheme,
  customBackground,
  customColor
}: CountdownDisplayProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isFinished: false
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds, isFinished: false });
      } else {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0, isFinished: true });
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const copyLink = async () => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(window.location.href);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (!successful) {
          throw new Error('Copy command failed');
        }
      }
      
      setCopied(true);
      toast({
        title: "Link másolva!",
        description: "A visszaszámláló linkje a vágólapra került.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
      toast({
        title: "Hiba",
        description: "Nem sikerült a link másolása. Próbáld meg manuálisan: Ctrl+C",
        variant: "destructive",
      });
    }
  };

  const backgroundStyle = customBackground 
    ? { backgroundImage: `url(${customBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: customColor || scheme?.gradient };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div 
        className="relative flex-1 flex flex-col items-center justify-center p-8 text-center"
        style={backgroundStyle}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
        
        {/* Share Button - Top Right */}
        <div className="absolute top-4 right-4 z-20">
          <Button
            variant="glass"
            size="sm"
            onClick={copyLink}
            className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30"
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
          </Button>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          {/* Event Name */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl animate-fade-in">
            {eventName}
          </h1>

          {/* Countdown Timer */}
          {!timeRemaining.isFinished ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 animate-slide-up">
              <TimeUnit value={timeRemaining.days} label="Nap" />
              <TimeUnit value={timeRemaining.hours} label="Óra" />
              <TimeUnit value={timeRemaining.minutes} label="Perc" />
              <TimeUnit value={timeRemaining.seconds} label="Másodperc" />
            </div>
          ) : (
            <div className="animate-scale-in">
              <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-2xl mb-4">
                🎉 Elérkezett a nap! 🎉
              </h2>
              <p className="text-xl md:text-2xl text-white/90 drop-shadow-lg">
                Az esemény most kezdődik!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="glass-card p-4 md:p-6 bg-white/10 backdrop-blur-md border border-white/20">
      <div className="countdown-number text-white drop-shadow-2xl">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-sm md:text-base font-medium text-white/90 mt-2 uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
}