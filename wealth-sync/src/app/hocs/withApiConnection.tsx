"use client";

import React, { useEffect, useState } from "react";
import { type PlatformKey } from "@/lib/constants/apiKeyStrings";
import { usePlatformConnection } from "@/lib/contexts/PlatformConnectionContext";

export type ApiConnectionInjectedProps = {
  apiKey: string;
  setApiKey: React.Dispatch<React.SetStateAction<string>>;
};

export function withApiConnection<T extends object>(
  Wrapped: React.ComponentType<T & ApiConnectionInjectedProps>,
  platformKey: PlatformKey,
) {
  return function ComponentWithApiConnection(props: T) {
    const { connections } = usePlatformConnection();
    const connection = connections[platformKey];
    const [apiKey, setApiKey] = useState("");

    useEffect(() => {
      if (connection?.isConnected) {
        setApiKey(connection.apiKey);
      }
    }, [connection?.isConnected, connection?.apiKey]);

    return <Wrapped {...props} apiKey={apiKey} setApiKey={setApiKey} />;
  };
}
