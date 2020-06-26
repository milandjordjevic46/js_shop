export interface Products {
  products: [
    {
      name: String;
      imageUrls: [];
      price: number;
      code: string;
      id: string;
      createdAt: string;
      quantity: number;
    }
  ];
  count: number;
}

export interface SingleProduct {
  name: string;
  imageUrls: string[];
  price: number;
  code: string;
  id: string;
  createdAt: string;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AccessToken {
  access_token: string;
}

export interface Orders {
  count: number;
  orders: Order[];
}

  export interface Order {
    createdAt: string;
    id: string;
    products: SingleProduct[];
    total: number;
}
