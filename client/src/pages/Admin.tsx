import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Admin() {
  const { toast } = useToast();
  const [strapiUrl, setStrapiUrl] = useState("");
  const [strapiToken, setStrapiToken] = useState("");
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "checking" | "success" | "error">("idle");

  const testStrapiConnection = async () => {
    if (!strapiUrl || !strapiToken) {
      toast({
        title: "Missing Information",
        description: "Please provide both Strapi URL and API token",
        variant: "destructive"
      });
      return;
    }

    setConnectionStatus("checking");
    
    try {
      const response = await fetch('/api/strapi/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: strapiUrl, token: strapiToken })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setConnectionStatus("success");
        toast({
          title: "Connection Successful",
          description: "Successfully connected to Strapi CMS",
        });
      } else {
        setConnectionStatus("error");
        toast({
          title: "Connection Failed",
          description: data.message || "Failed to connect to Strapi CMS",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      setConnectionStatus("error");
      toast({
        title: "Connection Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  const saveConfig = async () => {
    try {
      const response = await fetch('/api/strapi/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: strapiUrl, token: strapiToken })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Configuration Saved",
          description: "Strapi configuration has been saved successfully",
        });
      } else {
        toast({
          title: "Save Failed",
          description: data.message || "Failed to save configuration",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        title: "Save Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="mb-8 text-3xl font-bold">Admin Dashboard</h1>
      
      <Tabs defaultValue="strapi" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="strapi">Strapi CMS</TabsTrigger>
          <TabsTrigger value="data">Data Management</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="strapi">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Strapi CMS Integration</CardTitle>
              <CardDescription>
                Connect your travel website to Strapi CMS for content management.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="strapi-url">Strapi URL</Label>
                  <Input 
                    id="strapi-url" 
                    placeholder="https://your-strapi-url/api" 
                    value={strapiUrl}
                    onChange={(e) => setStrapiUrl(e.target.value)}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    The URL of your Strapi API, usually ending with /api
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="strapi-token">API Token</Label>
                  <Input 
                    id="strapi-token" 
                    type="password" 
                    placeholder="Your Strapi API token" 
                    value={strapiToken}
                    onChange={(e) => setStrapiToken(e.target.value)}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Create a full-access API token in Strapi's settings
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  onClick={testStrapiConnection}
                  disabled={connectionStatus === "checking"}
                  variant="outline"
                >
                  Test Connection
                </Button>
                
                {connectionStatus === "success" && (
                  <div className="flex items-center gap-1 text-green-600">
                    <Check size={16} />
                    <span>Connected</span>
                  </div>
                )}
                
                {connectionStatus === "error" && (
                  <div className="flex items-center gap-1 text-red-600">
                    <X size={16} />
                    <span>Connection failed</span>
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter>
              <Button onClick={saveConfig}>Save Configuration</Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-6 w-full">
            <CardHeader>
              <CardTitle>Strapi CMS Setup Guide</CardTitle>
              <CardDescription>
                Follow these steps to set up your Strapi CMS for this travel website.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">1. Install Strapi</h3>
                <p className="text-gray-600">
                  Create a new Strapi project on your server or locally.
                </p>
                <pre className="mt-2 rounded-md bg-gray-100 p-2 text-sm">
                  npx create-strapi-app@latest my-travel-cms
                </pre>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium">2. Create Content Types</h3>
                <p className="text-gray-600">
                  Create the following collection types in Strapi:
                </p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                  <li>Destinations (name, slug, description, image, etc.)</li>
                  <li>Tours (title, slug, description, price, etc.)</li>
                  <li>Activities (name, description, price, etc.)</li>
                  <li>Accommodations (name, description, price, etc.)</li>
                  <li>Reviews (author, rating, comment, etc.)</li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium">3. Generate API Token</h3>
                <p className="text-gray-600">
                  In Strapi admin panel, go to Settings → API Tokens and create a new full-access token.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium">4. Set Permissions</h3>
                <p className="text-gray-600">
                  In Strapi admin panel, go to Settings → Roles → Public and enable find/findOne permissions for all your content types.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Manage your travel website data directly from this interface.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <p className="text-gray-600">
                This feature is coming soon. For now, please use the Strapi admin interface to manage your content.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Website Settings</CardTitle>
              <CardDescription>
                Manage general website settings.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <p className="text-gray-600">
                This feature is coming soon. Website settings will be available here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}