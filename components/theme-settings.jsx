"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function ThemeSettings() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Theme Preferences</CardTitle>
          <CardDescription>
            Choose your preferred theme for the application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-10 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Preferences</CardTitle>
        <CardDescription>
          Choose your preferred theme for the application. System will automatically match your device settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={theme}
          onValueChange={setTheme}
          className="grid grid-cols-1 gap-4"
        >
          <div className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent transition-colors">
            <RadioGroupItem value="light" id="light" />
            <Label htmlFor="light" className="flex items-center space-x-3 cursor-pointer flex-1">
              <Sun className="h-5 w-5 text-yellow-500" />
              <div>
                <div className="font-medium">Light</div>
                <div className="text-sm text-muted-foreground">
                  Clean and bright interface
                </div>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent transition-colors">
            <RadioGroupItem value="dark" id="dark" />
            <Label htmlFor="dark" className="flex items-center space-x-3 cursor-pointer flex-1">
              <Moon className="h-5 w-5 text-blue-500" />
              <div>
                <div className="font-medium">Dark</div>
                <div className="text-sm text-muted-foreground">
                  Easy on the eyes in low light
                </div>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent transition-colors">
            <RadioGroupItem value="system" id="system" />
            <Label htmlFor="system" className="flex items-center space-x-3 cursor-pointer flex-1">
              <Monitor className="h-5 w-5 text-green-500" />
              <div>
                <div className="font-medium">System</div>
                <div className="text-sm text-muted-foreground">
                  Matches your device settings
                </div>
              </div>
            </Label>
          </div>
        </RadioGroup>

        <div className="pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">Preview:</p>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-8 bg-background border rounded flex items-center justify-center text-xs">
                Background
              </div>
              <div className="h-8 bg-card border rounded flex items-center justify-center text-xs">
                Card
              </div>
              <div className="h-8 bg-primary text-primary-foreground rounded flex items-center justify-center text-xs">
                Primary
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}