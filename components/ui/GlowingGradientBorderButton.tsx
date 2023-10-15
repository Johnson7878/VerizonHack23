import React from 'react'


function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

type Props = {
  gradient: string    // 'bg-gradient-to-r from-red-600 via-purple-600 to-blue-600',
  children: React.ReactNode
  href: string
  target?: string
  rel?: string
}

export default function GlowingGradientBorderButton({
  gradient,
  children,
  href,
  target = '_blank',
  rel = 'noreferrer noopener'
}: Props) {
  return (
    <div className="flex justify-center">
      <div className="relative group">
        <div className={
          cn(
            'absolute -inset-0.5 rounded-2xl blur group-hover:blur-xl opacity-75 transition duration-500 group-hover:duration-200 group-hover:opacity-100 will-change-filter overflow-hidden',
            gradient
          )}
        />
        <a
          className="relative block w-23 h-4 md:h-10 group-hover:scale-205 duration-500 group-hover:duration-200"
          href={href}
          target={target}
          rel={rel}
        >
          <div className={cn('block h-10 inset-1 rounded-xl p-1', gradient)}>
            <span className="h-20 p-1 items-center px-6 bg-neutral-900 text-neutral-50 rounded-lg">
              {children}
            </span>
          </div>
        </a>
      </div>
    </div>
  )
}