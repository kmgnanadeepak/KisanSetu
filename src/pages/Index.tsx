import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Store, Sprout } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen hero-gradient flex flex-col">
      {/* Header */}
      <header className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Sprout className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">KisanSetu</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 pb-12">
        <div className="max-w-lg w-full text-center space-y-8 animate-fade-in">
          {/* Logo & Title */}
          <div className="space-y-4">
            <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-glow">
              <Sprout className="w-14 h-14 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">
              Kisan<span className="text-gradient">Setu</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              The Farmer's Bridge — Connecting farmers and merchants for a better tomorrow
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="space-y-4 pt-4 stagger-children">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Select your role to continue
            </p>
            
            {/* Farmer Card */}
            <button
              onClick={() => navigate("/auth?role=farmer")}
              className="w-full p-6 rounded-2xl bg-card border-2 border-transparent hover:border-primary transition-all duration-300 shadow-md hover:shadow-lg group"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-primary-lighter flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                  <Leaf className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <div className="text-left flex-1">
                  <h2 className="text-xl font-semibold text-foreground">Farmer</h2>
                  <p className="text-muted-foreground text-sm">
                    Detect diseases, get treatment guidance & place orders
                  </p>
                </div>
                <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </div>
              </div>
            </button>

            {/* Merchant Card */}
            <button
              onClick={() => navigate("/auth?role=merchant")}
              className="w-full p-6 rounded-2xl bg-card border-2 border-transparent hover:border-accent transition-all duration-300 shadow-md hover:shadow-lg group"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-accent/20 flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                  <Store className="w-8 h-8 text-accent group-hover:text-accent-foreground transition-colors duration-300" />
                </div>
                <div className="text-left flex-1">
                  <h2 className="text-xl font-semibold text-foreground">Merchant</h2>
                  <p className="text-muted-foreground text-sm">
                    Manage stock, receive orders & grow your business
                  </p>
                </div>
                <div className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </div>
              </div>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center">
        <p className="text-sm text-muted-foreground">
          © 2026 KisanSetu. Empowering Agriculture.
        </p>
      </footer>
    </div>
  );
};

export default Index;
