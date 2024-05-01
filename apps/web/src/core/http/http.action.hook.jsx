import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useHttpAction = (options = {}) => {
  const { enqueueSnackbar } = useSnackbar();

  const [data, setData] = useState(options.defaultData);
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [error, setError] = useState();

  const run = async (query) => {
    setLoading(true);

    try {
      const result = await query();
      setData(result);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
      enqueueSnackbar(error.message, { variant: 'error' });
    }

    setLoading(false);
  };

  const clear = () => {
    setData(options.defaultData);
    setLoading(false);
    setError(undefined);
  };

  return {
    data,
    isLoading,
    isSuccess,
    error,
    run,
    clear,
  };
};

export default useHttpAction;
