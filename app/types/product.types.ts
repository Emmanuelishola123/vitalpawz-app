export interface productDataType {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  regular_price: number;
  sale_price: number;
  discount: {
    percentage: number;
    amount: number;
  };
  cover: string;
  is_configured: boolean;
  is_one_option: boolean;
  in_wishlist: boolean;
  wishlist_id: string | null | undefined;
  specifications: {
    specifications_description: string | null;
    items: { label: string; value: string }[];
  };
  dosages: {
    dosages_description: string | null;
    items: { label: string; value: string }[];
  };
  nutritions: {
    nutrition_facts_serving_label: string;
    nutrition_facts_description: string | null;
    nutrition_facts_serving: { label: string; value: string }[];
  };
  nutrition_facts_weight: { label: string; value: string }[];
  ingredients_description: string | null;
  directions_description: string | null;
  icons?: [];
  deal?: [];
}

export interface productMetaType {
  sorting: { title: string; sort_by: string; sort_dir: string }[];
  brands: { id: string; name: string; badge: string }[];
  categories: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    badge: {
      img: string | null;
      alt: string | null;
    };
    icon: { img: string | null; alt: string | null };
    children: { data: [] };
  }[];
  attributes: {
    id: string;
    label: string;
    type: string;
    options: {
      id: string;
      value: string;
      color_name: string | null;
    }[];
  };
  price: { min: number; max: number };
  pagination: {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    links: {
      previous: string;
      next: string;
    };
  };
}
