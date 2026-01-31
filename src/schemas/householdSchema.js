import { z } from 'zod'

/**
 * Zod schema for household form validation
 */
export const householdSchema = z.object({
    village_id: z.string().uuid('Please select a village'),
    house_number: z.string().min(1, 'House number is required'),
    head_name: z.string().min(2, 'Head name must be at least 2 characters'),
    head_gender: z.string().optional(),
    family_members_count: z.number().min(1, 'Must have at least 1 family member').default(1),
    mobile_numbers: z.array(z.string()).optional().default([]),
    ration_card_status: z.string().optional(),
    schemes: z.array(z.string()).optional().default([]),
    sons_names: z.array(z.string()).optional().default([]),
    daughters_names: z.array(z.string()).optional().default([]),
    photo_url: z.string().optional(),
    notes: z.string().optional()
})
