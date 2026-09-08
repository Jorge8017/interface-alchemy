import { useReveal } from '../hooks/useReveal'

export default function Reveal({ as: Tag = 'div', className = '', children, ...props }) {
  const ref = useReveal()
  const classes = ['reveal', className].filter(Boolean).join(' ')

  return (
    <Tag ref={ref} className={classes} {...props}>
      {children}
    </Tag>
  )
}
