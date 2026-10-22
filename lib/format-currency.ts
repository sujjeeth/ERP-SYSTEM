export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCompactINR(amount: number): string {
  const absolute = Math.abs(amount);

  if (absolute >= 1_00_00_000) {
    return `₹${(amount / 1_00_00_000).toFixed(1)} Cr`;
  }

  if (absolute >= 1_00_000) {
    return `₹${(amount / 1_00_000).toFixed(1)} L`;
  }

  return formatINR(amount);
}

export function formatLakhs(value: number): string {
  return `₹${value.toFixed(1)} L`;
}