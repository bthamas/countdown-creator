import { Link } from "react-router-dom";
import { CreateCountdownForm } from "@/components/CreateCountdownForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Create() {

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-background-secondary/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              asChild
              variant="ghost"
              size="sm"
            >
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Vissza a főoldalra
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <CreateCountdownForm />
      </div>
    </div>
  );
}