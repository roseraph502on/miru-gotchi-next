import { Timestamp } from "firebase/firestore";

export const convertTimestampToDate = (
  timestamp: Timestamp | null | undefined,
): Date => {
  return timestamp?.toDate() || new Date();
};

export const convertDatesToTimestamps = (data: unknown): unknown => {
  if (data === null || typeof data !== "object") {
    return data;
  }

  if (data instanceof Date) {
    return Timestamp.fromDate(data);
  }

  if (data instanceof Timestamp) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((item) => convertDatesToTimestamps(item));
  }

  const objData = data as Record<string, unknown>;
  return Object.keys(objData).reduce(
    (acc: Record<string, unknown>, key) => {
      acc[key] = convertDatesToTimestamps(objData[key]);
      return acc;
    },
    {} as Record<string, unknown>,
  );
};

export const getStartOfDayTimestamp = (date: Date): Timestamp => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  return Timestamp.fromDate(startOfDay);
};

export const getEndOfOfDayTimestamp = (date: Date): Timestamp => {
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  return Timestamp.fromDate(endOfDay);
};
