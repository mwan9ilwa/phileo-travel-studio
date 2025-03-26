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
import Activities from "@/pages/Activities";
import Accommodations from "@/pages/Accommodations";
import AboutUs from "@/pages/AboutUs";
import ContactUs from "@/pages/ContactUs";
import Admin from "@/pages/Admin";
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
        <Route path="/activities" component={Activities} />
        <Route path="/accommodations" component={Accommodations} />
        <Route path="/about" component={AboutUs} />
        <Route path="/contact" component={ContactUs} />
        <Route path="/admin" component={Admin} />
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
