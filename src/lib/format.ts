export function compact(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 1 : 1).replace('.0', '') + 'k';
  return String(n);
}

export function window(a: { window_hours: number | null }, lang: 'es' | 'en'): string {
  const h = a.window_hours;
  if (!h) return '';
  if (lang === 'es') {
    if (h <= 6) return `${h} h`;
    if (h <= 24) return '24 horas';
    if (h <= 48) return '3 días';
    if (h <= 168) return '7 días';
    if (h <= 336) return '2 semanas';
    if (h <= 744) return '1 mes';
    return `${Math.round(h / 720)} meses`;
  }
  if (h <= 6) return `${h}h`;
  if (h <= 24) return '24 hours';
  if (h <= 48) return '3 days';
  if (h <= 168) return '7 days';
  if (h <= 336) return '2 weeks';
  if (h <= 744) return '1 month';
  return `${Math.round(h / 720)} months`;
}
