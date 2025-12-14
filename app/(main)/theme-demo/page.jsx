import { ThemeSettings } from "@/components/theme-settings";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Sun, 
  Moon, 
  Monitor, 
  Palette, 
  Eye,
  Settings
} from "lucide-react";

export default function ThemeDemoPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-title-theme">
          Theme Showcase
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Experience Sensai in both light and dark modes. Switch between themes to see how the interface adapts to your preferences.
        </p>
        <div className="flex justify-center">
          <ThemeToggle />
        </div>
      </div>

      {/* Theme Settings */}
      <div className="max-w-2xl mx-auto">
        <ThemeSettings />
      </div>

      {/* Component Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Buttons Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Buttons
            </CardTitle>
            <CardDescription>
              Various button styles and states
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button className="w-full">Primary Button</Button>
              <Button variant="secondary" className="w-full">Secondary</Button>
              <Button variant="outline" className="w-full">Outline</Button>
              <Button variant="ghost" className="w-full">Ghost</Button>
              <Button variant="destructive" className="w-full">Destructive</Button>
            </div>
          </CardContent>
        </Card>

        {/* Form Elements Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Form Elements
            </CardTitle>
            <CardDescription>
              Input fields and form controls
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="demo-input">Email</Label>
              <Input id="demo-input" placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-textarea">Message</Label>
              <Textarea id="demo-textarea" placeholder="Type your message..." />
            </div>
          </CardContent>
        </Card>

        {/* Colors & Badges Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Colors & Badges
            </CardTitle>
            <CardDescription>
              Theme colors and badge variants
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-primary text-primary-foreground rounded text-center">
                Primary
              </div>
              <div className="p-2 bg-secondary text-secondary-foreground rounded text-center">
                Secondary
              </div>
              <div className="p-2 bg-muted text-muted-foreground rounded text-center">
                Muted
              </div>
              <div className="p-2 bg-accent text-accent-foreground rounded text-center">
                Accent
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Theme Features */}
      <Card>
        <CardHeader>
          <CardTitle>Theme Features</CardTitle>
          <CardDescription>
            What makes our theme system special
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <Sun className="h-8 w-8 mx-auto text-yellow-500" />
              <h3 className="font-semibold">Light Mode</h3>
              <p className="text-sm text-muted-foreground">
                Clean, bright interface perfect for daytime use
              </p>
            </div>
            <div className="text-center space-y-2">
              <Moon className="h-8 w-8 mx-auto text-blue-500" />
              <h3 className="font-semibold">Dark Mode</h3>
              <p className="text-sm text-muted-foreground">
                Easy on the eyes for low-light environments
              </p>
            </div>
            <div className="text-center space-y-2">
              <Monitor className="h-8 w-8 mx-auto text-green-500" />
              <h3 className="font-semibold">System Sync</h3>
              <p className="text-sm text-muted-foreground">
                Automatically matches your device preferences
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Details */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Implementation</CardTitle>
          <CardDescription>
            How the theme system works under the hood
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Features:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• CSS Custom Properties</li>
                  <li>• System preference detection</li>
                  <li>• Persistent theme storage</li>
                  <li>• Smooth transitions</li>
                  <li>• SSR compatible</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Technologies:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• next-themes</li>
                  <li>• Tailwind CSS</li>
                  <li>• CSS Variables</li>
                  <li>• React Context</li>
                  <li>• Local Storage</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}