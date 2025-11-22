
export interface NavItem {
  label: string;
  href: string;
}

export interface WeaveItem {
  id: number;
  title: string;
  description: string;
  image: string;
  pattern: string;
  category: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
