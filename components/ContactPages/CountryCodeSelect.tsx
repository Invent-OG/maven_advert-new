"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, Search, Check } from "lucide-react";

export interface CountryItem {
  name: string;
  code: string;
  flag: string;
  iso: string;
  keywords?: string;
}

export const COUNTRIES: CountryItem[] = [
  { name: "India", code: "+91", flag: "🇮🇳", iso: "IN", keywords: "bharat in 91" },
  { name: "United Arab Emirates", code: "+971", flag: "🇦🇪", iso: "AE", keywords: "uae dubai abu dhabi 971" },
  { name: "United States", code: "+1", flag: "🇺🇸", iso: "US", keywords: "usa america 1" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧", iso: "GB", keywords: "uk britain england london 44" },
  { name: "Singapore", code: "+65", flag: "🇸🇬", iso: "SG", keywords: "sg 65" },
  { name: "Saudi Arabia", code: "+966", flag: "🇸🇦", iso: "SA", keywords: "ksa riyadh 966" },
  { name: "Qatar", code: "+974", flag: "🇶🇦", iso: "QA", keywords: "doha 974" },
  { name: "Oman", code: "+968", flag: "🇴🇲", iso: "OM", keywords: "muscat 968" },
  { name: "Kuwait", code: "+965", flag: "🇰🇼", iso: "KW", keywords: "965" },
  { name: "Bahrain", code: "+973", flag: "🇧🇭", iso: "BH", keywords: "manama 973" },
  { name: "Australia", code: "+61", flag: "🇦🇺", iso: "AU", keywords: "aus sydney 61" },
  { name: "Canada", code: "+1", flag: "🇨🇦", iso: "CA", keywords: "ca toronto 1" },
  { name: "Malaysia", code: "+60", flag: "🇲🇾", iso: "MY", keywords: "my kl 60" },
  { name: "Germany", code: "+49", flag: "🇩🇪", iso: "DE", keywords: "deutschland 49" },
  { name: "France", code: "+33", flag: "🇫🇷", iso: "FR", keywords: "paris 33" },
  { name: "Italy", code: "+39", flag: "🇮🇹", iso: "IT", keywords: "italia 39" },
  { name: "Spain", code: "+34", flag: "🇪🇸", iso: "ES", keywords: "espana 34" },
  { name: "New Zealand", code: "+64", flag: "🇳🇿", iso: "NZ", keywords: "nz 64" },
  { name: "South Africa", code: "+27", flag: "🇿🇦", iso: "ZA", keywords: "sa 27" },
  { name: "Sri Lanka", code: "+94", flag: "🇱🇰", iso: "LK", keywords: "ceylon colombo 94" },
  { name: "Bangladesh", code: "+880", flag: "🇧🇩", iso: "BD", keywords: "dhaka 880" },
  { name: "Nepal", code: "+977", flag: "🇳🇵", iso: "NP", keywords: "kathmandu 977" },
  { name: "Pakistan", code: "+92", flag: "🇵🇰", iso: "PK", keywords: "92" },
  { name: "Philippines", code: "+63", flag: "🇵🇭", iso: "PH", keywords: "manila 63" },
  { name: "Indonesia", code: "+62", flag: "🇮🇩", iso: "ID", keywords: "jakarta 62" },
  { name: "Thailand", code: "+66", flag: "🇹🇭", iso: "TH", keywords: "bangkok 66" },
  { name: "Vietnam", code: "+84", flag: "🇻🇳", iso: "VN", keywords: "hanoi 84" },
  { name: "Japan", code: "+81", flag: "🇯🇵", iso: "JP", keywords: "tokyo 81" },
  { name: "South Korea", code: "+82", flag: "🇰🇷", iso: "KR", keywords: "seoul 82" },
  { name: "China", code: "+86", flag: "🇨🇳", iso: "CN", keywords: "beijing 86" },
  { name: "Hong Kong", code: "+852", flag: "🇭🇰", iso: "HK", keywords: "hk 852" },
  { name: "Taiwan", code: "+886", flag: "🇹🇼", iso: "TW", keywords: "taipei 886" },
  { name: "Ireland", code: "+353", flag: "🇮🇪", iso: "IE", keywords: "dublin 353" },
  { name: "Netherlands", code: "+31", flag: "🇳🇱", iso: "NL", keywords: "holland amsterdam 31" },
  { name: "Switzerland", code: "+41", flag: "🇨🇭", iso: "CH", keywords: "swiss zurich 41" },
  { name: "Sweden", code: "+46", flag: "🇸🇪", iso: "SE", keywords: "stockholm 46" },
  { name: "Norway", code: "+47", flag: "🇳🇴", iso: "NO", keywords: "oslo 47" },
  { name: "Denmark", code: "+45", flag: "🇩🇰", iso: "DK", keywords: "copenhagen 45" },
  { name: "Finland", code: "+358", flag: "🇫🇮", iso: "FI", keywords: "helsinki 358" },
  { name: "Poland", code: "+48", flag: "🇵🇱", iso: "PL", keywords: "warsaw 48" },
  { name: "Portugal", code: "+351", flag: "🇵🇹", iso: "PT", keywords: "lisbon 351" },
  { name: "Belgium", code: "+32", flag: "🇧🇪", iso: "BE", keywords: "brussels 32" },
  { name: "Austria", code: "+43", flag: "🇦🇹", iso: "AT", keywords: "vienna 43" },
  { name: "Turkey", code: "+90", flag: "🇹🇷", iso: "TR", keywords: "turkiye istanbul 90" },
  { name: "Egypt", code: "+20", flag: "🇪🇬", iso: "EG", keywords: "cairo 20" },
  { name: "Nigeria", code: "+234", flag: "🇳🇬", iso: "NG", keywords: "lagos 234" },
  { name: "Kenya", code: "+254", flag: "🇰🇪", iso: "KE", keywords: "nairobi 254" },
  { name: "Brazil", code: "+55", flag: "🇧🇷", iso: "BR", keywords: "brasil 55" },
  { name: "Mexico", code: "+52", flag: "🇲🇽", iso: "MX", keywords: "52" },
  { name: "Argentina", code: "+54", flag: "🇦🇷", iso: "AR", keywords: "buenos aires 54" },
  { name: "Chile", code: "+56", flag: "🇨🇱", iso: "CL", keywords: "santiago 56" },
  { name: "Colombia", code: "+57", flag: "🇨🇴", iso: "CO", keywords: "bogota 57" },
  { name: "Israel", code: "+972", flag: "🇮🇱", iso: "IL", keywords: "tel aviv 972" },
  { name: "Greece", code: "+30", flag: "🇬🇷", iso: "GR", keywords: "athens 30" },
  { name: "Mauritius", code: "+230", flag: "🇲🇺", iso: "MU", keywords: "230" },
  { name: "Maldives", code: "+960", flag: "🇲🇻", iso: "MV", keywords: "male 960" },
];

interface CountryCodeSelectProps {
  value: CountryItem;
  onChange: (country: CountryItem) => void;
}

export default function CountryCodeSelect({
  value,
  onChange,
}: CountryCodeSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus search input when popover opens
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setSearch("");
    }
  }, [open]);

  const filteredCountries = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return COUNTRIES;

    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.iso.toLowerCase().includes(q) ||
        (c.keywords && c.keywords.toLowerCase().includes(q))
    );
  }, [search]);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Select country phone code"
          className="flex items-center gap-1.5 py-6 pr-2.5 text-gray-800 hover:text-orange-600 transition-colors focus:outline-none cursor-pointer select-none group"
        >
          <span className="text-xl leading-none">{value.flag}</span>
          <span className="text-sm font-semibold tracking-tight">
            {value.code}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-orange-500 transition-transform duration-200" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={8}
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="w-80 p-0 bg-white border border-gray-200 shadow-2xl rounded-2xl overflow-hidden z-50 animate-in fade-in-0 zoom-in-95"
      >
        {/* Search header */}
        <div className="p-3 border-b border-gray-100 bg-gray-50/70">
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country or code..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-gray-900 placeholder:text-gray-400 transition"
            />
          </div>
        </div>

        {/* Scrollable list of countries */}
        <div
          data-lenis-prevent="true"
          className="max-h-64 overflow-y-auto divide-y divide-gray-50 overscroll-contain [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-50 [&::-webkit-scrollbar-thumb]:bg-gray-300 hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full"
          style={{
            maxHeight: "260px",
            overflowY: "auto",
            overscrollBehavior: "contain",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "thin",
            scrollbarColor: "#cbd5e1 #f8fafc",
          }}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {filteredCountries.length === 0 ? (
            <div className="py-6 text-center text-xs text-gray-400">
              No matching country found
            </div>
          ) : (
            filteredCountries.map((country) => {
              const isSelected =
                country.iso === value.iso && country.code === value.code;
              return (
                <button
                  key={`${country.iso}-${country.code}`}
                  type="button"
                  onClick={() => {
                    onChange(country);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-left text-xs transition-colors hover:bg-orange-50/80 cursor-pointer ${
                    isSelected
                      ? "bg-orange-50 text-orange-950 font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <span className="text-lg leading-none shrink-0">
                      {country.flag}
                    </span>
                    <span className="truncate">{country.name}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-gray-500 font-mono text-[11px] font-medium">
                      {country.code}
                    </span>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-orange-600" />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
