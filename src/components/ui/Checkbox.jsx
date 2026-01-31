import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

const Checkbox = forwardRef(({
    label,
    className,
    ...props
}, ref) => {
    return (
        <label className="flex items-center space-x-2 cursor-pointer">
            <input
                type="checkbox"
                ref={ref}
                className={cn(
                    'w-4 h-4 text-primary-600 border-gray-300 rounded',
                    'focus:ring-2 focus:ring-primary-500',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    className
                )}
                {...props}
            />
            {label && (
                <span className="text-sm text-gray-700">{label}</span>
            )}
        </label>
    )
})

Checkbox.displayName = 'Checkbox'

export default Checkbox
