import { useDroppable } from "@dnd-kit/core";

interface DroppableProps {
  id: string;
  children: React.ReactNode;
}

export default function Droppable({ id, children }: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div 
      ref={setNodeRef}
      className={`p-8 min-h-[200px] border-2 border-dashed rounded-lg transition-colors ${
        isOver 
          ? 'border-green-500 bg-green-50' 
          : 'border-gray-300 bg-gray-50'
      }`}
    >
      {children}
    </div>
  );
}