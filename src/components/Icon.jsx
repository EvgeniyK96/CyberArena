export default function Icon({ name, fill, className = '', ...rest }) {
  return (
    <span className={`ms ${fill ? 'fill' : ''} ${className}`} aria-hidden="true" {...rest}>
      {name}
    </span>
  )
}
