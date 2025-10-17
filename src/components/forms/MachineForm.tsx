// MachineForm.tsx
import { MachineValidator, type CreateMachineData, type Machine, type UpdateMachineData } from '@/hooks/useMachines';
import React, { useState } from 'react';
// TODO: Later change imports to:
// import { Machine } from './types/machine.types';
// import { CreateMachineData, UpdateMachineData } from './schemas/machine.schemas';
// import { MachineValidator } from './utils/machine.validator';


// ========================================
// FORM PROPS - Keep in this file
// ========================================
interface CreateMachineFormProps {
  onSubmit: (data: CreateMachineData) => Promise<void>;
  onCancel: () => void;
  mode: 'create';
}

interface UpdateMachineFormProps {
  machine: Machine;
  onSubmit: (data: UpdateMachineData) => Promise<void>;
  onCancel: () => void;
  mode: 'update';
}

type MachineFormProps = CreateMachineFormProps | UpdateMachineFormProps;

// ========================================
// MAIN FORM COMPONENT - Keep in this file
// ========================================
const MachineForm: React.FC<MachineFormProps> = ({ 
  onSubmit, 
  onCancel, 
  mode,
  ...props 
}) => {
  const machine = 'machine' in props ? props.machine : undefined;
  
  const [formData, setFormData] = useState({
    code_name: machine?.code_name || '',
    name: machine?.name || '',
    crushing_plant_id: machine?.crushing_plant_id || null,
    ref_hardware: machine?.ref_hardware || '',
    ...(mode === 'update' && machine ? { id: machine.id } : {}),
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form validation using Zod validator
  // const validateForm = () => {
  //   const result = MachineValidator.validateByMode(mode, formData);
    
  //   if (!result.success) {
  //     const newErrors: Record<string, string> = {};
  //     result.error.errors.forEach((err) => {
  //       if (err.path[0]) {
  //         newErrors[err.path[0] as string] = err.message;
  //       }
  //     });
  //     setErrors(newErrors);
  //     return false;
  //   }
    
  //   setErrors({});
  //   return true;
  // };

  // Validate individual field and show errors immediately
  // const validateAndShowFieldError = (field: string, value: unknown) => {
  //   const error = MachineValidator.validateField(field, value, mode);
  //   setErrors(prev => ({ ...prev, [field]: error }));
  //   return error === '';
  // };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate the form and show errors for all invalid fields
    const result = MachineValidator.validateByMode(mode, formData);
    
    if (!result.success) {
      // Extract all errors and set them
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      console.log('Form validation errors:', newErrors); // Debug log
      return; // Stop submission
    }
    
    // Clear any existing errors if validation passes
    setErrors({});
    
    setIsSubmitting(true);
    
    try {
      if (mode === 'create') {
        await onSubmit({
          code_name: formData.code_name.trim(),
          name: formData.name.trim(),
          ref_hardware: formData.ref_hardware.trim(),
        });
      } else {
        await onSubmit({
          id: machine!.id,
          code_name: formData.code_name.trim(),
          name: formData.name.trim(),
          crushing_plant_id: formData.crushing_plant_id,
          ref_hardware: formData.ref_hardware.trim(),
        });
      }
      onCancel();
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes with real-time validation
  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = field === 'crushing_plant_id' 
      ? e.target.value === '' ? null : Number(e.target.value)
      : e.target.value;
    
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Real-time field validation
    const error = MachineValidator.validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  // Check if field has error
  const hasError = (field: string) => {
    return !!errors[field];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Code Name Field */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Code Name *
        </label>
        <input
          type="text"
          value={formData.code_name}
          onChange={handleChange('code_name')}
          required
          className={`w-full p-2 border rounded transition-colors ${
            hasError('code_name') 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
          } focus:outline-none focus:ring-2`}
          placeholder="e.g., MCH001"
        />
        {errors.code_name && (
          <p className="text-red-500 text-sm mt-1">{errors.code_name}</p>
        )}
      </div>

      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={handleChange('name')}
          required
          className={`w-full p-2 border rounded transition-colors ${
            hasError('name') 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
          } focus:outline-none focus:ring-2`}
          placeholder="e.g., Primary Crusher"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Crushing Plant ID Field - Only show in update mode */}
      {mode === 'update' && (
        <div>
          <label className="block text-sm font-medium mb-1">
            Crushing Plant ID
          </label>
          <input
            type="number"
            value={formData.crushing_plant_id || ''}
            onChange={handleChange('crushing_plant_id')}
            min="1"
            className={`w-full p-2 border rounded transition-colors ${
              hasError('crushing_plant_id') 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            } focus:outline-none focus:ring-2`}
            placeholder="e.g., 1"
          />
          {errors.crushing_plant_id && (
            <p className="text-red-500 text-sm mt-1">{errors.crushing_plant_id}</p>
          )}
        </div>
      )}

      {/* Reference Hardware Field */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Reference Hardware *
        </label>
        <input
          type="text"
          value={formData.ref_hardware}
          onChange={handleChange('ref_hardware')}
          required
          className={`w-full p-2 border rounded transition-colors ${
            hasError('ref_hardware') 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            } focus:outline-none focus:ring-2`}
          placeholder="e.g., CAT-320D"
        />
        {errors.ref_hardware && (
          <p className="text-red-500 text-sm mt-1">{errors.ref_hardware}</p>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Machine' : 'Update Machine'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default MachineForm;