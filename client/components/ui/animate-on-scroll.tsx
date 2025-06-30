"use client"

import React, { forwardRef } from 'react'
import { motion, type Variants, type MotionProps } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'

interface AnimateOnScrollProps extends Omit<MotionProps, 'variants' | 'initial' | 'animate'> {
  children: React.ReactNode
  className?: string
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'rotateIn'
  duration?: number
  delay?: number
  threshold?: number
  triggerOnce?: boolean
  offset?: '0px'
  stagger?: boolean
  staggerChildren?: number
  distance?: number
}

const AnimateOnScroll = forwardRef<HTMLDivElement, AnimateOnScrollProps>(
  ({
    children,
    className,
    animation = 'fadeIn',
    duration = 0.6,
    delay = 0,
    threshold = 0.1,
    triggerOnce = true,
    offset = '0px',
    stagger = false,
    staggerChildren = 0.1,
    distance = 60,
    ...motionProps
  }, ref) => {
    const [inViewRef, inView] = useInView({
      threshold,
      triggerOnce,
      rootMargin: offset,
    })

    // Custom animations with dynamic distance
    const customAnimations: Record<string, Variants> = {
      fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      },
      slideUp: {
        hidden: { opacity: 0, y: distance },
        visible: { opacity: 1, y: 0 },
      },
      slideDown: {
        hidden: { opacity: 0, y: -distance },
        visible: { opacity: 1, y: 0 },
      },
      slideLeft: {
        hidden: { opacity: 0, x: distance },
        visible: { opacity: 1, x: 0 },
      },
      slideRight: {
        hidden: { opacity: 0, x: -distance },
        visible: { opacity: 1, x: 0 },
      },
      scaleIn: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
      },
      rotateIn: {
        hidden: { opacity: 0, rotate: -10, scale: 0.9 },
        visible: { opacity: 1, rotate: 0, scale: 1 },
      },
    }

    const setRefs = React.useCallback((node: HTMLDivElement) => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(node)
        } else {
          ref.current = node
        }
      }
      inViewRef(node)
    }, [ref, inViewRef])

    const variants = customAnimations[animation]

    const transition = {
      duration,
      delay,
      ease: "easeOut" as const,
    }

    const staggerConfig = stagger ? {
      staggerChildren,
      delayChildren: delay,
    } : {}

    return (
      <motion.div
        ref={setRefs}
        variants={variants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{
          ...transition,
          ...staggerConfig,
        }}
        className={cn(className)}
        {...motionProps}
      >
        {children}
      </motion.div>
    )
  }
)

AnimateOnScroll.displayName = "AnimateOnScroll"

// Stagger container for child animations
const StaggerContainer = forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  staggerChildren?: number
  delayChildren?: number
} & MotionProps>(
  ({
    children,
    className,
    staggerChildren = 0.1,
    delayChildren = 0,
    ...motionProps
  }, ref) => {
    const [inViewRef, inView] = useInView({
      threshold: 0.1,
      triggerOnce: true,
    })

    const setRefs = React.useCallback((node: HTMLDivElement) => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(node)
        } else {
          ref.current = node
        }
      }
      inViewRef(node)
    }, [ref, inViewRef])

    const containerVariants: Variants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren,
          delayChildren,
        },
      },
    }

    return (
      <motion.div
        ref={setRefs}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className={cn(className)}
        {...motionProps}
      >
        {children}
      </motion.div>
    )
  }
)

StaggerContainer.displayName = "StaggerContainer"

// Item component for stagger animations
const StaggerItem = forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  animation?: AnimateOnScrollProps['animation']
  distance?: number
} & MotionProps>(
  ({
    children,
    className,
    animation = 'slideUp',
    distance = 30,
    ...motionProps
  }, ref) => {
    const itemVariants: Variants = {
      hidden: {
        opacity: 0,
        y: animation === 'slideUp' ? distance : animation === 'slideDown' ? -distance : 0,
        x: animation === 'slideLeft' ? distance : animation === 'slideRight' ? -distance : 0,
        scale: animation === 'scaleIn' ? 0.8 : 1,
      },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        transition: {
          duration: 0.6,
          ease: "easeOut" as const,
        },
      },
    }

    return (
      <motion.div
        ref={ref}
        variants={itemVariants}
        className={cn(className)}
        {...motionProps}
      >
        {children}
      </motion.div>
    )
  }
)

StaggerItem.displayName = "StaggerItem"

export { AnimateOnScroll, StaggerContainer, StaggerItem }
export type { AnimateOnScrollProps }
