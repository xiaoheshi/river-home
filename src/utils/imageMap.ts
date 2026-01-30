const PROJECT_IMAGE_MAP: Record<string, string> = {
  'ecommica-deals': 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=600&auto=format&fit=crop',
  'bid-assistant': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=600&auto=format&fit=crop',
  'novel-writer': 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop',
};

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop';

export const getProjectImage = (id: string): string => {
  return PROJECT_IMAGE_MAP[id] || DEFAULT_IMAGE;
};
