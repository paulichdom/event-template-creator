import React, { createContext, useContext } from "react";
import { MainScreen } from "@/components/MainScreen/MainScreen";
import { TemplateApi } from "../types/api";
import { templateApi } from "./api";

const TemplateApiContext = createContext<TemplateApi | undefined>(undefined);

export const useTemplateApi = (): TemplateApi => {
  const context = useContext(TemplateApiContext);
  if (context === undefined) {
    throw new Error("useTemplateApi must be used within a TemplateApiProvider");
  }
  return context;
};

export default function App() {
  return (
    <TemplateApiContext.Provider value={templateApi}>
      <MainScreen />
    </TemplateApiContext.Provider>
  );
}
