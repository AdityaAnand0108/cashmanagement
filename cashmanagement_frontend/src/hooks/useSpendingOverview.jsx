import { useEffect, useState } from 'react';
import { SpendingOverview } from '../types/spendingOverview';
import { fetchSpendingOverview } from '../api/spendingOverviewApi';

export const useSpendingOverview = () => {
  const [data, setData] = useState<SpendingOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSpendingOverview()
      .then((spending) => {
        setData(spending);
        setLoading(false);
      })
      .catch((err) => {
        setError('Unable to fetch spending overview');
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
};