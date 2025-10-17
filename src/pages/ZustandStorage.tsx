import { Button } from "@/components/ui/button";
import { useAssetStore } from "@/stores/assetStore";

export default function ZustandStorage() {
  const asset = useAssetStore((state) => state.asset);
  const addMoney = useAssetStore((state) => state.addMoney);
  const addHouse = useAssetStore((state) => state.addHouse);
  const deleteHouse = useAssetStore((state) => state.deleteHouse);
  const addStock = useAssetStore((state) => state.addStock);

  return (
     <div>
      <h2>Money: {asset.money}</h2>
      <Button onClick={() => addMoney(1000)}>+1000</Button>

      <h3>Houses:</h3>
      <ul>
        {asset.house.map((h) => (
          <li key={h.id}>
            {h.address} - ${h.price}{" "}
            <Button onClick={() => deleteHouse(h.id)}>Delete</Button>
          </li>
        ))}
      </ul>
      <Button
        onClick={() =>
          addHouse({ address: "789 Boulevard", price: 300000 })
        }
      >
        Add House
      </Button>

      <h3>Stocks:</h3>
      <ul>
        {asset.stock.map((s) => (
          <li key={s.id}>
            {s.symbol} x{s.quantity}
          </li>
        ))}
      </ul>
      <Button onClick={() => addStock({ symbol: "GOOG", quantity: 8 })}>
        Add Stock
      </Button>
    </div>
  );
}
