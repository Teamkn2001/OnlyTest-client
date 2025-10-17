import Sortable from "@/components/customs/Sortable";
import Draggable from "@/components/drag-drop/Dragable";
import Droppable from "@/components/drag-drop/Droppable";
import { Button } from "@/components/ui/button";
import {
  DndContext,
  DragOverlay,
  rectIntersection,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useState } from "react";

export default function DnDBasic() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [items, setItems] = useState({
    available: ["Test 1", "Test 2", "Test 3", "Another Item"],
    zone1: [] as string[],
    zone2: [] as string[],
  });

  console.log(`Available: ${items.available}`);
  console.log(`Zone 1: ${items.zone1}`);
  console.log(`Zone 2: ${items.zone2}`);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const draggedItemId = active.id as string;
    const droppedOnId = over.id as string;

    // Find which container the item is currently in
    let sourceContainer: string | null = null;
    if (items.available.includes(draggedItemId)) {
      sourceContainer = "available";
    } else if (items.zone1.includes(draggedItemId)) {
      sourceContainer = "zone1";
    } else if (items.zone2.includes(draggedItemId)) {
      sourceContainer = "zone2";
    }

    if (!sourceContainer) return;

    // Determine target container
    let targetContainer: string | null = null;
    if (droppedOnId === "droppable1") {
      targetContainer = "zone1";
    } else if (droppedOnId === "droppable2") {
      targetContainer = "zone2";
    }

    // Move item if dropped on a valid target and it's different from source
    if (targetContainer && targetContainer !== sourceContainer) {
      setItems((prev) => ({
        ...prev,
        [sourceContainer!]: prev[sourceContainer! as keyof typeof prev].filter(
          (item) => item !== draggedItemId
        ),
        [targetContainer]: [
          ...prev[targetContainer as keyof typeof prev],
          draggedItemId,
        ],
      }));
    }
  }

  return (
    <>
      {/* Mobile */}
      <div className="block md:hidden">
        <Button>Click Me</Button>
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <DndContext
          collisionDetection={rectIntersection}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="p-8 space-y-8">
            <h1 className="text-2xl font-bold text-center">
              Drag and Drop Example
            </h1>

            {/* Available Items */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Available Items:</h2>
              <div className="flex gap-4 flex-wrap">
                {items.available.map((item) => (
                  <Draggable key={item} id={item}>
                    {item}
                  </Draggable>
                ))}
              </div>
            </div>

            {/* Drop Zones */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Drop Zones:</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Zone 1</h3>
                  <Droppable id="droppable1">
                    {items.zone1.length === 0 ? (
                      <p className="text-gray-500 text-center">
                        Drop items here
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {items.zone1.map((item) => (
                          <Draggable key={`zone1-${item}`} id={item}>
                            {item}
                          </Draggable>
                        ))}
                      </div>
                    )}
                  </Droppable>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Zone 2</h3>
                  <Droppable id="droppable2">
                    {items.zone2.length === 0 ? (
                      <p className="text-gray-500 text-center">
                        Drop items here
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {items.zone2.map((item) => (
                          <Draggable key={`zone2-${item}`} id={item}>
                            {item}
                          </Draggable>
                        ))}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            </div>
          </div>

          {/* Drag Overlay */}
          <DragOverlay>
            {activeId ? (
              <div className="p-4 bg-pink-500 text-white rounded opacity-90 cursor-grabbing">
                {activeId}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>

        <div className="text-center text-xl">Sorable</div>
        <Sortable />
      </div>
    </>
  );
}
