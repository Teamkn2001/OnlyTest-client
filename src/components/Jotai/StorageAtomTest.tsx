import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import { Button } from "../ui/button";

// local storage atom
const defaultAsset = {
  money: 0,
  house: [{ address: "123 Street", price: 100000 }],
  stock: [{ symbol: "AAPL", quantity: 10 }],
};

export const assetAtom = atomWithStorage("myAsset", defaultAsset);
// ---------------------------------------------------------

export default function StorageAtomTest() {
  // LOCAL STORAGE ATOM
  const [asset, setAsset] = useAtom(assetAtom);
  console.log("asset", asset);

  const addMoney = () => {
    setAsset((prev) => ({
      ...prev,
      money: prev.money + 1000,
    }));
  };

  const addHouse = () => {
    setAsset((prev) => ({
      ...prev,
      house: [...prev.house, { address: "456 Avenue", price: 150000 }],
    }));
  };

  const addStock = () => {
    setAsset((prev) => ({
      ...prev,
      stock: [...prev.stock, { symbol: "TSLA", quantity: 5 }],
    }));
  };

  return (
    <>
      <div>
        <h2>Money: {asset.money}</h2>
        <Button onClick={addMoney}>+1000 Money</Button>

        <h3>Houses:</h3>
        <ul>
          {asset.house.map((h, i) => (
            <li key={i}>
              {h.address} - ${h.price}
            </li>
          ))}
        </ul>
        <Button onClick={addHouse}>Add House</Button>

        <h3>Stocks:</h3>
        <ul>
          {asset.stock.map((s, i) => (
            <li key={i}>
              {s.symbol} x{s.quantity}
            </li>
          ))}
        </ul>
        <Button onClick={addStock}>Add Stock</Button>
      </div>

    </>
  );
}
