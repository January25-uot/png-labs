export type Province = {
  id: string;
  name: string;
  capital: string;
  region: string;
};

export const PROVINCES: Province[] = [
  { id: '1', name: 'Morobe', capital: 'Lae', region: 'Momase' },
  { id: '2', name: 'Madang', capital: 'Madang', region: 'Momase' },
  { id: '3', name: 'Eastern Highlands', capital: 'Goroka', region: 'Highlands' },
  { id: '4', name: 'Enga', capital: 'Wabag', region: 'Highlands' },
  { id: '5', name: 'Western Highlands', capital: 'Mount Hagen', region: 'Highlands' },
  { id: '6', name: 'Southern Highlands', capital: 'Mendi', region: 'Highlands' },
  { id: '7', name: 'National Capital District', capital: 'Port Moresby', region: 'Southern' },
  { id: '8', name: 'East New Britain', capital: 'Kokopo', region: 'Islands' },
];