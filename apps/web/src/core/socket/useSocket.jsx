import { useEffect, useState } from 'react';
import { useCoreSocket } from './socket.provider';

export const useSocket = (key, callback) => {
  const { client } = useCoreSocket();

  const [data, setData] = useState();

  useEffect(() => {
    if (client) {
      client.listen(key, (data) => {
        setData(data);
      });
    }
  }, [client, key]);

  useEffect(() => {
    if (data) {
      callback(data);
      setData(null);
    }
  }, [data, callback]);
};
