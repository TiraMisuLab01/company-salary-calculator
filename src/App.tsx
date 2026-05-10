import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./features/app-shell/AppShell";
import { ComparePage } from "./features/compare/ComparePage";
import { PayrollDataProvider } from "./features/data/PayrollDataProvider";
import { ScenarioProvider } from "./features/data/ScenarioProvider";
import { DashboardPage } from "./features/dashboard/DashboardPage";
import { EntryPage } from "./features/entry/EntryPage";
import { ImportPage } from "./features/import/ImportPage";
import { SettingsPage } from "./features/settings/SettingsPage";

export default function App() {
  return (
    <PayrollDataProvider>
      <ScenarioProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppShell />}>
              <Route index element={<Navigate to="/entry" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/entry" element={<EntryPage />} />
              <Route path="/import" element={<ImportPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ScenarioProvider>
    </PayrollDataProvider>
  );
}
