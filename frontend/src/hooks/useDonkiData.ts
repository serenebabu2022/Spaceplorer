import { useEffect, useState } from "react";

interface EventItem {
  eventTime: string;
  instruments: { displayName: string }[];
  location?: string;
}

interface FormattedData {
  month: string;
  count: number;
  instruments: string;
  location?: string;
}

export const useDonkiData = (
  fetchFn: (start: string, end: string) => Promise<EventItem[]>,
  selectedYear: number
) => {
  const [data, setData] = useState<FormattedData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const today = new Date();
  const isCurrentYear = selectedYear === today.getFullYear();

  useEffect(() => {
    setLoading(true);
    setError(false);

    const startDate = `${selectedYear}-01-01`;
    const endDate = isCurrentYear
      ? today.toISOString().split("T")[0]
      : `${selectedYear}-12-31`;

    fetchFn(startDate, endDate)
      .then((response) => {
        const monthlyData: {
          [month: string]: {
            count: number;
            instruments: Set<string>;
            location?: string;
          };
        } = {};

        response.forEach((event) => {
          const date = new Date(event.eventTime);
          const month = `${date.getFullYear()}-${String(
            date.getMonth() + 1
          ).padStart(2, "0")}`;

          if (!monthlyData[month]) {
            monthlyData[month] = {
              count: 0,
              instruments: new Set(),
              location: event.location || undefined,
            };
          }

          monthlyData[month].count += 1;

          event.instruments?.forEach((instrument) => {
            monthlyData[month].instruments.add(instrument.displayName);
          });
        });

        const formatted = Object.entries(monthlyData).map(
          ([month, { count, instruments, location }]) => ({
            month,
            count,
            instruments: Array.from(instruments).join(", "),
            ...(location && { location }),
          })
        );

        setData(formatted);
      })
      .catch(() => {
        setError(true);
        console.error("Error fetching data");
      })
      .finally(() => setLoading(false));
  }, [selectedYear]);
  return { data, loading, error };
};
