import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
  closestCenter,
} from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';

// Types
interface Character {
  id: number;
  name: string;
  hp: number;
  attack: number;
  specialAttack: number;
  defend: number;
  specialDefend: number;
  speed: number;
  imageUrl: string;
}

type StatType = 'hp' | 'attack' | 'specialAttack' | 'defend' | 'specialDefend' | 'speed';

interface Slot {
  statType: StatType;
  character: Character | null;
}

// Sample character data
const initialCharacters: Character[] = [
  {
    id: 1,
    name: "Dragon",
    hp: 125,
    attack: 75,
    specialAttack: 100,
    defend: 50,
    specialDefend: 75,
    speed: 96,
    imageUrl: "https://images.unsplash.com/photo-1613588746506-d5a6e1b9a1c7?w=400&h=400&fit=crop"
  },
  {
    id: 2,
    name: "Phoenix",
    hp: 100,
    attack: 90,
    specialAttack: 120,
    defend: 60,
    specialDefend: 85,
    speed: 110,
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop"
  },
  {
    id: 3,
    name: "Golem",
    hp: 150,
    attack: 110,
    specialAttack: 50,
    defend: 120,
    specialDefend: 90,
    speed: 40,
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=400&fit=crop"
  },
  {
    id: 4,
    name: "Ninja",
    hp: 80,
    attack: 85,
    specialAttack: 70,
    defend: 55,
    specialDefend: 60,
    speed: 140,
    imageUrl: "https://images.unsplash.com/photo-1555817129-e820faa6e2f5?w=400&h=400&fit=crop"
  },
  {
    id: 5,
    name: "Wizard",
    hp: 90,
    attack: 50,
    specialAttack: 140,
    defend: 45,
    specialDefend: 100,
    speed: 85,
    imageUrl: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=400&h=400&fit=crop"
  },
  {
    id: 6,
    name: "Knight",
    hp: 130,
    attack: 100,
    specialAttack: 65,
    defend: 110,
    specialDefend: 80,
    speed: 70,
    imageUrl: "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?w=400&h=400&fit=crop"
  }
];

// Character Card Component
const CharacterCard: React.FC<{ 
  character: Character; 
  isInSlot?: boolean;
  isDragging?: boolean;
}> = ({ character, isInSlot = false, isDragging = false }) => {
  return (
    <div
      className={`bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg overflow-hidden transition-all ${
        isDragging ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
      } ${isInSlot ? 'w-full' : 'w-32'}`}
    >
      <div className="relative">
        <img
          src={character.imageUrl}
          alt={character.name}
          className={`w-full object-cover ${isInSlot ? 'h-20' : 'h-32'}`}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-1">
          <h3 className="text-white font-bold text-xs">{character.name}</h3>
        </div>
      </div>
      {isInSlot && (
        <div className="p-2 bg-gray-800 text-white text-xs">
          <div className="grid grid-cols-2 gap-1">
            <div className="flex justify-between">
              <span className="text-red-400">HP:</span>
              <span className="font-semibold">{character.hp}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-orange-400">ATK:</span>
              <span className="font-semibold">{character.attack}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-yellow-400">SP.ATK:</span>
              <span className="font-semibold">{character.specialAttack}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-400">DEF:</span>
              <span className="font-semibold">{character.defend}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-400">SP.DEF:</span>
              <span className="font-semibold">{character.specialDefend}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-400">SPD:</span>
              <span className="font-semibold">{character.speed}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Draggable Character Component
const DraggableCharacter: React.FC<{ character: Character }> = ({ character }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `character-${character.id}`,
    data: { character },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-grab active:cursor-grabbing"
    >
      <CharacterCard character={character} isDragging={isDragging} />
    </div>
  );
};

// Stat Slot Component
const StatSlot: React.FC<{
  slot: Slot;
  slotIndex: number;
}> = ({ slot, slotIndex }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `slot-${slotIndex}`,
    data: { slotIndex, statType: slot.statType },
  });

  const getStatValue = (character: Character | null): number => {
    if (!character) return 0;
    return character[slot.statType];
  };

  const currentValue = getStatValue(slot.character);

  const statLabels: Record<StatType, string> = {
    hp: 'HP',
    attack: 'ATK',
    specialAttack: 'SP.ATK',
    defend: 'DEF',
    specialDefend: 'SP.DEF',
    speed: 'SPD',
  };

  const statColors: Record<StatType, string> = {
    hp: 'from-red-500 to-red-600',
    attack: 'from-orange-500 to-orange-600',
    specialAttack: 'from-yellow-500 to-yellow-600',
    defend: 'from-blue-500 to-blue-600',
    specialDefend: 'from-green-500 to-green-600',
    speed: 'from-purple-500 to-purple-600',
  };

  return (
    <div
      ref={setNodeRef}
      className={`relative border-2 rounded-lg p-2 min-h-40 transition-all ${
        isOver
          ? 'border-yellow-400 bg-yellow-50 scale-105'
          : slot.character
          ? 'border-green-500 bg-green-50'
          : 'border-dashed border-gray-400 bg-gray-50'
      }`}
    >
      <div className={`bg-gradient-to-r ${statColors[slot.statType]} text-white px-2 py-1 rounded text-center mb-2`}>
        <span className="font-bold text-xs">{statLabels[slot.statType]}</span>
      </div>

      {slot.character ? (
        <div>
          <CharacterCard character={slot.character} isInSlot={true} />
          <div className="mt-2">
            <div className="flex justify-between items-center bg-white p-1 rounded text-xs">
              <span className="font-semibold">Value:</span>
              <span className="text-sm font-bold text-green-600">
                +{currentValue}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-400 h-24">
          <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <p className="text-center font-semibold text-xs">Drop here</p>
        </div>
      )}
    </div>
  );
};

// Main Game Component
const CardGame2: React.FC = () => {
  const [slots, setSlots] = useState<Slot[]>([
    { statType: 'hp', character: null },
    { statType: 'attack', character: null },
    { statType: 'specialAttack', character: null },
    { statType: 'defend', character: null },
    { statType: 'specialDefend', character: null },
    { statType: 'speed', character: null },
  ]);

  const [allCharacters] = useState<Character[]>(initialCharacters);
  const [currentCardIndex, setCurrentCardIndex] = useState(0); // Track which card to show
  const [activeCharacter, setActiveCharacter] = useState<Character | null>(null);
  const [showWinPopup, setShowWinPopup] = useState(false);
  
  const totalScoreGoal = 550; // Total stat goal (sum of all 6 stats needed)

  // Get only the current card to display
  const currentCard = currentCardIndex < allCharacters.length ? allCharacters[currentCardIndex] : null;

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

      // Move to next card (reveal next character)
      setCurrentCardIndex(prev => prev + 1);

      // Check if all slots are filled
      const allSlotsFilled = newSlots.every(slot => slot.character !== null);
      if (allSlotsFilled) {
        // Calculate the total score with new slots
        const totalScore = newSlots.reduce((total, slot) => {
          if (!slot.character) return total;
          return total + slot.character[slot.statType];
        }, 0);

        // Only show win popup if score meets or exceeds goal
        if (totalScore >= totalScoreGoal) {
          setTimeout(() => {
            setShowWinPopup(true);
          }, 500);
        } else {
          // Show a "game over" message for failing to reach goal
          setTimeout(() => {
            setShowWinPopup(true);
          }, 500);
        }
      }
    }
  };

  const calculateCurrentScore = (): number => {
    return slots.reduce((total, slot) => {
      if (!slot.character) return total;
      return total + slot.character[slot.statType];
    }, 0);
  };

  const currentScore = calculateCurrentScore();
  const isWon = currentScore >= totalScoreGoal && slots.every(slot => slot.character !== null);

  const resetGame = () => {
    setSlots([
      { statType: 'hp', character: null },
      { statType: 'attack', character: null },
      { statType: 'specialAttack', character: null },
      { statType: 'defend', character: null },
      { statType: 'specialDefend', character: null },
      { statType: 'speed', character: null },
    ]);
    setCurrentCardIndex(0);
    setShowWinPopup(false);
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
              ⚔️ Character Stat Battle ⚔️
            </h1>
            <p className="text-sm text-purple-200">
              Drag characters to slots to reach the total score goal!
            </p>
          </div>

          {/* Score Display */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 mb-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white mb-1">Total Score</h2>
                <p className="text-xs text-purple-200">Fill all slots to complete!</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white mb-1">
                  {currentScore}
                  <span className="text-xl text-purple-300"> / {totalScoreGoal}</span>
                </div>
                <div className="w-40 bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-full transition-all duration-500 ease-out"
                    style={{ width: `${Math.min((currentScore / totalScoreGoal) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Available Characters */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 mb-4 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-3">
              Current Character (Card {currentCardIndex + 1} of {allCharacters.length})
            </h2>
            <div className="flex flex-wrap gap-3">
              {currentCard ? (
                <DraggableCharacter key={currentCard.id} character={currentCard} />
              ) : (
                <p className="text-purple-200 text-sm">All characters have been placed!</p>
              )}
            </div>
          </div>

          {/* Stat Slots */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-3">Stat Slots</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {slots.map((slot, index) => (
                <StatSlot
                  key={index}
                  slot={slot}
                  slotIndex={index}
                />
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

      {/* Win Popup */}
      {showWinPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-in fade-in duration-300">
          <div className={`${isWon ? 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500' : 'bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800'} rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 transform animate-in zoom-in duration-500`}>
            <div className="text-center">
              <div className="text-5xl mb-3 animate-bounce">
                {isWon ? '🎉' : '😢'}
              </div>
              <h2 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">
                {isWon ? 'YOU WIN!' : 'GAME OVER'}
              </h2>
              <div className="bg-white bg-opacity-20 rounded-lg p-3 mb-4">
                <p className="text-lg font-bold text-white mb-1">Final Score</p>
                <p className="text-3xl font-bold text-white">
                  {currentScore} / {totalScoreGoal}
                </p>
                {isWon ? (
                  <p className="text-sm text-white mt-1">🏆 Goal Achieved! 🏆</p>
                ) : (
                  <p className="text-sm text-white mt-1">❌ Didn't reach the goal</p>
                )}
              </div>
              <button
                onClick={resetGame}
                className={`${isWon ? 'bg-white text-orange-600' : 'bg-white text-gray-700'} font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-all text-lg shadow-lg hover:scale-105 transform`}
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

export default CardGame2;