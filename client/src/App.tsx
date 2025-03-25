import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Destination from "@/pages/Destination";
import Tour from "@/pages/Tour";
import Destinations from "@/pages/Destinations";
import Tours from "@/pages/Tours";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./app.css";

function Router() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/destinations" component={Destinations} />
        <Route path="/destinations/:slug" component={Destination} />
        <Route path="/tours" component={Tours} />
        <Route path="/tours/:slug" component={Tour} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
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
