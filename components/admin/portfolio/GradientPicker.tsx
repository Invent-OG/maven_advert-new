import React from "react";
import { Check, ChevronDown } from "lucide-react";

interface GradientPickerProps {
  value: {
    start: string;
    end: string;
    direction: string;
    enabled: boolean;
  };
  onChange: (value: {
    start: string;
    end: string;
    direction: string;
    enabled: boolean;
  }) => void;
}

const DIRECTIONS = [
  { label: "To Right", value: "to right" },
  { label: "To Left", value: "to left" },
  { label: "To Bottom", value: "to bottom" },
  { label: "To Top", value: "to top" },
  { label: "To Bottom Right", value: "to bottom right" },
  { label: "To Bottom Left", value: "to bottom left" },
  { label: "To Top Right", value: "to top right" },
  { label: "To Top Left", value: "to top left" },
];

export function GradientPicker({ value, onChange }: GradientPickerProps) {
  const handleChange = (key: string, val: any) => {
    onChange({ ...value, [key]: val });
  };

  const gradientStyle = value.enabled
    ? `linear-gradient(${value.direction}, ${value.start}, ${value.end})`
    : "none";

  return (
    <div className="space-y-4 p-4 bg-gray-50/50 rounded-xl border border-gray-200/60">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={value.enabled}
            onChange={(e) => handleChange("enabled", e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 focus:ring-offset-0"
          />
          Enable Gradient Overlay
        </label>
      </div>

      {value.enabled && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Colors */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Start Color
              </label>
              <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <div className="relative w-8 h-8 rounded-md overflow-hidden shrink-0 border border-gray-100">
                  <input
                    type="color"
                    value={value.start}
                    onInput={(e) =>
                      handleChange(
                        "start",
                        (e.target as HTMLInputElement).value,
                      )
                    }
                    className="absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] p-0 border-none cursor-pointer"
                  />
                </div>
                <input
                  type="text"
                  value={value.start}
                  onChange={(e) => handleChange("start", e.target.value)}
                  className="w-full text-xs font-mono text-gray-600 bg-transparent border-none focus:ring-0 p-0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                End Color
              </label>
              <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <div className="relative w-8 h-8 rounded-md overflow-hidden shrink-0 border border-gray-100">
                  <input
                    type="color"
                    value={value.end}
                    onInput={(e) =>
                      handleChange("end", (e.target as HTMLInputElement).value)
                    }
                    className="absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] p-0 border-none cursor-pointer"
                  />
                </div>
                <input
                  type="text"
                  value={value.end}
                  onChange={(e) => handleChange("end", e.target.value)}
                  className="w-full text-xs font-mono text-gray-600 bg-transparent border-none focus:ring-0 p-0"
                />
              </div>
            </div>
          </div>

          {/* Direction */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Direction
            </label>
            <div className="relative">
              <select
                value={value.direction}
                onChange={(e) => handleChange("direction", e.target.value)}
                className="w-full pl-3 pr-10 py-2 text-sm bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-sm cursor-pointer"
              >
                {DIRECTIONS.map((dir) => (
                  <option key={dir.value} value={dir.value}>
                    {dir.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Preview
            </label>
            <div
              className="h-16 w-full rounded-lg border border-gray-200/80 shadow-inner"
              style={{ background: gradientStyle }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
