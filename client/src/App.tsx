import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "@/components/Sidebar";
import Home from "@/pages/home";
import CategoryPage from "@/pages/category";
import ArticlePage from "@/pages/article";
import Support from "@/pages/support";
import AdminTickets from "@/pages/admin/tickets";
import NotFound from "@/pages/not-found";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Sidebar with mobile overlay */}
      <div
        className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <div
        className={`fixed md:static w-64 z-50 h-screen transition-transform duration-200 ease-in-out md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <main className="flex-1 overflow-y-auto p-4 md:p-8 md:ml-0 w-full">
        <div className="md:hidden h-12" /> {/* Spacer for mobile menu button */}
        {children}
      </main>
    </div>
  );
}

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/category/:slug" component={CategoryPage} />
        <Route path="/article/:slug" component={ArticlePage} />
        <Route path="/support" component={Support} />
        <Route path="/admin/tickets" component={AdminTickets} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;