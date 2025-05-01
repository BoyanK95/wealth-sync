"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface PlatformConnection {
  platformId: string;
  apiKey: string;
  isConnected: boolean;
}

interface PlatformConnectionContextType {
  connections: PlatformConnection[];
  getApiKey: (platformId: string) => string | null;
  refreshConnections: () => Promise<void>;
}

const PlatformConnectionContext = createContext<PlatformConnectionContextType | null>(null);

export function PlatformConnectionProvider({ children }: { children: React.ReactNode }) {
  const [connections, setConnections] = useState<PlatformConnection[]>([]);

  const refreshConnections = async () => {
    try {
      const response = await fetch('/api/platforms/connections');
      if (!response.ok) throw new Error('Failed to fetch connections');
      const data = await response.json();
      console.log('Fetched connections:', data);
      setConnections(data as PlatformConnection[]);
    } catch (error) {
      console.error('Error fetching platform connections:', error);
    }
  };

  const getApiKey = (platformId: string): string | null => {
    console.log('Getting API key for platform:', platformId);
    
    const connection = connections.find(conn => conn.platformId === platformId);
    return connection?.apiKey ?? null;
  };

  useEffect(() => {
    refreshConnections();
  }, []);

  return (
    <PlatformConnectionContext.Provider value={{ connections, getApiKey, refreshConnections }}>
      {children}
    </PlatformConnectionContext.Provider>
  );
}

export function usePlatformConnection() {
  const context = useContext(PlatformConnectionContext);
  if (!context) {
    throw new Error('usePlatformConnection must be used within a PlatformConnectionProvider');
  }
  return context;
}