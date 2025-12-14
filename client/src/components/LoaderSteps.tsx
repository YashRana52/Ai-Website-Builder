import {
  CircleIcon,
  ScanLineIcon,
  SquareIcon,
  TriangleIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

const steps = [
  { icon: ScanLineIcon, label: "Analyzing your request..." },
  { icon: SquareIcon, label: "Generating layout structure..." },
  { icon: TriangleIcon, label: "Assembling UI components..." },
  { icon: CircleIcon, label: "Finalizing your website..." },
];

const STEP_DURATION = 45000;

function LoaderSteps() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % steps.length);
    }, STEP_DURATION);

    return () => clearInterval(interval);
  }, []);

  const Icon = steps[current].icon;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-950 text-white relative overflow-hidden">
      {/* Soft animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-fuchsia-500/10 blur-3xl animate-pulse opacity-60" />

      {/* Icon wrapper */}
      <div className="relative z-10 w-32 h-32 flex items-center justify-center">
        {/* Outer pulse ring */}
        <div className="absolute inset-0 rounded-full border border-indigo-400/40 animate-ping opacity-40" />

        {/* Inner static ring */}
        <div className="absolute inset-4 rounded-full border border-purple-400/20" />

        {/* Animated icon */}
        <Icon className="w-10 h-10 text-white opacity-90 animate-bounce" />
      </div>

      {/* Step text with fade animation */}
      <p
        key={current}
        className="mt-8 text-lg font-light text-white/90 tracking-wide transition-all duration-700 ease-out opacity-100"
      >
        {steps[current].label}
      </p>

      {/* Small helper text */}
      <p className="mt-2 text-sm text-white/60 tracking-wide">
        This may take around 2-3 minutes...
      </p>
    </div>
  );
}

export default LoaderSteps;
