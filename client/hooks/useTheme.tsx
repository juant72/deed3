"use client"

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'auto'
type ColorScheme = 'blue' | 'green' | 'purple' | 'orange' | 'red'

interface ThemeConfig {
  theme: Theme
  colorScheme: ColorScheme
  reducedMotion: boolean
  highContrast: boolean
}

const THEME_STORAGE_KEY = 'app-theme-config'

const defaultConfig: ThemeConfig = {
  theme: 'auto',
  colorScheme: 'blue',
  reducedMotion: false,
  highContrast: false,
}

export function useTheme() {
  const [config, setConfig] = useState<ThemeConfig>(defaultConfig)
  const [mounted, setMounted] = useState(false)

  // Initialize theme from localStorage and system preferences
  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem(THEME_STORAGE_KEY)
      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig) as ThemeConfig
        setConfig(parsedConfig)
      }
    } catch (error) {
      console.warn('Failed to parse theme config from localStorage')
    }
    setMounted(true)
  }, [])

  // Apply theme changes to document
  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    const body = document.body

    // Handle theme (light/dark)
    const effectiveTheme = config.theme === 'auto' 
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : config.theme

    root.classList.remove('light', 'dark')
    root.classList.add(effectiveTheme)
    root.setAttribute('data-theme', effectiveTheme)

    // Handle color scheme
    root.classList.remove('scheme-blue', 'scheme-green', 'scheme-purple', 'scheme-orange', 'scheme-red')
    root.classList.add(`scheme-${config.colorScheme}`)
    root.setAttribute('data-color-scheme', config.colorScheme)

    // Handle accessibility preferences
    if (config.reducedMotion) {
      root.classList.add('reduce-motion')
      root.style.setProperty('--motion-duration', '0.01ms')
    } else {
      root.classList.remove('reduce-motion')
      root.style.removeProperty('--motion-duration')
    }

    if (config.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }

    // Save to localStorage
    try {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(config))
    } catch (error) {
      console.warn('Failed to save theme config to localStorage')
    }
  }, [config, mounted])

  // Listen for system theme changes when theme is set to 'auto'
  useEffect(() => {
    if (!mounted || config.theme !== 'auto') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      // Trigger re-render to update the effective theme
      setConfig(prev => ({ ...prev }))
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [config.theme, mounted])

  const updateTheme = (theme: Theme) => {
    setConfig(prev => ({ ...prev, theme }))
  }

  const updateColorScheme = (colorScheme: ColorScheme) => {
    setConfig(prev => ({ ...prev, colorScheme }))
  }

  const updateReducedMotion = (reducedMotion: boolean) => {
    setConfig(prev => ({ ...prev, reducedMotion }))
  }

  const updateHighContrast = (highContrast: boolean) => {
    setConfig(prev => ({ ...prev, highContrast }))
  }

  const resetToDefaults = () => {
    setConfig(defaultConfig)
  }

  const getEffectiveTheme = (): 'light' | 'dark' => {
    if (!mounted) return 'light'
    
    if (config.theme === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return config.theme as 'light' | 'dark'
  }

  return {
    ...config,
    effectiveTheme: getEffectiveTheme(),
    mounted,
    updateTheme,
    updateColorScheme,
    updateReducedMotion,
    updateHighContrast,
    resetToDefaults,
  }
}

// Theme switcher component
import React from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface ThemeSwitcherProps {
  className?: string
  showColorScheme?: boolean
  showAccessibility?: boolean
}

export function ThemeSwitcher({ 
  className, 
  showColorScheme = true, 
  showAccessibility = false 
}: ThemeSwitcherProps) {
  const theme = useTheme()

  if (!theme.mounted) {
    return <div className="h-10 w-32 animate-pulse bg-gray-200 rounded" />
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      {/* Theme selector */}
      <Select value={theme.theme} onValueChange={(value: Theme) => theme.updateTheme(value)}>
        <SelectTrigger className="w-24">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="auto">Auto</SelectItem>
        </SelectContent>
      </Select>

      {/* Color scheme selector */}
      {showColorScheme && (
        <Select 
          value={theme.colorScheme} 
          onValueChange={(value: ColorScheme) => theme.updateColorScheme(value)}
        >
          <SelectTrigger className="w-28">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="blue">Blue</SelectItem>
            <SelectItem value="green">Green</SelectItem>
            <SelectItem value="purple">Purple</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
            <SelectItem value="red">Red</SelectItem>
          </SelectContent>
        </Select>
      )}

      {/* Accessibility options */}
      {showAccessibility && (
        <div className="flex gap-1">
          <Button
            variant={theme.reducedMotion ? "primary" : "outline"}
            size="sm"
            onClick={() => theme.updateReducedMotion(!theme.reducedMotion)}
            title="Toggle reduced motion"
          >
            Motion
          </Button>
          <Button
            variant={theme.highContrast ? "primary" : "outline"}
            size="sm"
            onClick={() => theme.updateHighContrast(!theme.highContrast)}
            title="Toggle high contrast"
          >
            Contrast
          </Button>
        </div>
      )}
    </div>
  )
}
