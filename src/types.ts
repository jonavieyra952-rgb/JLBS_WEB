import type { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  image: string;
  icon?: LucideIcon;
}

export interface SubProduct {
  name: string;
  image: string;
  description?: string; // Descripción específica de la variante
}

export interface ProductItem {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  subProducts?: SubProduct[]; // Lista opcional de variantes
}

export interface NavItem {
  label: string;
  href: string;
}