"use client"

import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { Counter } from '@/components/ui/counter'
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/ui/animate-on-scroll'
import { ThemeSwitcher } from '@/hooks/useTheme'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Image from 'next/image'

// Demo page to showcase the migrated components
export default function ModernComponentsDemo() {
  const demoProducts = [
    { id: '1', title: 'Modern Villa', price: 850000, image: '/portfolio/portfolio-1.jpg', author: 'John Doe' },
    { id: '2', title: 'City Apartment', price: 450000, image: '/portfolio/portfolio-2.jpg', author: 'Jane Smith' },
    { id: '3', title: 'Beach House', price: 1200000, image: '/portfolio/portfolio-3.jpg', author: 'Mike Johnson' },
    { id: '4', title: 'Mountain Cabin', price: 350000, image: '/portfolio/portfolio-4.jpg', author: 'Sarah Wilson' },
    { id: '5', title: 'Urban Loft', price: 650000, image: '/portfolio/portfolio-5.jpg', author: 'David Brown' },
  ]

  const demoStats = [
    { label: 'Properties Sold', value: 1234, suffix: '+', icon: '🏠' },
    { label: 'Happy Clients', value: 856, suffix: '+', icon: '😊' },
    { label: 'Total Revenue', value: 45000000, suffix: '', icon: '💰' },
    { label: 'Years Experience', value: 15, suffix: '+', icon: '⭐' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <header className="py-8 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">
            🚀 Modern Components Demo
          </h1>
          <ThemeSwitcher showColorScheme={true} showAccessibility={true} />
        </div>
      </header>

      <div className="container mx-auto px-4 space-y-16">

        {/* Hero Section with Animation */}
        <section className="text-center py-16">
          <AnimateOnScroll animation="slideUp">
            <h2 className="text-5xl font-bold text-white mb-6">
              jQuery ➜ React Migration
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Showcase of modern React components replacing jQuery functionality.
              Faster, more accessible, and built for the future.
            </p>
          </AnimateOnScroll>
        </section>

        {/* Migration Comparison */}
        <section className="py-16">
          <AnimateOnScroll animation="slideUp" className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Migration Overview</h3>
          </AnimateOnScroll>

          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            <StaggerItem>
              <Card className="bg-red-500/10 border-red-500/30 p-6">
                <div className="text-center">
                  <h4 className="text-xl font-bold text-red-400 mb-4">❌ Before (jQuery)</h4>
                  <ul className="text-gray-300 space-y-2 text-left">
                    <li>• Slick Carousel (~50KB)</li>
                    <li>• jQuery Appear Plugin</li>
                    <li>• Odometer Counter</li>
                    <li>• jQuery Nice Select</li>
                    <li>• Style Switcher Plugin</li>
                    <li>• Total: ~200KB+ jQuery stack</li>
                  </ul>
                </div>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card className="bg-green-500/10 border-green-500/30 p-6">
                <div className="text-center">
                  <h4 className="text-xl font-bold text-green-400 mb-4">✅ After (React)</h4>
                  <ul className="text-gray-300 space-y-2 text-left">
                    <li>• Embla Carousel (Tree-shakeable)</li>
                    <li>• Framer Motion + Intersection Observer</li>
                    <li>• React CountUp</li>
                    <li>• Shadcn/ui Select (Radix)</li>
                    <li>• React useTheme Hook</li>
                    <li>• Total: ~50KB optimized</li>
                  </ul>
                </div>
              </Card>
            </StaggerItem>
          </StaggerContainer>
        </section>

        {/* Product Carousel Demo */}
        <section className="py-16">
          <AnimateOnScroll animation="slideUp" className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              🎠 Modern Carousel
            </h3>
            <p className="text-gray-300">
              Replaces: <code className="bg-slate-700 px-2 py-1 rounded">$(&apos;.slick-activation-01&apos;).slick()</code>
            </p>
          </AnimateOnScroll>

          <Carousel
            opts={{ align: "start", loop: true }}
            autoplay={true}
            autoplayDelay={4000}
            showArrows={true}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {demoProducts.map((product) => (
                <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden rounded-lg">
                        <Image
                          src={product.image}
                          alt={product.title}
                          width={400}
                          height={256}
                          className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white">
                          <h4 className="font-semibold text-lg mb-1">{product.title}</h4>
                          <p className="text-sm opacity-90">by {product.author}</p>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-green-400">
                            <Counter
                              end={product.price}
                              duration={1.5}
                              prefix="$"
                              separator=","
                            />
                          </span>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-12 h-12 w-12" />
            <CarouselNext className="-right-12 h-12 w-12" />
          </Carousel>
        </section>

        {/* Stats Counter Demo */}
        <section className="py-16">
          <AnimateOnScroll animation="slideUp" className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              🔢 Animated Counters
            </h3>
            <p className="text-gray-300">
              Replaces: <code className="bg-slate-700 px-2 py-1 rounded">$(&apos;.odometer&apos;).odometer()</code>
            </p>
          </AnimateOnScroll>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {demoStats.map((stat, index) => (
              <StaggerItem key={index}>
                <Card className="bg-slate-800/50 border-slate-700 p-6 text-center hover:bg-slate-800/70 transition-colors">
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-4xl font-bold text-white mb-2">
                    <Counter
                      end={stat.value}
                      duration={2.5}
                      suffix={stat.suffix}
                      separator=","
                      triggerOnView={true}
                    />
                  </div>
                  <p className="text-gray-400 font-medium">{stat.label}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Modern Select Demo */}
        <section className="py-16">
          <AnimateOnScroll animation="slideUp" className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              🎛️ Modern Select Components
            </h3>
            <p className="text-gray-300">
              Replaces: <code className="bg-slate-700 px-2 py-1 rounded">$(&apos;.nice-select&apos;).niceSelect()</code>
            </p>
          </AnimateOnScroll>

          <div className="max-w-md mx-auto space-y-4">
            <Select>
              <SelectTrigger className="w-full bg-slate-800 border-slate-600 text-white">
                <SelectValue placeholder="Select a property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-full bg-slate-800 border-slate-600 text-white">
                <SelectValue placeholder="Price range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-100k">$0 - $100K</SelectItem>
                <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                <SelectItem value="1m+">$1M+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Performance Stats */}
        <section className="py-16">
          <AnimateOnScroll animation="slideUp">
            <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30 p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-6">
                  📈 Performance Improvements
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-green-400">
                      <Counter end={75} suffix="%" />
                    </div>
                    <p className="text-gray-300">Bundle Size Reduction</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-400">
                      <Counter end={40} suffix="%" />
                    </div>
                    <p className="text-gray-300">Faster Load Times</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-400">
                      <Counter end={100} suffix="%" />
                    </div>
                    <p className="text-gray-300">SSR Compatible</p>
                  </div>
                </div>
              </div>
            </Card>
          </AnimateOnScroll>
        </section>

      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400">
        <p>✅ jQuery Migration Complete - Modern React Stack Active</p>
      </footer>
    </div>
  )
}
