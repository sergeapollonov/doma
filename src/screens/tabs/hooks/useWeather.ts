import { useState, useEffect } from 'react';

export interface WeatherData {
  temp: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy';
  location: string;
}

/**
 * Заглушка для интеграции с OpenWeatherMap API в будущем.
 */
export function useWeather(dateString?: string) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки из API
    const timer = setTimeout(() => {
      setWeather({
        temp: 23,
        condition: 'sunny',
        location: 'Kraków',
      });
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [dateString]);

  return { weather, loading };
}
