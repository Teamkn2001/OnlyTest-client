import { Button } from '@/components/ui/button';
import  { useState, useMemo, useCallback } from 'react';

export default function CounterWithMemo() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  // useMemo: Expensive computation (only when `count` changes)
  const expensiveValue = useMemo(() => {
    console.log('🔧 Calculating expensive value...');
    return count * 1000;
  }, [count]);

  // useCallback: Stable function reference (only re-created when `count` changes)
  const handleIncrement = useCallback(() => {
    console.log('🧠 Incrementing count...');
    setCount(prev => prev + 1);
  }, [count]);

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h2>Counter With useMemo & useCallback</h2>

      <p>🧮 Count: {count}</p>
      <p>💰 Expensive Value: {expensiveValue}</p>

      <p> other : {other}</p>

      <Button onClick={handleIncrement} >➕ Increment Count</Button>
      <Button onClick={() => setOther(o => o + 1)}>🔁 Re-render with Other ({other})</Button>
    </div>
  );
}
