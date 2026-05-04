import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 font-roboto relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full" />

      <Card className="w-full max-w-lg mx-4 shadow-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl relative z-10 py-12">
        <CardContent className="text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse blur-xl" />
              <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center border border-white/5 relative z-10">
                <AlertCircle className="h-10 w-10 text-red-500" />
              </div>
            </div>
          </div>

          <h1 className="text-7xl font-black text-white mb-2 tracking-tighter">
            404
          </h1>

          <h2 className="text-xl font-bold text-slate-300 mb-6 uppercase tracking-widest">
            Page Not Found
          </h2>

          <p className="text-slate-400 mb-10 leading-relaxed font-light px-4">
            The page you are looking for doesn't exist or has been moved to a
            new automated workflow.
          </p>

          <div className="flex justify-center">
            <Button
              onClick={handleGoHome}
              className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-6 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] uppercase font-bold tracking-widest text-xs"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Safety
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
