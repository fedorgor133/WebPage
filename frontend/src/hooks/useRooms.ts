import { useEffect, useState } from 'react';

import { CanceledError } from 'axios';
import { toast } from 'react-toastify';
import axiosClient from '@/config/axiosClient';

type UseRoomsParams = {
  withPhotos?: boolean;
  userId?: number;
};

const STALE_TIME = 1000 * 60 * 15; // 5 minutes

type CacheData<T> = {
  data: T[];
  timestamp: number;
};

function useRooms<T>(params: UseRoomsParams) {
  const [rooms, setRooms] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // cache data  { data: rooms, timestamp: Date.now() }
  const cacheKey = !params ? 'rooms' : `rooms?${JSON.stringify(params)}`;

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const currentTime = Date.now();
    const data = localStorage.getItem(cacheKey);
    if (data) {
      const cacheData: CacheData<T> = JSON.parse(data);

      if (currentTime - cacheData.timestamp < STALE_TIME) {
        setRooms(cacheData.data);
        setIsLoading(false);
        return;
      }
    }

    const controller = new AbortController();

    axiosClient
      .get<T[]>('/rooms', {
        signal: controller.signal,
        params
      })
      .then((resp) => {
        toast.success('Rooms received');
        setRooms(resp.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err);
        console.log(err);
        toast.error(err.message);
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [cacheKey]);

  useEffect(() => {
    if (!rooms.length) return;
    const cacheData = {
      data: rooms,
      timestamp: Date.now()
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  }, [rooms, cacheKey]);

  return { rooms, isLoading, error };
}

export default useRooms;
