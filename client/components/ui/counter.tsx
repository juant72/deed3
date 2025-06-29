"use client"

import React, { useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { cn } from '@/lib/utils'

interface CounterProps {
  end: number
  start?: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  separator?: string
  preserveValue?: boolean
  useEasing?: boolean
  useGrouping?: boolean
  className?: string
  onStart?: () => void
  onEnd?: () => void
  onPauseResume?: () => void
  triggerOnView?: boolean
  threshold?: number
  triggerOnce?: boolean
}

const Counter = React.forwardRef<HTMLSpanElement, CounterProps>(({
  end,
  start = 0,
  duration = 2,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = ',',
  preserveValue = false,
  useEasing = true,
  useGrouping = true,
  className,
  onStart,
  onEnd,
  onPauseResume,
  triggerOnView = true,
  threshold = 0.3,
  triggerOnce = true,
}, ref) => {
  const counterRef = useRef<HTMLSpanElement>(null)
  const [inViewRef, inView] = useInView({
    threshold: threshold,
    triggerOnce: triggerOnce,
  })

  // Set refs
  React.useImperativeHandle(ref, () => counterRef.current as HTMLSpanElement)

  const setRefs = React.useCallback((node: HTMLSpanElement) => {
    counterRef.current = node
    inViewRef(node)
  }, [inViewRef])

  const shouldStart = triggerOnView ? inView : true

  return (
    <span 
      ref={setRefs} 
      className={cn("font-bold tabular-nums", className)}
    >
      {shouldStart ? (
        <CountUp
          start={start}
          end={end}
          duration={duration}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
          separator={separator}
          preserveValue={preserveValue}
          useEasing={useEasing}
          useGrouping={useGrouping}
          onStart={onStart}
          onEnd={onEnd}
          onPauseResume={onPauseResume}
        />
      ) : (
        start
      )}
    </span>
  )
})

Counter.displayName = "Counter"

export { Counter }
export type { CounterProps }
