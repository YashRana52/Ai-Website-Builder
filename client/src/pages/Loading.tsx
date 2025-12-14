import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";

const Loading = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.replace("/");
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-indigo-950">
      <div className="flex flex-col items-center gap-4 text-center animate-pulse">
        <Loader2Icon className="size-10 animate-spin text-indigo-400" />

        <h2 className="text-white text-lg font-medium">
          Processing your payment
        </h2>

        <p className="text-sm text-indigo-300 max-w-xs">
          Please wait while we securely confirm your transaction.
        </p>
      </div>
    </div>
  );
};

export default Loading;
