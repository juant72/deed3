"use client"

import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll'
import { cn } from '@/lib/utils'

// ModernSelect - Reemplaza .nice-select
interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface ModernSelectProps {
  options: SelectOption[]
  placeholder?: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  variant?: 'default' | 'transparent' | 'minimal'
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  disabled?: boolean
}

export function ModernSelect({
  options,
  placeholder = "Select an option",
  value,
  onValueChange,
  className,
  variant = 'default',
  size = 'md',
  animated = true,
  disabled = false,
}: ModernSelectProps) {
  const selectContent = (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger 
        className={cn(
          // Base styles
          "w-full transition-all duration-200",
          
          // Size variants
          {
            'h-8 text-sm px-2': size === 'sm',
            'h-10 text-base px-3': size === 'md',
            'h-12 text-lg px-4': size === 'lg',
          },
          
          // Variant styles
          {
            'bg-white border border-gray-200 hover:border-gray-300 focus:border-primary': variant === 'default',
            'bg-transparent border-0 border-b border-gray-300 rounded-none hover:border-gray-400 focus:border-primary': variant === 'transparent',
            'bg-gray-50 border-0 hover:bg-gray-100 focus:bg-white focus:ring-2 focus:ring-primary/20': variant === 'minimal',
          },
          
          className
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-white border border-gray-200 shadow-lg">
        {options.map((option) => (
          <SelectItem 
            key={option.value} 
            value={option.value}
            disabled={option.disabled}
            className="hover:bg-gray-50 focus:bg-gray-100 cursor-pointer transition-colors"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )

  if (animated) {
    return (
      <AnimateOnScroll animation="slideUp" className="w-full">
        {selectContent}
      </AnimateOnScroll>
    )
  }

  return selectContent
}

// Specialized selects for common use cases

// SortSelect - Para ordenar resultados
interface SortSelectProps {
  value?: string
  onValueChange?: (value: string) => void
  className?: string
}

export function SortSelect({ value, onValueChange, className }: SortSelectProps) {
  const sortOptions: SelectOption[] = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'trending', label: 'Trending' },
  ]

  return (
    <ModernSelect
      options={sortOptions}
      placeholder="Sort by"
      value={value}
      onValueChange={onValueChange}
      className={className}
      variant="minimal"
      size="sm"
    />
  )
}

// CategorySelect - Para seleccionar categorías
interface CategorySelectProps {
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  categories?: { id: string; name: string }[]
}

export function CategorySelect({ 
  value, 
  onValueChange, 
  className,
  categories = []
}: CategorySelectProps) {
  const defaultCategories: SelectOption[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'art', label: 'Art' },
    { value: 'music', label: 'Music' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'sports', label: 'Sports' },
    { value: 'collectibles', label: 'Collectibles' },
  ]

  const categoryOptions = categories.length > 0 
    ? [
        { value: 'all', label: 'All Categories' },
        ...categories.map(cat => ({ value: cat.id, label: cat.name }))
      ]
    : defaultCategories

  return (
    <ModernSelect
      options={categoryOptions}
      placeholder="Select category"
      value={value}
      onValueChange={onValueChange}
      className={className}
      variant="default"
    />
  )
}

// PriceRangeSelect - Para rangos de precio
interface PriceRangeSelectProps {
  value?: string
  onValueChange?: (value: string) => void
  className?: string
}

export function PriceRangeSelect({ value, onValueChange, className }: PriceRangeSelectProps) {
  const priceOptions: SelectOption[] = [
    { value: 'all', label: 'All Prices' },
    { value: '0-1', label: '0 - 1 ETH' },
    { value: '1-5', label: '1 - 5 ETH' },
    { value: '5-10', label: '5 - 10 ETH' },
    { value: '10-50', label: '10 - 50 ETH' },
    { value: '50+', label: '50+ ETH' },
  ]

  return (
    <ModernSelect
      options={priceOptions}
      placeholder="Price range"
      value={value}
      onValueChange={onValueChange}
      className={className}
      variant="transparent"
    />
  )
}

// FilterSelect - Select multi-propósito para filtros
interface FilterSelectProps {
  options: SelectOption[]
  placeholder?: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  label?: string
}

export function FilterSelect({ 
  options, 
  placeholder = "Select filter",
  value,
  onValueChange,
  className,
  label 
}: FilterSelectProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <ModernSelect
        options={options}
        placeholder={placeholder}
        value={value}
        onValueChange={onValueChange}
        className={className}
        variant="default"
      />
    </div>
  )
}
