import Link from "next/link";
import Image from "next/image";
import { type Platform } from "@/lib/constants/platforms";

export const IntegrationPlatformCard = ({
  platform,
  isConnected,
}: {
  platform: Platform;
  isConnected: boolean;
}) => {
  return (
    <Link
      href={platform.connectUrl ?? "/"}
      className="group relative flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:scale-105 hover:border-green-500 hover:shadow-lg dark:bg-slate-800"
    >
      {/* Connection Status Indicator */}
      {isConnected && (
        <div className="absolute -top-2 -right-2 h-4 w-4 rounded-full border-2 border-white bg-green-500 shadow-sm" />
      )}

      {/* Platform Logo */}
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 transition-colors duration-200 group-hover:bg-green-50">
        {platform.logo ? (
          <Image
            src={platform.logo}
            alt={`${platform.name} logo`}
            width={32}
            height={32}
            className="rounded-full object-contain"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
            <span className="text-xs font-bold text-gray-600">
              {platform.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <span className="text-center text-sm leading-tight font-medium text-gray-900 dark:text-white">
        {platform.name}
      </span>
      <span
        className={`mt-1 text-xs ${
          isConnected
            ? "font-medium text-green-600"
            : "text-gray-500 dark:text-gray-300"
        }`}
      >
        {isConnected ? "Connected" : "Connect"}
      </span>
    </Link>
  );
};

export default IntegrationPlatformCard;
