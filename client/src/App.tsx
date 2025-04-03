import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import DestinationsPage from "@/pages/DestinationsPage";
import DestinationDetailPage from "@/pages/DestinationDetailPage";
import ToursPage from "@/pages/ToursPage";
import TourDetailPage from "@/pages/TourDetailPage";
import ActivitiesPage from "@/pages/ActivitiesPage";
import ActivityDetailPage from "@/pages/ActivityDetailPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/destinations" component={DestinationsPage} />
      <Route path="/destinations/:slug" component={DestinationDetailPage} />
      <Route path="/tours" component={ToursPage} />
      <Route path="/tours/:slug" component={TourDetailPage} />
      <Route path="/activities" component={ActivitiesPage} />
      <Route path="/activities/:slug" component={ActivityDetailPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <>
      <Layout>
        <Router />
      </Layout>
      <Toaster />
    </>
  );
}

export default App;
