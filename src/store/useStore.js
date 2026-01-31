import { create } from 'zustand'
import { supabase } from '../lib/supabase'

/**
 * Global Zustand store for Village CRM
 */
export const useStore = create((set, get) => ({
    // State
    villages: [],
    selectedVillage: null,
    households: [],
    loading: false,
    error: null,

    // Actions

    /**
     * Fetch all villages from Supabase
     */
    fetchVillages: async () => {
        set({ loading: true, error: null })
        try {
            const { data, error } = await supabase
                .from('villages')
                .select('*')
                .order('name')

            if (error) throw error

            set({ villages: data, loading: false })

            // Auto-select first village if none selected
            if (data.length > 0 && !get().selectedVillage) {
                set({ selectedVillage: data[0] })
                get().fetchHouseholds(data[0].id)
            }
        } catch (error) {
            set({ error: error.message, loading: false })
            console.error('Error fetching villages:', error)
        }
    },

    /**
     * Select a village and fetch its households
     */
    selectVillage: async (village) => {
        set({ selectedVillage: village })
        await get().fetchHouseholds(village.id)
    },

    /**
     * Fetch households for a specific village
     */
    fetchHouseholds: async (villageId) => {
        set({ loading: true, error: null })
        try {
            const { data, error } = await supabase
                .from('households')
                .select('*')
                .eq('village_id', villageId)
                .order('house_number')

            if (error) throw error

            set({ households: data, loading: false })
        } catch (error) {
            set({ error: error.message, loading: false })
            console.error('Error fetching households:', error)
        }
    },

    /**
     * Add a new household
     */
    addHousehold: async (householdData) => {
        set({ loading: true, error: null })
        try {
            const { data, error } = await supabase
                .from('households')
                .insert([householdData])
                .select()

            if (error) throw error

            // Refresh households list
            await get().fetchHouseholds(householdData.village_id)

            set({ loading: false })
            return { success: true, data }
        } catch (error) {
            set({ error: error.message, loading: false })
            console.error('Error adding household:', error)
            return { success: false, error: error.message }
        }
    },

    /**
     * Update an existing household
     */
    updateHousehold: async (id, householdData) => {
        set({ loading: true, error: null })
        try {
            const { data, error } = await supabase
                .from('households')
                .update(householdData)
                .eq('id', id)
                .select()

            if (error) throw error

            // Refresh households list
            const currentVillage = get().selectedVillage
            if (currentVillage) {
                await get().fetchHouseholds(currentVillage.id)
            }

            set({ loading: false })
            return { success: true, data }
        } catch (error) {
            set({ error: error.message, loading: false })
            console.error('Error updating household:', error)
            return { success: false, error: error.message }
        }
    },

    /**
     * Delete a household
     */
    deleteHousehold: async (id) => {
        set({ loading: true, error: null })
        try {
            const { error } = await supabase
                .from('households')
                .delete()
                .eq('id', id)

            if (error) throw error

            // Refresh households list
            const currentVillage = get().selectedVillage
            if (currentVillage) {
                await get().fetchHouseholds(currentVillage.id)
            }

            set({ loading: false })
            return { success: true }
        } catch (error) {
            set({ error: error.message, loading: false })
            console.error('Error deleting household:', error)
            return { success: false, error: error.message }
        }
    },

    /**
     * Upload photo to Supabase Storage
     */
    uploadPhoto: async (file, householdId) => {
        try {
            const fileExt = file.name.split('.').pop()
            const fileName = `${householdId}-${Date.now()}.${fileExt}`
            const filePath = `household-photos/${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('photos')
                .upload(filePath, file)

            if (uploadError) throw uploadError

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('photos')
                .getPublicUrl(filePath)

            return { success: true, url: publicUrl }
        } catch (error) {
            console.error('Error uploading photo:', error)
            return { success: false, error: error.message }
        }
    },

    /**
     * Get statistics for current village
     */
    getStats: () => {
        const households = get().households

        const totalHouseholds = households.length
        const totalPopulation = households.reduce(
            (sum, h) => sum + (h.family_members_count || 0),
            0
        )

        // Count unique schemes
        const schemesSet = new Set()
        households.forEach(h => {
            if (h.schemes && Array.isArray(h.schemes)) {
                h.schemes.forEach(scheme => schemesSet.add(scheme))
            }
        })

        return {
            totalHouseholds,
            totalPopulation,
            schemesCount: schemesSet.size
        }
    }
}))
