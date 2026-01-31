import clsx from 'clsx'

/**
 * Utility function for conditional class names
 */
export function cn(...inputs) {
    return clsx(inputs)
}

/**
 * Format phone numbers for display
 */
export function formatPhoneNumber(number) {
    if (!number) return ''
    // Remove all non-numeric characters
    const cleaned = number.replace(/\D/g, '')
    // Format as XXX-XXX-XXXX or similar
    if (cleaned.length === 10) {
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
    }
    return number
}

/**
 * Format array of phone numbers
 */
export function formatPhoneNumbers(numbers) {
    if (!numbers || !Array.isArray(numbers)) return ''
    return numbers.map(formatPhoneNumber).join(', ')
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text, maxLength = 50) {
    if (!text) return ''
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
}

/**
 * Format date to readable string
 */
export function formatDate(date) {
    if (!date) return ''
    return new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

/**
 * Debounce function for search inputs
 */
export function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}
