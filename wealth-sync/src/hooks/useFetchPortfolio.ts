import type { AccountData } from "@/app/api/platforms/trading212/account/res.interface";
import type { PortfolioItem } from "@/lib/constants/portfolio212";
import { usePlatformConnection } from "@/lib/contexts/PlatformConnectionContext";
import { Trading212Service } from "@/lib/services/trading212Service";
import { fetchWithRetry } from "@/lib/utils/fetchWithRetry";
import { useEffect, useState } from "react";

const [openPositionsPortfolio, setOpenPositionsPortfolio] = useState<
    PortfolioItem[]
  >([]);
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllPositions, setShowAllPositions] = useState<boolean>(false);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(
    {},
  );
  const { getApiKey } = usePlatformConnection();

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const apiKey = getApiKey("trading212");
        const service = new Trading212Service(apiKey!);
        const portfolioData = await service.getPortfolio();
        const accountData = await service.getAccountInfo();
        
        setAccountData(accountData);
        setOpenPositionsPortfolio(portfolioData);
      } catch (err) {
        setError("Failed to fetch openPositionsPortfolio portfolioData");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchPortfolio();
  }, [getApiKey, openPositionsPortfolio]);