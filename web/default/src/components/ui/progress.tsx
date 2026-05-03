'use client'

import { Progress as ProgressPrimitive } from '@base-ui/react/progress'
import { cn } from '@/lib/utils'

function Progress({
  className,
  ...props
}: ProgressPrimitive.Root.Props) {
  return (
    <ProgressPrimitive.Root
      data-slot='progress'
      className={cn('w-full', className)}
      {...props}
    >
      <ProgressPrimitive.Track
        data-slot='progress-track'
        className='bg-primary/20 relative h-2 w-full overflow-hidden rounded-full'
      >
        <ProgressPrimitive.Indicator
          data-slot='progress-indicator'
          className='bg-primary h-full w-full flex-1 transition-all'
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  )
}

export { Progress }
