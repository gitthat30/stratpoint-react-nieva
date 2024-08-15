import { useContext } from "react";
import { SettingsContext } from "../contexts/SettingsContext";

export const useSettingsContext = () => {
    const context = useContext(SettingsContext);
    if (!context) {
      throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
  };