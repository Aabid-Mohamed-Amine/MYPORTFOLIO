import { type HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type BadgeVariant = 'green' | 'blue' | 'gray' | 'outline'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

export function Badge({ className, variant = 'green', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-xs font-medium transition-colors',
        {
          'border border-primary/40 bg-primary/10 text-primary hover:border-primary hover:bg-primary/15':
            variant === 'green',
          'border border-blue-500/40 bg-blue-500/10 text-blue-400 hover:border-blue-500':
            variant === 'blue',
          'border border-muted/40 bg-surface-raised text-muted':
            variant === 'gray',
          'border border-custom bg-transparent text-foreground':
            variant === 'outline',
        },
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
