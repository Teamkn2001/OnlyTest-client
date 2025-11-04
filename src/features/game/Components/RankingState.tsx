import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  DragOverlay,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';

// Types
type StatType = 'hp' | 'attack' | 'specialAttack' | 'defend' | 'specialDefend' | 'speed';

interface Character {
  id: number;
  name: string;
  image: string;
  hp: number;
  attack: number;
  specialAttack: number;
  defend: number;
  specialDefend: number;
  speed: number;
}

interface Slot {
  statType: StatType;
  character: Character | null;
  rank: number; // 1 = highest, 6 = lowest
}

interface MainGameProps {
  initialCharacters: Character[];
  statTypes?: StatType[];
  title?: string;
  description?: string;
}

// Character Card Component
const CharacterCard: React.FC<{ character: Character }> = ({ character }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-3 cursor-grab active:cursor-grabbing hover:shadow-xl transition-all hover:scale-105">
      <div className="text-center mb-2">
        <div className="text-3xl mb-1">{character.image}</div>
        <h3 className="text-sm font-bold text-gray-800">{character.name}</h3>
      </div>
      <div className="grid grid-cols-2 gap-1 text-xs">
        <div className="bg-red-100 rounded px-1 py-0.5">
          <span className="font-semibold">HP:</span> {character.hp}
        </div>
        <div className="bg-orange-100 rounded px-1 py-0.5">
          <span className="font-semibold">ATK:</span> {character.attack}
        </div>
        <div className="bg-purple-100 rounded px-1 py-0.5">
          <span className="font-semibold">SP.ATK:</span> {character.specialAttack}
        </div>
        <div className="bg-blue-100 rounded px-1 py-0.5">
          <span className="font-semibold">DEF:</span> {character.defend}
        </div>
        <div className="bg-indigo-100 rounded px-1 py-0.5">
          <span className="font-semibold">SP.DEF:</span> {character.specialDefend}
        </div>
        <div className="bg-green-100 rounded px-1 py-0.5">
          <span className="font-semibold">SPD:</span> {character.speed}
        </div>
      </div>
    </div>
  );
};

// Draggable Character Component
const DraggableCharacter: React.FC<{ character: Character }> = ({ character }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `character-${character.id}`,
    data: { character },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <CharacterCard character={character} />
    </div>
  );
};

// Stat Slot Component
const StatSlot: React.FC<{ slot: Slot; slotIndex: number }> = ({ slot, slotIndex }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `slot-${slotIndex}`,
    data: { slotIndex },
  });

  const statTypeLabels: Record<StatType, string> = {
    hp: 'HP',
    attack: 'Attack',
    specialAttack: 'Sp. Attack',
    defend: 'Defense',
    specialDefend: 'Sp. Defense',
    speed: 'Speed',
  };

  const statTypeColors: Record<StatType, string> = {
    hp: 'from-red-500 to-red-600',
    attack: 'from-orange-500 to-orange-600',
    specialAttack: 'from-purple-500 to-purple-600',
    defend: 'from-blue-500 to-blue-600',
    specialDefend: 'from-indigo-500 to-indigo-600',
    speed: 'from-green-500 to-green-600',
  };

  const getRankLabel = (rank: number): string => {
    const labels = ['1st', '2nd', '3rd', '4th', '5th', '6th'];
    return labels[rank - 1] || `${rank}th`;
  };

  return (
    <div
      ref={setNodeRef}
      className={`relative rounded-lg p-3 transition-all ${
        slot.character
          ? 'bg-white shadow-lg'
          : isOver
          ? 'bg-purple-400 bg-opacity-50 border-4 border-purple-300 border-dashed'
          : 'bg-gray-700 bg-opacity-50 border-2 border-gray-600 border-dashed'
      }`}
    >
      {/* Rank Badge */}
      <div className={`absolute -top-2 -left-2 bg-gradient-to-br ${statTypeColors[slot.statType]} text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs shadow-lg z-10`}>
        {getRankLabel(slot.rank)}
      </div>

      {/* Stat Type Label */}
      <div className="text-center mb-2">
        <div className={`inline-block bg-gradient-to-br ${statTypeColors[slot.statType]} text-white px-3 py-1 rounded-full text-xs font-bold shadow-md`}>
          {statTypeLabels[slot.statType]}
        </div>
      </div>

      {slot.character ? (
        <div>
          <div className="text-center mb-2">
            <div className="text-4xl mb-1">{slot.character.image}</div>
            <h3 className="text-sm font-bold text-gray-800">{slot.character.name}</h3>
          </div>
          <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg p-2 text-center">
            <p className="text-xs text-gray-600 font-semibold">Stat Value</p>
            <p className="text-2xl font-bold text-gray-800">
              {slot.character[slot.statType]}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          <div className="text-3xl mb-2">📍</div>
          <p className="text-xs">Drop {getRankLabel(slot.rank)} highest</p>
          <p className="text-xs font-bold">{statTypeLabels[slot.statType]}</p>
        </div>
      )}
    </div>
  );
};

// Main Game Component
const RankingStat: React.FC<MainGameProps> = ({
  initialCharacters,
  statTypes = ['hp', 'attack', 'specialAttack', 'defend', 'specialDefend', 'speed'],
  title = '🏆 Character Stat Ranking Challenge 🏆',
  description = 'Drag characters to slots ordered from HIGHEST to LOWEST stat values!',
}) => {
  const [slots, setSlots] = useState<Slot[]>(
    statTypes.map((statType, index) => ({
      statType,
      character: null,
      rank: index + 1,
    }))
  );

  const [availableCharacters, setAvailableCharacters] = useState<Character[]>(initialCharacters);
  const [activeCharacter, setActiveCharacter] = useState<Character | null>(null);
  const [showResultPopup, setShowResultPopup] = useState(false);

  const handleDragStart = (event: DragStartEvent) => {
    const character = event.active.data.current?.character as Character;
    setActiveCharacter(character);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCharacter(null);

    if (!over) return;

    const character = active.data.current?.character as Character;
    const slotIndex = over.data.current?.slotIndex as number;

    if (character && slotIndex !== undefined) {
      // Check if slot is already filled
      if (slots[slotIndex].character) {
        return; // Can't replace a card
      }

      // Place card in slot
      const newSlots = [...slots];
      newSlots[slotIndex] = { ...newSlots[slotIndex], character };
      setSlots(newSlots);

      // Remove card from available characters
      setAvailableCharacters((prev) => prev.filter((c) => c.id !== character.id));

      // Check if all slots are filled
      const allSlotsFilled = newSlots.every((slot) => slot.character !== null);
      if (allSlotsFilled) {
        setTimeout(() => {
          setShowResultPopup(true);
        }, 500);
      }
    }
  };

  const checkWinCondition = (): boolean => {
    // Check if all slots are filled first
    if (!slots.every((slot) => slot.character !== null)) {
      return false;
    }

    // Check if stats are ordered from highest to lowest
    for (let i = 0; i < slots.length - 1; i++) {
      const currentSlot = slots[i];
      const nextSlot = slots[i + 1];

      if (currentSlot.character && nextSlot.character) {
        const currentValue = currentSlot.character[currentSlot.statType];
        const nextValue = nextSlot.character[nextSlot.statType];

        // Current stat should be greater than or equal to next stat
        if (currentValue < nextValue) {
          return false;
        }
      }
    }

    return true;
  };

  const getStatValues = (): number[] => {
    return slots.map((slot) => {
      if (slot.character) {
        return slot.character[slot.statType];
      }
      return 0;
    });
  };

  const isWon = checkWinCondition();
  const statValues = getStatValues();
  const allSlotsFilled = slots.every((slot) => slot.character !== null);

  const resetGame = () => {
    setSlots(
      statTypes.map((statType, index) => ({
        statType,
        character: null,
        rank: index + 1,
      }))
    );
    setAvailableCharacters(initialCharacters);
    setShowResultPopup(false);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
              {title}
            </h1>
            <p className="text-sm text-purple-200">{description}</p>
          </div>

          {/* Instructions */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 mb-4 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-2">📋 How to Play</h2>
            <ul className="text-sm text-purple-200 space-y-1">
              <li>• Drag characters into the ranked slots (1st through 6th)</li>
              <li>• Each slot focuses on a different stat type</li>
              <li>• <strong className="text-yellow-300">Win condition:</strong> Order stats from HIGHEST (1st) to LOWEST (6th)</li>
              <li>• Once placed, cards cannot be moved or replaced</li>
            </ul>
          </div>

          {/* Current Order Display */}
          {allSlotsFilled && (
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 mb-4 shadow-xl">
              <h2 className="text-lg font-bold text-white mb-2">📊 Current Order</h2>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {statValues.map((value, index) => (
                  <React.Fragment key={index}>
                    <div
                      className={`px-4 py-2 rounded-lg font-bold text-lg ${
                        index > 0 && value > statValues[index - 1]
                          ? 'bg-red-500 text-white'
                          : 'bg-green-500 text-white'
                      }`}
                    >
                      {value}
                    </div>
                    {index < statValues.length - 1 && (
                      <span className="text-white text-xl">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <p className="text-center text-sm text-purple-200 mt-2">
                {isWon ? (
                  <span className="text-green-300 font-bold">✅ Perfect! Ordered correctly!</span>
                ) : (
                  <span className="text-red-300 font-bold">❌ Not in correct order (High → Low)</span>
                )}
              </p>
            </div>
          )}

          {/* Available Characters */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 mb-4 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-3">
              Available Characters ({availableCharacters.length}/{initialCharacters.length})
            </h2>
            <div className="flex flex-wrap gap-3">
              {availableCharacters.length > 0 ? (
                availableCharacters.map((character) => (
                  <DraggableCharacter key={character.id} character={character} />
                ))
              ) : (
                <p className="text-purple-200 text-sm">All characters have been placed!</p>
              )}
            </div>
          </div>

          {/* Ranked Slots */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-3">🎯 Ranked Stat Slots</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {slots.map((slot, index) => (
                <StatSlot key={index} slot={slot} slotIndex={index} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeCharacter ? (
          <div className="opacity-80">
            <CharacterCard character={activeCharacter} />
          </div>
        ) : null}
      </DragOverlay>

      {/* Result Popup */}
      {showResultPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-in fade-in duration-300">
          <div
            className={`${
              isWon
                ? 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500'
                : 'bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800'
            } rounded-xl shadow-2xl p-6 max-w-lg w-full mx-4 transform animate-in zoom-in duration-500`}
          >
            <div className="text-center">
              <div className="text-5xl mb-3 animate-bounce">{isWon ? '🏆' : '😢'}</div>
              <h2 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">
                {isWon ? 'PERFECT RANKING!' : 'TRY AGAIN'}
              </h2>
              <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
                <p className="text-lg font-bold text-white mb-3">Stat Order</p>
                <div className="flex items-center justify-center gap-2 flex-wrap mb-3">
                  {statValues.map((value, index) => (
                    <React.Fragment key={index}>
                      <div className="bg-white bg-opacity-30 px-3 py-1 rounded-lg font-bold text-white">
                        {value}
                      </div>
                      {index < statValues.length - 1 && (
                        <span className="text-white">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                {isWon ? (
                  <p className="text-sm text-white">
                    ✅ Stats ordered from HIGHEST to LOWEST!
                  </p>
                ) : (
                  <p className="text-sm text-white">
                    ❌ Stats not in correct order (must be High → Low)
                  </p>
                )}
              </div>
              <button
                onClick={resetGame}
                className={`${
                  isWon ? 'bg-white text-orange-600' : 'bg-white text-gray-700'
                } font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-all text-lg shadow-lg hover:scale-105 transform`}
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      )}
    </DndContext>
  );
};

export default RankingStat;