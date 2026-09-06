import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { BookingProvider } from "./contexts/BookingContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

// A separate page; it should not weigh down the first load of the homepage.
const Resume = lazy(() => import("./pages/Resume"));

function Router() {
  return (
    <Suspense fallback={null}>
      <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/resume"} component={Resume} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <BookingProvider>
            <Toaster />
            <Router />
          </BookingProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
