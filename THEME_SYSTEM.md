# 🎨 Theme System Documentation

## Overview

Sensai features a comprehensive dark/light theme system that provides users with a seamless experience across different lighting conditions and personal preferences.

## ✨ Features

- **🌙 Dark Mode**: Easy on the eyes for low-light environments
- **☀️ Light Mode**: Clean, bright interface for daytime use  
- **🖥️ System Sync**: Automatically matches device preferences
- **💾 Persistent Storage**: Remembers user's theme choice
- **⚡ Instant Switching**: Smooth transitions between themes
- **🎯 SSR Compatible**: Works with server-side rendering

## 🛠️ Technical Implementation

### Core Technologies
- **next-themes**: Theme management and persistence
- **Tailwind CSS**: Utility-first styling with CSS variables
- **CSS Custom Properties**: Dynamic color system
- **React Context**: Theme state management

### Theme Architecture

```javascript
// Theme Provider Setup
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem={true}
  storageKey="sensai-theme"
  themes={["light", "dark", "system"]}
>
```

### CSS Variables System

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  /* ... more variables */
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  /* ... dark theme overrides */
}
```

## 🎯 Components

### Theme Toggle Button
Simple toggle between light/dark modes:
```jsx
import { ThemeToggleSimple } from "@/components/theme-toggle";

<ThemeToggleSimple />
```

### Theme Dropdown Menu
Full theme selection with system option:
```jsx
import { ThemeToggle } from "@/components/theme-toggle";

<ThemeToggle />
```

### Theme Settings Panel
Complete theme management interface:
```jsx
import { ThemeSettings } from "@/components/theme-settings";

<ThemeSettings />
```

## 🎨 Color System

### Primary Colors
| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--background` | `#ffffff` | `#0a0a0a` | Main background |
| `--foreground` | `#0a0a0a` | `#fafafa` | Primary text |
| `--primary` | `#171717` | `#fafafa` | Brand colors |
| `--secondary` | `#f5f5f5` | `#262626` | Secondary elements |
| `--muted` | `#f5f5f5` | `#262626` | Subtle backgrounds |
| `--accent` | `#f5f5f5` | `#262626` | Accent elements |

### Semantic Colors
| Variable | Purpose | Light | Dark |
|----------|---------|-------|------|
| `--destructive` | Error states | `#dc2626` | `#7f1d1d` |
| `--border` | Borders | `#e5e5e5` | `#262626` |
| `--input` | Form inputs | `#e5e5e5` | `#262626` |
| `--ring` | Focus rings | `#0a0a0a` | `#d4d4d8` |

## 🔧 Usage Examples

### Basic Theme-Aware Component
```jsx
"use client";

import { useTheme } from "next-themes";

export function MyComponent() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="bg-background text-foreground">
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        Toggle Theme
      </button>
    </div>
  );
}
```

### Theme-Aware Styling
```jsx
// Using Tailwind classes
<div className="bg-card text-card-foreground border-border">
  <h1 className="text-primary">Title</h1>
  <p className="text-muted-foreground">Description</p>
</div>

// Using CSS variables directly
<div style={{
  backgroundColor: 'hsl(var(--card))',
  color: 'hsl(var(--card-foreground))'
}}>
  Content
</div>
```

### Conditional Theme Content
```jsx
import { ThemeAwareComponent } from "@/components/theme-loading";

<ThemeAwareComponent
  lightContent={<LightModeComponent />}
  darkContent={<DarkModeComponent />}
>
  <DefaultComponent />
</ThemeAwareComponent>
```

## 🎭 Clerk Integration

The theme system integrates seamlessly with Clerk authentication:

```jsx
// Dynamic Clerk theming
<ClerkProvider
  appearance={{
    baseTheme: resolvedTheme === 'dark' ? dark : light,
    variables: {
      colorPrimary: resolvedTheme === 'dark' ? '#ffffff' : '#000000',
      colorBackground: resolvedTheme === 'dark' ? '#0a0a0a' : '#ffffff',
    },
    elements: {
      formButtonPrimary: 'bg-primary text-primary-foreground',
      card: 'bg-card border-border',
    },
  }}
>
```

## 📱 Responsive Design

Themes work seamlessly across all device sizes:

```css
/* Mobile-first responsive theming */
@media (max-width: 768px) {
  .dark .mobile-specific {
    --background: 0 0% 5%; /* Slightly lighter on mobile */
  }
}
```

## ⚡ Performance Optimizations

### Preventing Flash of Incorrect Theme
```jsx
// Theme loading component prevents FOIT
export function ThemeLoading({ children, fallback }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return fallback;
  return children;
}
```

### CSS Variable Optimization
```css
/* Efficient theme transitions */
* {
  transition: background-color 0.2s ease, color 0.2s ease;
}

/* Disable transitions during theme switch */
.theme-transitioning * {
  transition: none !important;
}
```

## 🧪 Testing Themes

### Manual Testing Checklist
- [ ] Light mode displays correctly
- [ ] Dark mode displays correctly  
- [ ] System preference detection works
- [ ] Theme persists after page reload
- [ ] Smooth transitions between themes
- [ ] All components respect theme colors
- [ ] Clerk components match theme
- [ ] No flash of incorrect theme

### Automated Testing
```javascript
// Theme testing utilities
import { render } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';

const renderWithTheme = (component, theme = 'light') => {
  return render(
    <ThemeProvider defaultTheme={theme}>
      {component}
    </ThemeProvider>
  );
};
```

## 🎨 Customization

### Adding New Theme Colors
1. Add CSS variables to `globals.css`:
```css
:root {
  --custom-color: 220 100% 50%;
}

.dark {
  --custom-color: 220 100% 70%;
}
```

2. Add Tailwind utilities:
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'custom': 'hsl(var(--custom-color))',
      }
    }
  }
}
```

### Creating Theme Variants
```jsx
// Custom theme hook
export function useCustomTheme() {
  const { theme } = useTheme();
  
  const getVariant = (lightValue, darkValue) => {
    return theme === 'dark' ? darkValue : lightValue;
  };
  
  return { getVariant };
}
```

## 🚀 Best Practices

### Do's ✅
- Use CSS variables for all colors
- Test both themes during development
- Provide theme toggle in accessible location
- Use semantic color names
- Respect system preferences by default

### Don'ts ❌
- Don't hardcode colors in components
- Don't forget to test Clerk integration
- Don't use theme-specific images without alternatives
- Don't ignore accessibility in dark mode
- Don't override user's theme preference

## 🔍 Troubleshooting

### Common Issues

**Theme not persisting:**
```javascript
// Ensure storage key is set
<ThemeProvider storageKey="sensai-theme">
```

**Flash of incorrect theme:**
```javascript
// Use suppressHydrationWarning
<html suppressHydrationWarning>
```

**Clerk not matching theme:**
```javascript
// Ensure ClerkThemeProvider is inside ThemeProvider
<ThemeProvider>
  <ClerkThemeProvider>
    <App />
  </ClerkThemeProvider>
</ThemeProvider>
```

## 📊 Browser Support

| Browser | Light Mode | Dark Mode | System Sync |
|---------|------------|-----------|-------------|
| Chrome 76+ | ✅ | ✅ | ✅ |
| Firefox 67+ | ✅ | ✅ | ✅ |
| Safari 12.1+ | ✅ | ✅ | ✅ |
| Edge 79+ | ✅ | ✅ | ✅ |

## 🎯 Future Enhancements

- [ ] High contrast mode support
- [ ] Custom color scheme builder
- [ ] Theme scheduling (auto dark at night)
- [ ] Per-component theme overrides
- [ ] Theme analytics and usage tracking

---

## 🔗 Related Files

- `components/theme-toggle.jsx` - Theme toggle components
- `components/theme-provider.jsx` - Theme provider wrapper
- `components/clerk-theme-provider.jsx` - Clerk integration
- `components/theme-settings.jsx` - Theme settings panel
- `app/globals.css` - Theme CSS variables
- `app/(main)/theme-demo/page.jsx` - Theme showcase page