import { useState, useCallback } from 'react';
import z from 'zod';

// ========================================
// TODO: Move to types/machine.types.ts
// ========================================
export interface Machine {
  id: number;
  code_name: string;
  name: string;
  crushing_plant_id: number | null;
  ref_hardware: string;
  createdAt: string;
  updatedAt: string;
  status: number;
}

export interface DeleteMachineData {
  id: number;
}

// ========================================
// TODO: Move to schemas/machine.schemas.ts
// ========================================
export const BaseMachineSchema = z.object({
  code_name: z.string()
    .min(3, 'Code name must be at least 3 characters')
    .max(20, 'Code name must be less than 20 characters')
    .regex(/^[A-Z0-9_-]+$/i, 'Code name can only contain letters, numbers, underscores, and dashes'),
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  crushing_plant_id: z.number()
    .positive('Crushing plant ID must be positive')
    .nullable(),
  ref_hardware: z.string()
    .min(2, 'Reference hardware must be at least 2 characters')
    .max(30, 'Reference hardware must be less than 30 characters'),
});

export const CreateMachineSchema = BaseMachineSchema.pick({
  code_name: true,
  name: true,
  ref_hardware: true,
});

export const UpdateMachineSchema = BaseMachineSchema.extend({
  id: z.number().positive('ID must be positive'),
});

// Inferred types from schemas
export type CreateMachineData = z.infer<typeof CreateMachineSchema>;
export type UpdateMachineData = z.infer<typeof UpdateMachineSchema>;

// ========================================
// TODO: Move to utils/machine.validator.ts
// ========================================
export class MachineValidator {
  static readonly schemas = {
    create: CreateMachineSchema,
    update: UpdateMachineSchema,
  } as const;

  static validateCreate(data: unknown) {
    return this.schemas.create.safeParse(data);
  }

  static validateUpdate(data: unknown) {
    return this.schemas.update.safeParse(data);
  }

  static validateField(field: string, value: unknown) {
    try {
       // Get the base schema shape for field validation
      const baseShape = BaseMachineSchema.shape;
      
      // Check if field exists in the schema
      if (!(field in baseShape)) {
        return 'Unknown field';
      }
      
      // Get the specific field schema and validate
      const fieldSchema = baseShape[field as keyof typeof baseShape];
      fieldSchema.parse(value);
      return '';
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0]?.message || 'Invalid value';
      }
      return 'Invalid value';
    }
  }

  static validateByMode(mode: 'create' | 'update', data: unknown) {
    return mode === 'create' ? this.validateCreate(data) : this.validateUpdate(data);
  }
}

const mockMachines: Machine[] = [
  {
    id: 1,
    code_name: "MCH001",
    name: "Primary Crusher",
    crushing_plant_id: 1,
    ref_hardware: "CAT-320D",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    status: 1
  },
  {
    id: 2,
    code_name: "MCH002", 
    name: "Secondary Crusher",
    crushing_plant_id: 1,
    ref_hardware: "VOL-EC480E",
    createdAt: "2024-01-16T14:20:00Z",
    updatedAt: "2024-01-16T14:20:00Z",
    status: 1
  },
  {
    id: 3,
    code_name: "MCH003",
    name: "Conveyor Belt A",
    crushing_plant_id: null,
    ref_hardware: "CNV-1200",
    createdAt: "2024-01-17T09:15:00Z",
    updatedAt: "2024-01-17T09:15:00Z",
    status: 0
  }
];

// Utility function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const useMachines = () => {
 const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log(`Machine state at useMachines:`, machines);
//   const createMachine = useCallback(async (data: CreateMachineData) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const response = await fetch('/api/machines', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create machine');
//       }

//       const newMachine: Machine = await response.json();
//       setMachines(prev => [...prev, newMachine]);
//       return newMachine;
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : 'Unknown error';
//       setError(errorMessage);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

const createMachine = useCallback(async (data: CreateMachineData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await delay(800);

      const newMachine: Machine = {
        id: Date.now(), // Generate unique ID
        code_name: data.code_name,
        name: data.name,
        crushing_plant_id: null,
        ref_hardware: data.ref_hardware,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 1
      };
      
      setMachines(prev => [...prev, newMachine]);
      return newMachine;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

//   const updateMachine = useCallback(async (data: UpdateMachineData) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const response = await fetch(`/api/machines/${data.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update machine');
//       }

//       const updatedMachine: Machine = await response.json();
//       setMachines(prev => 
//         prev.map(machine => 
//           machine.id === data.id ? updatedMachine : machine
//         )
//       );
//       return updatedMachine;
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : 'Unknown error';
//       setError(errorMessage);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

 const updateMachine = useCallback(async (data: UpdateMachineData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await delay(600);
      
      const updatedMachine: Machine = {
        ...machines.find(m => m.id === data.id)!,
        code_name: data.code_name,
        name: data.name,
        crushing_plant_id: data.crushing_plant_id,
        ref_hardware: data.ref_hardware,
        updatedAt: new Date().toISOString(),
      };
      
      setMachines(prev => 
        prev.map(machine => 
          machine.id === data.id ? updatedMachine : machine
        )
      );
      return updatedMachine;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [machines]);

//   const deleteMachine = useCallback(async (data: DeleteMachineData) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const response = await fetch(`/api/machines/${data.id}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete machine');
//       }

//       setMachines(prev => prev.filter(machine => machine.id !== data.id));
//       return data.id;
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : 'Unknown error';
//       setError(errorMessage);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

const deleteMachine = useCallback(async (data: DeleteMachineData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await delay(400);
      
      setMachines(prev => prev.filter(machine => machine.id !== data.id));
      return data.id;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

//   const fetchMachines = useCallback(async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const response = await fetch('/api/machines');
//       if (!response.ok) {
//         throw new Error('Failed to fetch machines');
//       }
      
//       const data: Machine[] = await response.json();
//       setMachines(data);
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : 'Unknown error';
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

const fetchMachines = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await delay(1000);
      
      setMachines(mockMachines);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);
  return {
    machines,
    loading,
    error,
    createMachine,
    updateMachine,
    deleteMachine,
    fetchMachines,
  };
};