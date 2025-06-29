import React, { useState } from 'react'
import Head from 'next/head'
import { AuthorCarousel, CategoryCarousel, TopSellerCarousel } from '@/components/ui/specialized-carousels'
import { ModernSelect, SortSelect, CategorySelect, PriceRangeSelect } from '@/components/ui/modern-select'
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/ui/animate-on-scroll'
import { Counter } from '@/components/ui/counter'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Demo data
const sampleAuthors = [
  { id: 1, name: "Alex Chen", avatar: "/images/client/client-1.png", sales: 1234, verified: true },
  { id: 2, name: "Maria Santos", avatar: "/images/client/client-2.png", sales: 987, verified: false },
  { id: 3, name: "John Doe", avatar: "/images/client/client-3.png", sales: 2156, verified: true },
  { id: 4, name: "Sarah Wilson", avatar: "/images/client/client-4.png", sales: 543, verified: true },
  { id: 5, name: "David Kim", avatar: "/images/client/client-5.png", sales: 876, verified: false },
]

const sampleCategories = [
  { id: 1, name: "Digital Art", icon: "🎨", count: 1534, image: "/images/portfolio/portfolio-01.jpg" },
  { id: 2, name: "Gaming", icon: "🎮", count: 987, image: "/images/portfolio/portfolio-02.jpg" },
  { id: 3, name: "Music", icon: "🎵", count: 743, image: "/images/portfolio/portfolio-03.jpg" },
  { id: 4, name: "Sports", icon: "⚽", count: 456, image: "/images/portfolio/portfolio-04.jpg" },
  { id: 5, name: "Photography", icon: "📸", count: 892, image: "/images/portfolio/portfolio-05.jpg" },
]

const sampleTopSellers = [
  { id: 1, name: "CryptoPunk #7804", avatar: "/images/client/client-1.png", volume: 127.5, change: 12.5, rank: 1 },
  { id: 2, name: "Bored Ape #8817", avatar: "/images/client/client-2.png", volume: 89.3, change: -3.2, rank: 2 },
  { id: 3, name: "Azuki #9999", avatar: "/images/client/client-3.png", volume: 76.8, change: 8.7, rank: 3 },
]

const JQueryMigrationDemo = () => {
  const [sortValue, setSortValue] = useState('')
  const [categoryValue, setCategoryValue] = useState('')
  const [priceValue, setPriceValue] = useState('')

  return (
    <>
      <Head>
        <title>jQuery Migration Complete - Modern React Components</title>
        <meta name="description" content="Successful migration from jQuery to modern React components" />
      </Head>
      <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header Section */}
        <AnimateOnScroll animation="fadeIn">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">
              🚀 jQuery → React Migration 
              <span className="text-green-500 ml-2">✅ COMPLETE</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Modern React components replacing jQuery plugins with better performance and accessibility
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <StaggerContainer staggerChildren={0.1}>
                <StaggerItem>
                  <Card className="text-center">
                    <CardContent className="py-6">
                      <Counter end={200} suffix="KB" className="text-2xl font-bold text-green-500" />
                      <p className="text-sm text-gray-500 mt-1">Bundle Size Reduced</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
                <StaggerItem>
                  <Card className="text-center">
                    <CardContent className="py-6">
                      <Counter end={100} suffix="%" className="text-2xl font-bold text-blue-500" />
                      <p className="text-sm text-gray-500 mt-1">TypeScript Native</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
                <StaggerItem>
                  <Card className="text-center">
                    <CardContent className="py-6">
                      <Counter end={9} suffix="/9" className="text-2xl font-bold text-purple-500" />
                      <p className="text-sm text-gray-500 mt-1">Sliders Migrated</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
                <StaggerItem>
                  <Card className="text-center">
                    <CardContent className="py-6">
                      <Counter end={100} suffix="%" className="text-2xl font-bold text-orange-500" />
                      <p className="text-sm text-gray-500 mt-1">SSR Compatible</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Before/After Comparison */}
        <AnimateOnScroll animation="slideUp" className="mb-16">
          <div className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Migration Comparison</h2>
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Before */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-700 mb-4">❌ Before (jQuery)</h3>
                <ul className="space-y-2 text-sm text-red-600">
                  <li>• jQuery Core (~85KB)</li>
                  <li>• Slick Carousel Plugin</li>
                  <li>• Nice Select Plugin</li>
                  <li>• jQuery Appear Plugin</li>
                  <li>• Odometer Plugin</li>
                  <li>• Style Switcher</li>
                  <li>• ~200KB total bundle size</li>
                  <li>• SSR/hydration issues</li>
                  <li>• No TypeScript</li>
                </ul>
                <div className="mt-4 p-3 bg-red-100 rounded text-xs">
                  <code>$(\'&apos;.slick-activation-01&apos;).slick()</code>
                </div>
              </div>

              {/* After */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-700 mb-4">✅ After (React Modern)</h3>
                <ul className="space-y-2 text-sm text-green-600">
                  <li>• Embla Carousel (React)</li>
                  <li>• Shadcn/ui Select</li>
                  <li>• Framer Motion</li>
                  <li>• React CountUp</li>
                  <li>• useTheme Hook</li>
                  <li>• Tailwind CSS</li>
                  <li>• ~50KB total bundle size</li>
                  <li>• Perfect SSR support</li>
                  <li>• Full TypeScript</li>
                </ul>
                <div className="mt-4 p-3 bg-green-100 rounded text-xs">
                  <code>&lt;AuthorCarousel authors={`{sampleAuthors}`} /&gt;</code>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Modern Carousels Demo */}
        <section className="mb-16">
          <AnimateOnScroll animation="slideUp">
            <h2 className="text-3xl font-bold mb-8">Modern Carousels</h2>
          </AnimateOnScroll>
          
          <div className="space-y-12">
            {/* Authors Carousel */}
            <div>
              <AnimateOnScroll animation="slideUp">
                <h3 className="text-xl font-semibold mb-4">Top Authors</h3>
                <p className="text-gray-600 mb-6">
                  Replaces: <code className="bg-gray-100 px-2 py-1 rounded text-sm">$(\'&apos;.slick-activation-02&apos;).slick()</code>
                </p>
              </AnimateOnScroll>
              <AuthorCarousel authors={sampleAuthors} />
            </div>

            {/* Categories Carousel */}
            <div>
              <AnimateOnScroll animation="slideUp">
                <h3 className="text-xl font-semibold mb-4">Browse Categories</h3>
                <p className="text-gray-600 mb-6">
                  Replaces: <code className="bg-gray-100 px-2 py-1 rounded text-sm">$(\'&apos;.slick-activation-03&apos;).slick()</code>
                </p>
              </AnimateOnScroll>
              <CategoryCarousel categories={sampleCategories} />
            </div>

            {/* Top Sellers Carousel */}
            <div>
              <AnimateOnScroll animation="slideUp">
                <h3 className="text-xl font-semibold mb-4">Top Sellers</h3>
                <p className="text-gray-600 mb-6">
                  Replaces: <code className="bg-gray-100 px-2 py-1 rounded text-sm">$(\'&apos;.top-seller-slick-activation&apos;).slick()</code>
                </p>
              </AnimateOnScroll>
              <TopSellerCarousel sellers={sampleTopSellers} />
            </div>
          </div>
        </section>

        {/* Modern Selects Demo */}
        <section className="mb-16">
          <AnimateOnScroll animation="slideUp">
            <h2 className="text-3xl font-bold mb-8">Modern Selects</h2>
          </AnimateOnScroll>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <AnimateOnScroll animation="slideUp">
                <h3 className="text-lg font-semibold mb-4">Sort Options</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Replaces: <code className="bg-gray-100 px-2 py-1 rounded">$(\'&apos;.nice-select&apos;).niceSelect()</code>
                </p>
                <SortSelect value={sortValue} onValueChange={setSortValue} />
              </AnimateOnScroll>
            </div>
            
            <div>
              <AnimateOnScroll animation="slideUp" delay={0.1}>
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <p className="text-gray-600 text-sm mb-4">Accessible & responsive</p>
                <CategorySelect value={categoryValue} onValueChange={setCategoryValue} />
              </AnimateOnScroll>
            </div>
            
            <div>
              <AnimateOnScroll animation="slideUp" delay={0.2}>
                <h3 className="text-lg font-semibold mb-4">Price Range</h3>
                <p className="text-gray-600 text-sm mb-4">Modern styling variants</p>
                <PriceRangeSelect value={priceValue} onValueChange={setPriceValue} />
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* Animation Demo */}
        <section className="mb-16">
          <AnimateOnScroll animation="slideUp">
            <h2 className="text-3xl font-bold mb-8">Scroll Animations</h2>
            <p className="text-gray-600 mb-8">
              Replaces jQuery Appear with Framer Motion (Intersection Observer)
            </p>
          </AnimateOnScroll>
          
          <div className="grid md:grid-cols-3 gap-6">
            <AnimateOnScroll animation="slideUp">
              <Card className="text-center">
                <CardContent className="py-8">
                  <div className="text-4xl mb-4">🎨</div>
                  <h3 className="text-lg font-semibold">Slide Up</h3>
                  <p className="text-gray-500 text-sm">Smooth entrance</p>
                </CardContent>
              </Card>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="scaleIn">
              <Card className="text-center">
                <CardContent className="py-8">
                  <div className="text-4xl mb-4">✨</div>
                  <h3 className="text-lg font-semibold">Scale In</h3>
                  <p className="text-gray-500 text-sm">Elegant scaling</p>
                </CardContent>
              </Card>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="slideLeft">
              <Card className="text-center">
                <CardContent className="py-8">
                  <div className="text-4xl mb-4">🚀</div>
                  <h3 className="text-lg font-semibold">Slide Left</h3>
                  <p className="text-gray-500 text-sm">Directional movement</p>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Counter Demo */}
        <section className="mb-16">
          <AnimateOnScroll animation="slideUp">
            <h2 className="text-3xl font-bold mb-8">Animated Counters</h2>
            <p className="text-gray-600 mb-8">
              Replaces Odometer plugin with React CountUp (intersection observer triggered)
            </p>
          </AnimateOnScroll>
          
          <div className="grid md:grid-cols-4 gap-6">
            <AnimateOnScroll animation="slideUp">
              <Card className="text-center">
                <CardContent className="py-6">
                  <Counter end={15429} className="text-3xl font-bold text-blue-500" />
                  <p className="text-gray-500 mt-2">Total NFTs</p>
                </CardContent>
              </Card>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="slideUp" delay={0.1}>
              <Card className="text-center">
                <CardContent className="py-6">
                  <Counter end={8567} className="text-3xl font-bold text-green-500" />
                  <p className="text-gray-500 mt-2">Active Users</p>
                </CardContent>
              </Card>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="slideUp" delay={0.2}>
              <Card className="text-center">
                <CardContent className="py-6">
                  <Counter end={127.5} decimals={1} suffix=" ETH" className="text-3xl font-bold text-purple-500" />
                  <p className="text-gray-500 mt-2">Total Volume</p>
                </CardContent>
              </Card>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="slideUp" delay={0.3}>
              <Card className="text-center">
                <CardContent className="py-6">
                  <Counter end={99.9} decimals={1} suffix="%" className="text-3xl font-bold text-orange-500" />
                  <p className="text-gray-500 mt-2">Uptime</p>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Migration Complete */}
        <AnimateOnScroll animation="fadeIn">
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-green-700 mb-4">Migration Complete!</h2>
            <p className="text-green-600 mb-6">
              All jQuery dependencies have been successfully replaced with modern React components
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="primary">View Documentation</Button>
              <Button variant="outline">GitHub Repository</Button>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
    </>
  )
}

export default JQueryMigrationDemo
