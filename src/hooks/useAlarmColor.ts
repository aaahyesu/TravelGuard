import { useCallback } from "react";

export const useAlarmColor = () => {
  const getAlarmLevelColor = useCallback((level: number | null) => {
    const colors = {
      0: "#E0E0E0",
      1: "#4C8CFF",
      2: "#5DAA8B",
      3: "#E4D95D",
      4: "#D14844",
      default: "#7F7F7F",
    };
    return colors[level as keyof typeof colors] || colors.default;
  }, []);

  return { getAlarmLevelColor };
};
