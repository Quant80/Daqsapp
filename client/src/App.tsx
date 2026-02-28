import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Training from "./pages/Training";
import Media from "./pages/Media";
import Documents from "./pages/Documents";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import CaseStudies from "./pages/CaseStudies";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/about" component={About} />
      <Route path="/training" component={Training} />
      <Route path="/media" component={Media} />
      <Route path="/documents" component={Documents} />
      <Route path="/blog" component={Blog} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/contact" component={Contact} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster position="top-right" richColors />
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
          <Chatbot />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
