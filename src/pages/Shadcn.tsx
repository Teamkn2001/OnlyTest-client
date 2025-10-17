import { Button } from "@/components/ui/button";

export default function Shadcn() {
  return (
    <div>
      <Button className="bg-primary">by Class Primary</Button>
      <Button className="bg-secondary">by Class Secondary</Button>

      <Button variant="default">by Variant Primary</Button>
      <Button variant="secondary">by Variant Secondary</Button>

      <div>
        <p>PRIMARY (foreground is text color)</p>
        <div className="bg-primary w-10 h-10"></div>
      </div>

      <div>
        <p>SECONDARY (foreground is text color)</p>
        <div className="bg-secondary w-10 h-10"></div>
      </div>
    </div>
  );
}
