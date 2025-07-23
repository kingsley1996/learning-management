import { useEffect, useState } from 'react';

const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="mb-8">
      <p className="text-gray-300 mb-4">Ưu đãi kết thúc trong:</p>
      <div className="flex justify-center gap-4">
        {[
          { label: 'Ngày', value: timeLeft.days },
          { label: 'Giờ', value: timeLeft.hours },
          { label: 'Phút', value: timeLeft.minutes },
          { label: 'Giây', value: timeLeft.seconds }
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-1">
              <span className="text-2xl font-bold text-white">{String(item.value).padStart(2, '0')}</span>
            </div>
            <span className="text-sm text-gray-400">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
