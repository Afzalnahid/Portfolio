import { cn } from "@/lib/utils";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen p-8 bg-slate-950 font-roboto relative overflow-hidden text-slate-100">
          {/* Background Decor */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 blur-[150px] rounded-full" />

          <div className="flex flex-col items-center w-full max-w-3xl p-12 bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-3xl relative z-10 shadow-2xl">
            <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 mb-8">
              <AlertTriangle size={40} className="text-red-500" />
            </div>

            <h2 className="text-3xl font-black mb-2 tracking-tighter uppercase">
              Automation Error
            </h2>
            <p className="text-slate-400 mb-8 font-light">
              An unexpected exception occurred in the system core.
            </p>

            <div className="p-6 w-full rounded-2xl bg-black/40 border border-white/5 overflow-auto mb-10 max-h-[300px] scrollbar-hide">
              <pre className="text-xs text-red-400/80 font-mono whitespace-break-spaces leading-relaxed">
                {this.state.error?.stack}
              </pre>
            </div>

            <button
              onClick={() => window.location.reload()}
              className={cn(
                "flex items-center gap-3 px-10 py-4 rounded-full",
                "bg-blue-600 text-white font-bold uppercase tracking-widest text-xs",
                "hover:bg-blue-500 transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)]",
              )}
            >
              <RotateCcw size={16} />
              Reboot System
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
