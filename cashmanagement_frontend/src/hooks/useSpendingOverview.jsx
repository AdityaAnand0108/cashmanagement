import { useEffect, useState } from "react";
import { fetchSpendingOverview } from "../api/spendingOverviewApi";

export const useSpendingOverview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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