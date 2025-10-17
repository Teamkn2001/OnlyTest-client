import { closestCenter, DndContext, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import  { useState } from 'react';
import SortableItem from '../drag-drop/SortableItem';

export default function Sortable() {
   const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event; // active : item being drag
    console.log("sortable end event")
    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over!.id as string);
        
        // Reorder array
        const newItems = [...items];
        const [removed] = newItems.splice(oldIndex, 1); // Remove 1 item from old position
        newItems.splice(newIndex, 0, removed);
        // splice(start, deleteCount, add-item1, add-item2)
        
        return newItems;
      });
    }
  }
  console.log(`after: ${items}`);

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {items.map(item => (
            <SortableItem key={item} id={item}>
              {item}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}