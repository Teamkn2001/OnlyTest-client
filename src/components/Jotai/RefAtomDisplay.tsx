import { useAtom } from "jotai";
import { assetAtom } from "./StorageAtomTest";

export default function RefAtomDisplay() {
  const [asset] = useAtom(assetAtom);
  return (
    <div className="border-4 p-4 mt-4 bg-orange-200">
      RefAtomDisplay
      <h2>Money: {asset.money}</h2>
      <h3>Houses:</h3>
      <ul>
        {asset.house.map((h, i) => (
          <li key={i}>
            {h.address} - ${h.price}
          </li>
        ))}
      </ul>
      <h3>Stocks:</h3>
      <ul>
        {asset.stock.map((s, i) => (
          <li key={i}>
            {s.symbol} x{s.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
