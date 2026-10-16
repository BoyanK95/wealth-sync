# Benzinga API Integration Guide

## Overview

This integration brings real-time financial news, bulls and bears analysis, and earnings data to the WealthSync News page using the Benzinga API.

## Features Implemented

### 1. Real-time Trending News (WebSocket)
- **Component**: `RealtimeTrendingNews.tsx`
- **Features**:
  - Live websocket connection to Benzinga API
  - Auto-reconnection on disconnect (up to 3 attempts)
  - Displays trending financial news with:
    - Headline and source
    - Sentiment analysis (Bullish/Bearish/Neutral)
    - Importance rating (1-10)
    - Associated ticker symbols
    - Timestamps
  - Live status indicator showing connection state
  - Maximum 15 items displayed at a time

### 2. Bulls & Bears Analysis
- **Component**: `BullsBearsAnalysis.tsx`
- **Features**:
  - Comprehensive analysis with bullish, bearish, and neutral summaries
  - Analyst ratings (Strong Buy, Buy, Hold, Sell, Strong Sell)
  - Target price predictions
  - Number of analysts voting for each rating
  - Color-coded sentiment indicators
  - Fetchable per ticker

### 3. Earnings Analysis
- **Component**: `EarningsAnalysis.tsx`
- **Features**:
  - EPS (Earnings Per Share) estimates vs. actual
  - Revenue estimates vs. actual
  - Earnings surprise percentage
  - Upcoming/past earnings dates
  - Comparison summary (beats/misses expectations)

### 4. Benzinga Ticker-Specific News
- **Component**: `BenzingaTickerNews.tsx`
- **Features**:
  - News articles specific to searched ticker
  - Sentiment analysis and importance ratings
  - Multiple associated tickers per article
  - Linked news items (opens in new tab)

### 5. Backend API Route
- **Route**: `/api/benzinga`
- **Endpoints**:
  - `?endpoint=trending` - Get trending news
  - `?endpoint=ticker-news&ticker=AAPL` - Get news for specific ticker
  - `?endpoint=bulls-bears&ticker=AAPL` - Get bulls/bears analysis
  - `?endpoint=earnings&ticker=AAPL` - Get earnings analysis
  - `?endpoint=search&query=Apple` - Search for assets

## Configuration

### Environment Variables

Add the following to your `.env` file:

```env
BENZINGA_APIKEY=bz.YOUR_API_KEY_HERE
```

The API key is already included in your `.env` file:
```env
BENZINGA_APIKEY=bz.FHMGBC6QO66MITVBBDP3H3IKIWO6BJCO
```

### TypeScript Configuration

The environment variable is already configured in `src/env.js`:
```typescript
server: {
  BENZINGA_APIKEY: z.string().optional(),
},
runtimeEnv: {
  BENZINGA_APIKEY: process.env.BENZINGA_APIKEY,
}
```

## Usage

### On the News Page

The news page (`src/app/news/page.tsx`) automatically:
1. Passes the Benzinga API key to the NewsPageComponent
2. Displays real-time trending news at the top
3. Shows Bulls & Bears analysis when a ticker is searched
4. Displays earnings data for the ticker
5. Shows ticker-specific news from Benzinga

### In Custom Components

```typescript
import { RealtimeTrendingNews } from "@/components/NewsPageComponents/RealtimeTrendingNews";
import { BullsBearsAnalysisComponent } from "@/components/NewsPageComponents/BullsBearsAnalysis";

// Use in your component
<RealtimeTrendingNews apiKey={benzingaApiKey} maxItems={20} />

<BullsBearsAnalysisComponent ticker="AAPL" apiKey={benzingaApiKey} />
```

### Using the Benzinga Service Directly

```typescript
import BenzingaAPI from "@/lib/services/benzinga";

const benzinga = new BenzingaAPI(apiKey);

// Get trending news
const news = await benzinga.getTrendingNews(25);

// Get ticker-specific news
const tickerNews = await benzinga.getTickerNews(["AAPL", "GOOGL"]);

// Get analysis
const analysis = await benzinga.getBullsBearsAnalysis("AAPL");
const earnings = await benzinga.getEarningsAnalysis("AAPL");

// WebSocket for real-time data
const ws = benzinga.getNewsWebSocket(
  (newsItem) => console.log(newsItem),
  (error) => console.error(error)
);
```

### Using Custom Hooks

```typescript
import { 
  useBenzingaRealtimeNews, 
  useBenzingaTrendingNews,
  useBenzingaTickerNews 
} from "@/hooks/useBenzinga";

// Real-time news with WebSocket
const { news, isConnected, error } = useBenzingaRealtimeNews({
  apiKey: "your-api-key",
  maxItems: 50,
  onError: (error) => console.error(error)
});

// Trending news
const { news, loading } = useBenzingaTrendingNews({
  apiKey: "your-api-key",
  maxItems: 25
});

// Ticker-specific news
const { news, loading } = useBenzingaTickerNews("AAPL", {
  apiKey: "your-api-key",
  maxItems: 10
});
```

## File Structure

```
src/
├── lib/
│   └── services/
│       └── benzinga.ts                    # Main Benzinga API service
├── hooks/
│   └── useBenzinga.tsx                   # Custom React hooks
├── components/
│   └── NewsPageComponents/
│       ├── RealtimeTrendingNews.tsx       # Real-time news component
│       ├── BullsBearsAnalysis.tsx        # Analysis component
│       ├── EarningsAnalysis.tsx          # Earnings component
│       ├── BenzingaTickerNews.tsx        # Ticker-specific news
│       └── NewsPageComponent.tsx         # Main news page component
├── app/
│   ├── news/
│   │   └── page.tsx                      # News page
│   └── api/
│       └── benzinga/
│           └── route.ts                  # Benzinga API endpoint
└── ui/
    └── skeleton.tsx                      # Loading skeleton component
```

## API Response Types

### BenzingaNewsItem
```typescript
{
  id: string;
  title: string;
  body: string;
  created: string;
  updated: string;
  source: string;
  url: string;
  image?: string;
  tickers?: string[];
  rating?: number;
  importance?: number;
  sentiment?: string;
}
```

### BullsBearsAnalysis
```typescript
{
  ticker: string;
  bullish_summary: string;
  bearish_summary: string;
  neutral_summary: string;
  analyst_rating?: {
    rating: string;
    target_price?: number;
    num_strong_buys?: number;
    num_buys?: number;
    num_holds?: number;
    num_sells?: number;
    num_strong_sells?: number;
  };
}
```

### EarningsAnalysis
```typescript
{
  ticker: string;
  eps_estimate?: number;
  eps_actual?: number;
  revenue_estimate?: number;
  revenue_actual?: number;
  earnings_date?: string;
  surprise?: number;
}
```

## Translations

Translations have been added for English (`src/messages/en.json`) and Bulgarian (`src/messages/bg.json`):

- `NewsPage.RealtimeTrendingNews` - Real-time news translations
- `NewsPage.BullsBearsAnalysis` - Analysis translations
- `NewsPage.EarningsAnalysis` - Earnings translations
- `NewsPage.BenzingaTickerNews` - Ticker news translations

## Error Handling

All components include error handling:
- WebSocket connection failures auto-reconnect up to 3 times
- Failed API calls show user-friendly error messages
- Fallback to loading states while fetching data
- Network errors are caught and displayed appropriately

## Performance Considerations

1. **WebSocket Connection**: Only connects when the component is mounted
2. **Caching**: API responses are fetched fresh for each ticker search
3. **Pagination**: News items are limited to prevent excessive DOM elements
4. **Lazy Loading**: Components only render when data is available

## Known Limitations

1. WebSocket may have latency depending on network conditions
2. Benzinga API rate limits may apply (check API documentation)
3. Some tickers may not have complete analysis data available
4. Real-time WebSocket requires stable internet connection

## Troubleshooting

### WebSocket Connection Issues
- Check network connectivity
- Verify API key is valid
- Check browser console for specific error messages
- Component auto-reconnects up to 3 times

### No Data for Ticker
- Ensure ticker is spelled correctly
- Some tickers may not have Benzinga coverage
- Check API key has necessary permissions

### Type Errors
- Run `npm run typecheck` to verify TypeScript compilation
- Ensure all environment variables are set correctly

## Future Enhancements

Potential improvements:
- Add caching layer for repeated ticker searches
- Implement historical news archive
- Add sentiment analysis charts
- Create analyst recommendation trends
- Add notification system for important news
- Export analysis reports to PDF
