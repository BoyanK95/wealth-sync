"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { PlatformKey } from "../constants/apiKeyStrings";

export interface IPlatformConnection {
  platformId: string;
  apiKey: string;
  isConnected: boolean;
}

interface IPlatformConnectionContextType {
  loading: boolean;
  hasFetched: boolean;
  connections: Record<PlatformKey, IPlatformConnection>;
  connectionsCount: number;
  refreshConnections: () => Promise<void>;
}

const PlatformConnectionContext =
  createContext<IPlatformConnectionContextType | null>(null);

export function PlatformConnectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const [hasFetched, setHasFetched] = useState<boolean>(false);
  const [connections, setConnections] = useState(
    {} as Record<PlatformKey, IPlatformConnection>,
  );

  const refreshConnections = async () => {
    try {
      const response = await fetch("/api/platforms/connections");
      if (!response.ok) throw new Error("Failed to fetch connections");
      const data = (await response.json()) as Record<
        PlatformKey,
        IPlatformConnection
      >;

      setConnections(data);
    } catch (error) {
      console.error("Error fetching platform connections:", error);
    } finally {
      setLoading(false);
      setHasFetched(true);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    refreshConnections();
  }, []);

  return (
    <PlatformConnectionContext.Provider
      value={{
        loading,
        hasFetched,
        connections: connections,
        connectionsCount: Object.values(connections).length,
        refreshConnections,
      }}
    >
      {children}
    </PlatformConnectionContext.Provider>
  );
}

export function usePlatformConnection() {
  const context = useContext(PlatformConnectionContext);
  if (!context) {
    throw new Error(
      "usePlatformConnection must be used within a PlatformConnectionProvider",
    );
  }
  return context;
}
