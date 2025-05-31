import type { AccountData } from "@/app/api/platforms/trading212/account/res.interface";
import type { PortfolioItem } from "@/lib/constants/portfolio212";
import { useEffect, useState } from "react";

export default function useFetchPortfolio(service:any ){

const [openPositionsPortfolio, setOpenPositionsPortfolio] = useState<
    PortfolioItem[]
  >([]);
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


useEffect(() => {
    async function fetchPortfolio() {
      try {
        const portfolioData = await service.getPortfolio();
        
        const accountData = await service.getAccountInfo();
        console.log("service", service);
        console.log(portfolioData, "DATA");
        
        

        setAccountData(accountData);
        setOpenPositionsPortfolio(portfolioData);
      } catch (err) {
        console.log(err, "errrrr");
        
        setError("Failed to fetch openPositionsPortfolio portfolioData");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchPortfolio();
  }, [service, openPositionsPortfolio])

  return {
    openPositionsPortfolio,
    loading,
    error,
    accountData
  }
}