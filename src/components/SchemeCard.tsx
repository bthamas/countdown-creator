import { CountdownScheme } from "@/types/countdown";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SchemeCardProps {
  scheme: CountdownScheme;
  onSelect: (scheme: CountdownScheme) => void;
  isSelected?: boolean;
}

export function SchemeCard({ scheme, onSelect, isSelected }: SchemeCardProps) {
  return (
    <Button
      variant="scheme"
      className={cn(
        "h-24 w-full flex-col gap-2 p-4",
        isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background"
      )}
      style={{
        background: scheme.gradient,
      }}
      onClick={() => onSelect(scheme)}
    >
      <span className="text-2xl">{scheme.icon}</span>
      <span className="text-sm font-medium text-white drop-shadow-sm">
        {scheme.name}
      </span>
    </Button>
  );
}