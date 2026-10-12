import { BookOpen, FileCheck2, Globe, Bot, Code, BarChart3, Megaphone, Lightbulb, Newspaper, FolderOpen, Quote } from 'lucide-react';

const map = { BookOpen, FileCheck2, Globe, Bot, Code, BarChart3, Megaphone, Lightbulb, Newspaper, FolderOpen, Quote };

export default function Icon({ name, size = 24, ...rest }) {
  const Cmp = map[name] || FileCheck2;
  return <Cmp size={size} strokeWidth={1.5} aria-hidden="true" {...rest} />;
}
