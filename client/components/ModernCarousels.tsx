"use client"

import React from 'react'
import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { Counter } from '@/components/ui/counter'
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/ui/animate-on-scroll'

// Example: Replacement for .slick-activation-01
interface ProductCarouselProps {
  products: Array<{
    id: string
    title: string
    price: number
    image: string
    author: string
  }>
}

export function ProductCarousel({ products }: ProductCarouselProps) {
  return (
    <AnimateOnScroll animation="slideUp" className="px-4">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        autoplay={true}
        autoplayDelay={5000}
        showArrows={true}
        showDots={false}
        className="w-full max-w-7xl mx-auto"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {products.map((product, index) => (
            <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <StaggerItem>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-lg">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={400}
                        height={256}
                        className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
                        <p className="text-sm opacity-90">by {product.author}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">
                          <Counter
                            end={product.price}
                            duration={1}
                            prefix="$"
                            separator=","
                          />
                        </span>
                        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-12 h-12 w-12" />
        <CarouselNext className="-right-12 h-12 w-12" />
      </Carousel>
    </AnimateOnScroll>
  )
}

// Example: Replacement for statistics counter
interface StatsProps {
  stats: Array<{
    label: string
    value: number
    suffix?: string
    icon?: React.ReactNode
  }>
}

export function StatsSection({ stats }: StatsProps) {
  return (
    <AnimateOnScroll animation="slideUp" className="py-16">
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <StaggerItem key={index} className="text-center">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              {stat.icon && (
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    {stat.icon}
                  </div>
                </div>
              )}
              <div className="text-4xl font-bold text-gray-900 mb-2">
                <Counter
                  end={stat.value}
                  duration={2}
                  suffix={stat.suffix}
                  separator=","
                />
              </div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </AnimateOnScroll>
  )
}

// Example: Replacement for banner slider
interface BannerSliderProps {
  banners: Array<{
    id: string
    title: string
    subtitle: string
    description: string
    image: string
    ctaText: string
    ctaLink: string
  }>
}

export function BannerSlider({ banners }: BannerSliderProps) {
  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      autoplay={true}
      autoplayDelay={6000}
      showArrows={true}
      showDots={true}
      className="w-full"
    >
      <CarouselContent>
        {banners.map((banner) => (
          <CarouselItem key={banner.id} className="relative">
            <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-2xl">
              <Image
                src={banner.image}
                alt={banner.title}
                layout="fill"
                objectFit="cover"
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20" />
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-6">
                  <div className="max-w-2xl text-white">
                    <AnimateOnScroll animation="slideUp" delay={0.2}>
                      <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        {banner.title}
                      </h1>
                    </AnimateOnScroll>
                    <AnimateOnScroll animation="slideUp" delay={0.4}>
                      <h2 className="text-xl md:text-2xl mb-6 opacity-90">
                        {banner.subtitle}
                      </h2>
                    </AnimateOnScroll>
                    <AnimateOnScroll animation="slideUp" delay={0.6}>
                      <p className="text-lg mb-8 opacity-80">
                        {banner.description}
                      </p>
                    </AnimateOnScroll>
                    <AnimateOnScroll animation="slideUp" delay={0.8}>
                      <a
                        href={banner.ctaLink}
                        className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
                      >
                        {banner.ctaText}
                      </a>
                    </AnimateOnScroll>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-6" />
      <CarouselNext className="right-6" />
    </Carousel>
  )
}
