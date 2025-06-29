"use client"

import React from 'react'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll'
import { Counter } from '@/components/ui/counter'

// AuthorCarousel - Reemplaza .slick-activation-02
// Configuración original: slidesToShow: 4, responsive: [2, 1, 1]
interface Author {
  id: number
  name: string
  avatar: string
  sales: number
  verified: boolean
}

interface AuthorCarouselProps {
  authors: Author[]
  className?: string
}

export function AuthorCarousel({ authors, className }: AuthorCarouselProps) {
  return (
    <AnimateOnScroll animation="slideUp" className={className}>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        showArrows={true}
        showDots={false}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {authors.map((author) => (
            <CarouselItem 
              key={author.id} 
              className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/4"
            >
              <Card className="border-0 bg-transparent">
                <CardContent className="p-6 text-center">
                  <div className="relative mx-auto w-20 h-20 mb-4">
                    <img
                      src={author.avatar || "/images/client/client-2.png"}
                      alt={author.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                    {author.verified && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{author.name}</h4>
                  <p className="text-sm text-gray-500">
                    <Counter 
                      end={author.sales} 
                      suffix=" NFTs sold"
                      className="font-medium"
                    />
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </AnimateOnScroll>
  )
}

// CategoryCarousel - Reemplaza .slick-activation-03
// Configuración original: slidesToShow: 5, slidesToScroll: 2
interface Category {
  id: number
  name: string
  icon: string
  count: number
  image: string
}

interface CategoryCarouselProps {
  categories: Category[]
  className?: string
}

export function CategoryCarousel({ categories, className }: CategoryCarouselProps) {
  return (
    <AnimateOnScroll animation="slideUp" className={className}>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        showArrows={true}
        showDots={false}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {categories.map((category) => (
            <CarouselItem 
              key={category.id} 
              className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="relative mb-4 overflow-hidden rounded-lg">
                    <img
                      src={category.image || "/images/portfolio/portfolio-01.jpg"}
                      alt={category.name}
                      className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h4 className="text-base font-semibold mb-1">{category.name}</h4>
                  <p className="text-sm text-gray-500">
                    <Counter 
                      end={category.count} 
                      suffix=" items"
                      className="text-xs"
                    />
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </AnimateOnScroll>
  )
}

// TopSellerCarousel - Reemplaza .top-seller-slick-activation
interface TopSeller {
  id: number
  name: string
  avatar: string
  volume: number
  change: number
  rank: number
}

interface TopSellerCarouselProps {
  sellers: TopSeller[]
  className?: string
}

export function TopSellerCarousel({ sellers, className }: TopSellerCarouselProps) {
  return (
    <AnimateOnScroll animation="slideUp" className={className}>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        showArrows={true}
        showDots={false}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {sellers.map((seller) => (
            <CarouselItem 
              key={seller.id} 
              className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3"
            >
              <Card className="border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <span className="absolute -top-2 -left-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {seller.rank}
                      </span>
                      <img
                        src={seller.avatar || "/images/client/client-1.png"}
                        alt={seller.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{seller.name}</h4>
                      <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                        <span>
                          <Counter 
                            end={seller.volume} 
                            suffix=" ETH"
                            decimals={2}
                            className="font-medium"
                          />
                        </span>
                        <span className={`font-medium ${seller.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {seller.change >= 0 ? '+' : ''}{seller.change}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </AnimateOnScroll>
  )
}
