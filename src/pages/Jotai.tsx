import React from "react";
import { atom, useAtom, useAtomValue } from "jotai";
import { Button } from "@/components/ui/button";
import StorageAtomTest from "@/components/Jotai/StorageAtomTest";
import RefAtomDisplay from "@/components/Jotai/RefAtomDisplay";


interface Anime {
  title: string;
  year: number;
  watch: boolean;
}
const countAtom = atom<number>(0);

const animeAtom = atom<Anime[]>([
  {
    title: "Naruto",
    year: 2002,
    watch: true,
  },
  {
    title: "One Piece",
    year: 1999,
    watch: false,
  },
]);

// atom can derive from other atoms
const progressAtom = atom((get) => {
  const anime = get(animeAtom);
  return anime.filter((item) => item.watch).length / anime.length;
});

const textAtom = atom<string>("Hello Jotai");
const upperCaseAtom = atom((get) => get(textAtom).toUpperCase()); // not effect textAtom

export default function JotaiPage() {
  const [anime, setAnime] = useAtom(animeAtom); // whole
  const animeValue = useAtomValue(animeAtom); // read-only
  const progress = useAtomValue(progressAtom);

  const [count, setCount] = useAtom(countAtom);

  const [text, setText] = useAtom(textAtom);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const [handleToUppercase] = useAtom(upperCaseAtom);

 
  return (
    <div>
      <h1>Jotai</h1>

      <div className="border-4 p-4 ">
        <h1>Text State</h1>
        <input
          type="text"
          value={text}
          onChange={handleOnChange}
          className="border-2"
        />
        <Button onClick={() => alert(handleToUppercase)}>To Uppercase</Button>
      </div>

      <div>
        <p>Count: {count}</p>
        <Button onClick={() => setCount((c) => c + 1)}>Increment</Button>
      </div>

      <div>
        <ul>
          {animeValue.map((i) => (
            <li key={i.title}>{i.title}</li>
          ))}
        </ul>
      </div>

      <p className="bg-red-100">Progress: {(progress * 100).toFixed(2)}%</p>

      <div className="border-4 p-4">
        <ul>
          {anime.map((item) => (
            <li key={item.title}>{item.title}</li>
          ))}
        </ul>
        <Button
          onClick={() => {
            setAnime((anime) => [
              ...anime,
              {
                title: "Cowboy Bebop",
                year: 1998,
                watch: false,
              },
            ]);
          }}
        >
          Add Cowboy Bebop
        </Button>
      </div>

      <StorageAtomTest />
      <RefAtomDisplay />
    </div>
  );
}
