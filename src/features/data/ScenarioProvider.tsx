import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import {
  getStoredScenario,
  hasStoredScenario,
  saveStoredScenario,
  type ScenarioSettings,
} from "../../services/scenario-service";

interface ScenarioContextValue {
  scenario: ScenarioSettings;
  hasPersistedScenario: boolean;
  updateScenario: (nextScenario: Partial<ScenarioSettings>) => void;
}

const ScenarioContext = createContext<ScenarioContextValue | undefined>(undefined);

export function ScenarioProvider({ children }: { children: ReactNode }) {
  const [scenario, setScenario] = useState<ScenarioSettings>(() => getStoredScenario());
  const [hasPersistedScenario, setHasPersistedScenario] = useState(() => hasStoredScenario());

  const value = useMemo<ScenarioContextValue>(
    () => ({
      scenario,
      hasPersistedScenario,
      updateScenario: (nextScenario) => {
        setScenario((current) => {
          const merged = { ...current, ...nextScenario };
          saveStoredScenario(merged);
          setHasPersistedScenario(true);
          return merged;
        });
      },
    }),
    [hasPersistedScenario, scenario],
  );

  return <ScenarioContext.Provider value={value}>{children}</ScenarioContext.Provider>;
}

export function useScenario() {
  const context = useContext(ScenarioContext);

  if (!context) {
    throw new Error("useScenario 必须在 ScenarioProvider 内使用");
  }

  return context;
}
