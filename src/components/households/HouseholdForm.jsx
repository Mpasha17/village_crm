import { useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, X } from 'lucide-react'
import { householdSchema } from '../../schemas/householdSchema'
import { useStore } from '../../store/useStore'
import { SCHEMES, RATION_CARD_STATUS, GENDER_OPTIONS } from '../../constants/schemes'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Checkbox from '../ui/Checkbox'
import Button from '../ui/Button'

export default function HouseholdForm({ isOpen, onClose, household = null }) {
    const { villages, selectedVillage, addHousehold, updateHousehold } = useStore()
    const [selectedSchemes, setSelectedSchemes] = useState([])
    const isEditing = !!household

    const {
        register,
        handleSubmit,
        reset,
        control,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(householdSchema),
        defaultValues: {
            village_id: selectedVillage?.id || '',
            house_number: '',
            head_name: '',
            head_gender: '',
            family_members_count: 1,
            mobile_numbers: [''],
            ration_card_status: '',
            schemes: [],
            sons_names: [''],
            daughters_names: [''],
            notes: ''
        }
    })

    const { fields: mobileFields, append: appendMobile, remove: removeMobile } = useFieldArray({
        control,
        name: 'mobile_numbers'
    })

    const { fields: sonsFields, append: appendSon, remove: removeSon } = useFieldArray({
        control,
        name: 'sons_names'
    })

    const { fields: daughtersFields, append: appendDaughter, remove: removeDaughter } = useFieldArray({
        control,
        name: 'daughters_names'
    })

    useEffect(() => {
        if (household) {
            // Populate form with household data
            Object.keys(household).forEach((key) => {
                if (key === 'schemes') {
                    setSelectedSchemes(household[key] || [])
                    setValue('schemes', household[key] || [])
                } else if (key === 'mobile_numbers' || key === 'sons_names' || key === 'daughters_names') {
                    setValue(key, household[key]?.length > 0 ? household[key] : [''])
                } else {
                    setValue(key, household[key])
                }
            })
        } else {
            reset({
                village_id: selectedVillage?.id || '',
                house_number: '',
                head_name: '',
                head_gender: '',
                family_members_count: 1,
                mobile_numbers: [''],
                ration_card_status: '',
                schemes: [],
                sons_names: [''],
                daughters_names: [''],
                notes: ''
            })
            setSelectedSchemes([])
        }
    }, [household, selectedVillage, reset, setValue])

    const handleSchemeToggle = (scheme) => {
        const newSchemes = selectedSchemes.includes(scheme)
            ? selectedSchemes.filter((s) => s !== scheme)
            : [...selectedSchemes, scheme]

        setSelectedSchemes(newSchemes)
        setValue('schemes', newSchemes)
    }

    const onSubmit = async (data) => {
        // Filter out empty strings from arrays
        const cleanedData = {
            ...data,
            mobile_numbers: data.mobile_numbers.filter(n => n.trim() !== ''),
            sons_names: data.sons_names.filter(n => n.trim() !== ''),
            daughters_names: data.daughters_names.filter(n => n.trim() !== ''),
            schemes: selectedSchemes
        }

        let result
        if (isEditing) {
            result = await updateHousehold(household.id, cleanedData)
        } else {
            result = await addHousehold(cleanedData)
        }

        if (result.success) {
            onClose()
            reset()
            setSelectedSchemes([])
        } else {
            alert(`Error: ${result.error}`)
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEditing ? 'Edit Household' : 'Add New Household'}
            size="lg"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Village Selection */}
                <Select
                    label="Village *"
                    {...register('village_id')}
                    error={errors.village_id?.message}
                    options={villages.map(v => ({ value: v.id, label: v.name }))}
                />

                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="House Number *"
                        {...register('house_number')}
                        error={errors.house_number?.message}
                        placeholder="e.g., 123"
                    />
                    <Input
                        label="Head Name *"
                        {...register('head_name')}
                        error={errors.head_name?.message}
                        placeholder="Full name"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Select
                        label="Gender"
                        {...register('head_gender')}
                        options={GENDER_OPTIONS}
                    />
                    <Input
                        label="Family Members Count"
                        type="number"
                        {...register('family_members_count', { valueAsNumber: true })}
                        error={errors.family_members_count?.message}
                        min="1"
                    />
                </div>

                {/* Mobile Numbers */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mobile Numbers
                    </label>
                    <div className="space-y-2">
                        {mobileFields.map((field, index) => (
                            <div key={field.id} className="flex items-center space-x-2">
                                <Input
                                    {...register(`mobile_numbers.${index}`)}
                                    placeholder="10-digit mobile number"
                                    className="flex-1"
                                />
                                {mobileFields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeMobile(index)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => appendMobile('')}
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Mobile Number
                        </Button>
                    </div>
                </div>

                {/* Ration Card */}
                <Select
                    label="Ration Card Status"
                    {...register('ration_card_status')}
                    options={RATION_CARD_STATUS}
                />

                {/* Schemes */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Government Schemes
                    </label>
                    <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
                        {SCHEMES.map((scheme) => (
                            <Checkbox
                                key={scheme}
                                label={scheme}
                                checked={selectedSchemes.includes(scheme)}
                                onChange={() => handleSchemeToggle(scheme)}
                            />
                        ))}
                    </div>
                </div>

                {/* Sons Names */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sons Names
                    </label>
                    <div className="space-y-2">
                        {sonsFields.map((field, index) => (
                            <div key={field.id} className="flex items-center space-x-2">
                                <Input
                                    {...register(`sons_names.${index}`)}
                                    placeholder="Son's name"
                                    className="flex-1"
                                />
                                {sonsFields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeSon(index)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => appendSon('')}
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Son
                        </Button>
                    </div>
                </div>

                {/* Daughters Names */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Daughters Names
                    </label>
                    <div className="space-y-2">
                        {daughtersFields.map((field, index) => (
                            <div key={field.id} className="flex items-center space-x-2">
                                <Input
                                    {...register(`daughters_names.${index}`)}
                                    placeholder="Daughter's name"
                                    className="flex-1"
                                />
                                {daughtersFields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeDaughter(index)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => appendDaughter('')}
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Daughter
                        </Button>
                    </div>
                </div>

                {/* Notes */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Notes / Information Provider
                    </label>
                    <textarea
                        {...register('notes')}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Additional information..."
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3 pt-4 border-t">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : isEditing ? 'Update' : 'Add Household'}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
