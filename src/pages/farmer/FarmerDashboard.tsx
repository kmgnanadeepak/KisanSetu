import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Sprout, 
  Cloud, 
  Droplets, 
  ThermometerSun, 
  Wind, 
  Scan, 
  ShoppingCart, 
  ClipboardList, 
  User, 
  LogOut, 
  Settings,
  Store,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { useWeather } from "@/hooks/useWeather";
import { NotificationBell } from "@/components/NotificationBell";

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{ full_name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const { weather, loading: weatherLoading } = useWeather();

  useEffect(() => {
    const checkAuthAndFetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/");
        return;
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("user_id", session.user.id)
        .maybeSingle();

      setProfile(profileData);
      setLoading(false);
    };

    checkAuthAndFetchProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Weather Widget - Left */}
          <div className="flex items-center gap-3 weather-card">
            {weatherLoading ? (
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            ) : (
              <>
                <ThermometerSun className="w-8 h-8 text-primary" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-foreground">{weather?.temperature || 28}°C</span>
                    <span className="text-sm text-muted-foreground">{weather?.condition || "Loading..."}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Droplets className="w-3 h-3" /> {weather?.humidity || 0}%
                    </span>
                    <span className="flex items-center gap-1">
                      <Wind className="w-3 h-3" /> {weather?.windSpeed || 0} km/h
                    </span>
                    <span className="flex items-center gap-1">
                      <Cloud className="w-3 h-3" /> {weather?.rainChance || 0}% rain
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Logo - Center */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Sprout className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground hidden sm:block">KisanSetu</span>
          </div>

          {/* Notifications & Profile - Right */}
          <div className="flex items-center gap-2">
            <NotificationBell />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-primary">
                    <AvatarFallback className="bg-primary-lighter text-primary font-semibold">
                      {profile?.full_name ? getInitials(profile.full_name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{profile?.full_name || "Farmer"}</p>
                    <p className="text-xs text-muted-foreground">Farmer Account</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/farmer/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/farmer/orders")}>
                  <ClipboardList className="mr-2 h-4 w-4" />
                  My Orders
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">
            Hello, {profile?.full_name?.split(" ")[0] || "Farmer"}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            What would you like to do today?
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {/* Disease Detection Card */}
          <Card 
            className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-primary"
            onClick={() => navigate("/farmer/disease-detection")}
          >
            <CardHeader>
              <div className="w-14 h-14 rounded-xl bg-primary-lighter flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                <Scan className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <CardTitle className="text-xl">Disease Detection</CardTitle>
              <CardDescription>
                Analyze crop diseases using image or symptom-based detection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                Start Detection
              </Button>
            </CardContent>
          </Card>

          {/* Shop Products Card */}
          <Card 
            className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-primary"
            onClick={() => navigate("/farmer/shop")}
          >
            <CardHeader>
              <div className="w-14 h-14 rounded-xl bg-primary-lighter flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                <ShoppingCart className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <CardTitle className="text-xl">Shop Products</CardTitle>
              <CardDescription>
                Browse and order agricultural products from merchants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                Browse Shop
              </Button>
            </CardContent>
          </Card>

          {/* My Orders Card */}
          <Card 
            className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-primary"
            onClick={() => navigate("/farmer/orders")}
          >
            <CardHeader>
              <div className="w-14 h-14 rounded-xl bg-primary-lighter flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                <ClipboardList className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <CardTitle className="text-xl">My Orders</CardTitle>
              <CardDescription>
                Track your order status and history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                View Orders
              </Button>
            </CardContent>
          </Card>

          {/* Marketplace Card */}
          <Card 
            className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-primary"
            onClick={() => navigate("/farmer/marketplace")}
          >
            <CardHeader>
              <div className="w-14 h-14 rounded-xl bg-primary-lighter flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                <Store className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <CardTitle className="text-xl">Marketplace</CardTitle>
              <CardDescription>
                Sell your produce directly to buyers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                Open Marketplace
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="mt-8 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sprout className="w-5 h-5 text-primary" />
              Farming Tip of the Day
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Based on current weather conditions, consider watering your crops early in the morning 
              to minimize evaporation and maximize water absorption.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FarmerDashboard;
