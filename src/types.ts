export type Role = string;

export type User = {
  userId: string;
  email: string;
  roles: Role[];
};

export type MenuItem = {
  title: string;
  link: string;
  isSelected: boolean;
  children?: MenuItem[];
};

export type CartItem = {
  itemId: string;
  itemName: string;
  quantity: number;
  price: number;
};
