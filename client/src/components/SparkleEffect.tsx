import { memo } from 'react';

const SparkleEffect = memo(() => (
  <div className="absolute inset-0 pointer-events-none">
    <div 
      className="absolute top-12 left-8 w-3 h-3 bg-blue-500 rounded-full" 
      style={{
        animation: 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        opacity: 0.75
      }}
    />
    <div 
      className="absolute bottom-12 right-8 w-3 h-3 bg-purple-500 rounded-full"
      style={{
        animation: 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        opacity: 0.75
      }}
    />
    <div 
      className="absolute top-1/2 right-12 w-2 h-2 bg-pink-500 rounded-full"
      style={{
        animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        opacity: 0.75
      }}
    />
  </div>
));

SparkleEffect.displayName = 'SparkleEffect';

export default SparkleEffect;
