import getCountryFlag from "country-flag-icons/unicode";

interface FlagIconProps {
  code: string;
  fallback?: string;
  className?: string;
}

export function FlagIcon({ code, fallback, className }: FlagIconProps) {
  const flag = /^[A-Z]{2}$/i.test(code) ? getCountryFlag(code) : fallback ?? code;

  return <span className={className}>{flag || fallback || code}</span>;
}
