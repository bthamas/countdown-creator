import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { CountdownScheme } from "@/types/countdown";
import { countdownSchemes } from "@/data/schemes";
import { SchemeCard } from "./SchemeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Upload, Palette } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useCountdown } from "@/hooks/useCountdown";

export function CreateCountdownForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { createCountdown, loading } = useCountdown();
  const [eventName, setEventName] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [selectedScheme, setSelectedScheme] = useState<CountdownScheme>();
  const [customBackground, setCustomBackground] = useState<string>();
  const [customColor, setCustomColor] = useState("#FF6B6B");
  const [customGradient, setCustomGradient] = useState<string>();
  const [useGradient, setUseGradient] = useState(false);
  const [gradientStartColor, setGradientStartColor] = useState("#FF6B6B");
  const [gradientEndColor, setGradientEndColor] = useState("#4ECDC4");
  const [gradientDirection, setGradientDirection] = useState("135deg");

  // Handle preselected scheme from URL parameters or navigation state
  useEffect(() => {
    const schemeId = searchParams.get('scheme') || (location.state as any)?.preselectedScheme;
    if (schemeId) {
      const scheme = countdownSchemes.find(s => s.id === schemeId);
      if (scheme) {
        setSelectedScheme(scheme);
      }
    }
  }, [searchParams, location.state]);

  // Handle custom background image upload and convert to base64
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomBackground(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission - validates inputs and creates countdown
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!eventName.trim()) {
      toast({
        title: "Hiba",
        description: "Az esemény neve kötelező.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedDate) {
      toast({
        title: "Hiba", 
        description: "A dátum kiválasztása kötelező.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedScheme && !customBackground) {
      toast({
        title: "Hiba",
        description: "Válassz egy sémát vagy tölts fel egy képet.",
        variant: "destructive",
      });
      return;
    }

    // Combine selected date with time to create target datetime
    const [hours, minutes] = selectedTime.split(':').map(Number);
    const targetDate = new Date(selectedDate);
    targetDate.setHours(hours, minutes, 0, 0);

    // Prepare gradient data - use custom gradient or predefined one
    const finalGradient = useGradient 
      ? (customGradient || `linear-gradient(${gradientDirection}, ${gradientStartColor}, ${gradientEndColor})`)
      : undefined;
    
    // Create countdown data object for Supabase
    const countdownData = {
      eventName: eventName.trim(),
      targetDate: targetDate.toISOString(),
      scheme: selectedScheme?.id || 'custom',
      customBackground,
      customColor: useGradient ? finalGradient : customColor
    };

    try {
      // Save countdown to Supabase database
      const result = await createCountdown(countdownData);
      
      // Navigate to countdown page with unique ID for sharing
      navigate(`/countdown/${result.id}`);
      
      toast({
        title: "Siker!",
        description: "A visszaszámláló sikeresen létrehozva és megosztható.",
      });
    } catch (error) {
      // Fallback to URL parameters if Supabase fails
      const params = new URLSearchParams();
      params.set('name', encodeURIComponent(countdownData.eventName));
      params.set('date', countdownData.targetDate);
      params.set('scheme', countdownData.scheme);
      if (countdownData.customBackground) {
        params.set('bg', encodeURIComponent(countdownData.customBackground));
      }
      if (countdownData.customColor) {
        params.set('color', countdownData.customColor);
      }

      navigate(`/countdown?${params.toString()}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text">
          Új visszaszámláló
        </h1>
        <p className="text-lg text-muted-foreground">
          Készítsd el a saját visszaszámlálódat néhány lépésben
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Event Name */}
        <div className="space-y-2">
          <Label htmlFor="eventName" className="text-lg font-medium">
            Esemény neve *
          </Label>
          <Input
            id="eventName"
            placeholder="pl. Esküvő, Születésnap, Utazás..."
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="text-lg py-3"
          />
        </div>

        {/* Date Selection - Custom input fields with auto-tab functionality */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-lg font-medium">Dátum *</Label>
            <div className="space-y-2">
              {/* Manual date input fields with smart auto-tab behavior */}
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="ÉÉÉÉ"
                  className="text-lg py-3 w-20 text-center"
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    const value = target.value;
                    
                    // Only allow numeric input for year field
                    if (!/^\d*$/.test(value)) {
                      target.value = value.replace(/\D/g, '');
                      return;
                    }
                    
                    // Smart auto-tab: if 5th character is entered, move it to month field
                    if (value.length === 5) {
                      const year = value.slice(0, 4);
                      const monthDigit = value.slice(4, 5);
                      target.value = year;
                      
                      const monthInput = document.getElementById('monthInput') as HTMLInputElement;
                      if (monthInput) {
                        monthInput.value = monthDigit;
                        monthInput.focus();
                        monthInput.select();
                      }
                      return;
                    }
                    
                    // Limit year field to 4 characters maximum
                    if (value.length > 4) {
                      target.value = value.slice(0, 4);
                      return;
                    }
                    
                    // Auto-focus to month field when valid 4-digit year is entered
                    if (value.length === 4) {
                      const year = parseInt(value);
                      const currentYear = new Date().getFullYear();
                      if (year >= currentYear && year <= currentYear + 50) {
                        const monthInput = document.getElementById('monthInput') as HTMLInputElement;
                        if (monthInput) {
                          monthInput.focus();
                          monthInput.select();
                        }
                      }
                    }
                  }}
                />
                <span className="flex items-center text-muted-foreground">-</span>
                <Input
                  id="monthInput"
                  type="text"
                  placeholder="HH"
                  className="text-lg py-3 w-16 text-center"
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    const value = target.value;
                    
                    // Only allow numeric input for month field
                    if (!/^\d*$/.test(value)) {
                      target.value = value.replace(/\D/g, '');
                      return;
                    }
                    
                    // Smart auto-tab: if 3rd character is entered, move it to day field
                    if (value.length === 3) {
                      const month = value.slice(0, 2);
                      const dayDigit = value.slice(2, 3);
                      target.value = month;
                      
                      const dayInput = document.getElementById('dayInput') as HTMLInputElement;
                      if (dayInput) {
                        dayInput.value = dayDigit;
                        dayInput.focus();
                        dayInput.select();
                      }
                      return;
                    }
                    
                    // Limit month field to 2 characters maximum
                    if (value.length > 2) {
                      target.value = value.slice(0, 2);
                      return;
                    }
                    
                    // Auto-focus to day field when valid 2-digit month is entered
                    if (value.length === 2) {
                      const month = parseInt(value);
                      if (month >= 1 && month <= 12) {
                        const dayInput = document.getElementById('dayInput') as HTMLInputElement;
                        if (dayInput) {
                          dayInput.focus();
                          dayInput.select();
                        }
                      }
                    }
                  }}
                />
                <span className="flex items-center text-muted-foreground">-</span>
                <Input
                  id="dayInput"
                  type="text"
                  placeholder="NN"
                  maxLength={2}
                  className="text-lg py-3 w-16 text-center"
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    const value = target.value;
                    
                    // Only allow numeric input for day field
                    if (!/^\d*$/.test(value)) {
                      target.value = value.replace(/\D/g, '');
                      return;
                    }
                    
                    // Limit day field to 2 characters maximum
                    if (value.length > 2) {
                      target.value = value.slice(0, 2);
                      return;
                    }
                    
                    // Validate and create date object when all fields are complete
                    if (value.length === 2) {
                      const day = parseInt(value);
                      if (day >= 1 && day <= 31) {
                        const yearInput = document.querySelector('input[placeholder="ÉÉÉÉ"]') as HTMLInputElement;
                        const monthInput = document.getElementById('monthInput') as HTMLInputElement;
                        if (yearInput && monthInput && yearInput.value.length === 4 && monthInput.value.length === 2) {
                          const year = parseInt(yearInput.value);
                          const month = parseInt(monthInput.value);
                          const newDate = new Date(year, month - 1, day);
                          // Validate that the date is actually valid (handles leap years, etc.)
                          if (newDate.getDate() === day && newDate.getMonth() === month - 1 && newDate.getFullYear() === year) {
                            setSelectedDate(newDate);
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
              {/* Calendar popover for visual date selection */}
              <div className="text-xs text-muted-foreground">
                Vagy válassz a naptárból:
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal py-3",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "yyyy. MM. dd.")
                    ) : (
                      <span>Válassz dátumot</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today;
                    }}
                    initialFocus
                    className="pointer-events-auto"
                    showOutsideDays={true}
                    captionLayout="dropdown-buttons"
                    fromYear={new Date().getFullYear()}
                    toYear={new Date().getFullYear() + 50}
                    classNames={{
                      dropdown: "bg-background border border-border rounded-md shadow-lg z-50",
                      dropdown_month: "bg-background text-foreground p-2 hover:bg-accent hover:text-accent-foreground",
                      dropdown_year: "bg-background text-foreground p-2 hover:bg-accent hover:text-accent-foreground"
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time" className="text-lg font-medium">
              Időpont *
            </Label>
            <Input
              id="time"
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="text-lg py-3"
            />
          </div>
        </div>

        {/* Theme/Scheme Selection - Predefined countdown themes */}
        <div className="space-y-4">
          <Label className="text-lg font-medium">Válassz sémát</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {countdownSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                onSelect={setSelectedScheme}
                isSelected={selectedScheme?.id === scheme.id}
              />
            ))}
          </div>
        </div>

        {/* Customization Options - Background and color settings */}
        <div className="space-y-6 glass-card p-6">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Testreszabás
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Custom Background Image Upload */}
            <div className="space-y-3">
              <Label className="font-medium">Saját háttérkép</Label>
              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="h-auto p-4 hover:bg-card-hover"
                  onClick={() => document.getElementById('imageUpload')?.click()}
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Kép feltöltése
                </Button>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {customBackground && (
                  <div className="relative aspect-video rounded-lg overflow-hidden border">
                    <img
                      src={customBackground}
                      alt="Előnézet"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Custom Color and Gradient Selection */}
            <div className="space-y-3">
              <Label className="font-medium">Egyéni szín/Gradient</Label>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="colorType"
                      checked={!useGradient}
                      onChange={() => setUseGradient(false)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Egyszínű</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="colorType"
                      checked={useGradient}
                      onChange={() => setUseGradient(true)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Gradient</span>
                  </label>
                </div>
                
                {!useGradient ? (
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={customColor}
                      onChange={(e) => setCustomColor(e.target.value)}
                      className="w-12 h-12 rounded-lg border cursor-pointer"
                    />
                    <Input
                      value={customColor}
                      onChange={(e) => setCustomColor(e.target.value)}
                      placeholder="#FF6B6B"
                      className="flex-1"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Gradient Direction Selection */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Gradient irány</Label>
                      <select
                        value={gradientDirection}
                        onChange={(e) => setGradientDirection(e.target.value)}
                        className="w-full p-2 border rounded-lg bg-background text-foreground"
                      >
                        <option value="0deg">Fentről lefelé</option>
                        <option value="90deg">Balról jobbra</option>
                        <option value="135deg">Átlós (bal felső - jobb alsó)</option>
                        <option value="180deg">Lentről felfelé</option>
                        <option value="270deg">Jobbról balra</option>
                        <option value="45deg">Átlós (jobb felső - bal alsó)</option>
                      </select>
                    </div>
                    
                    {/* Custom Gradient Color Selection */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Kezdő szín</Label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={gradientStartColor}
                            onChange={(e) => setGradientStartColor(e.target.value)}
                            className="w-10 h-10 rounded-lg border cursor-pointer"
                          />
                          <Input
                            value={gradientStartColor}
                            onChange={(e) => setGradientStartColor(e.target.value)}
                            placeholder="#FF6B6B"
                            className="flex-1 text-sm"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Vég szín</Label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={gradientEndColor}
                            onChange={(e) => setGradientEndColor(e.target.value)}
                            className="w-10 h-10 rounded-lg border cursor-pointer"
                          />
                          <Input
                            value={gradientEndColor}
                            onChange={(e) => setGradientEndColor(e.target.value)}
                            placeholder="#4ECDC4"
                            className="flex-1 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Predefined Gradient Templates */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Előre definiált gradientek</Label>
                      <select
                        value={customGradient || ""}
                        onChange={(e) => setCustomGradient(e.target.value)}
                        className="w-full p-2 border rounded-lg bg-background text-foreground"
                      >
                        <option value="">Válassz gradient típust</option>
                        <option value="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">Kék-lila</option>
                        <option value="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">Rózsaszín-piros</option>
                        <option value="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">Világoskék</option>
                        <option value="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)">Zöld-türkiz</option>
                        <option value="linear-gradient(135deg, #fa709a 0%, #fee140 100%)">Rózsaszín-sárga</option>
                        <option value="linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)">Pasztell</option>
                        <option value="linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)">Rózsaszín árnyalatok</option>
                        <option value="linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)">Őszi színek</option>
                      </select>
                    </div>
                    
                    {/* Gradient Preview */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Előnézet</Label>
                      <div 
                        className="w-full h-16 rounded-lg border"
                        style={{ 
                          background: customGradient || `linear-gradient(${gradientDirection}, ${gradientStartColor}, ${gradientEndColor})`
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button - Creates countdown and saves to Supabase */}
        <div className="flex justify-center pt-4">
          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="min-w-48"
            disabled={loading}
          >
            {loading ? "Létrehozás..." : "Visszaszámláló létrehozása"}
          </Button>
        </div>
      </form>
    </div>
  );
}