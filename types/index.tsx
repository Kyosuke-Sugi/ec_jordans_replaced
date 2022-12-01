export type Item = {
  id: number;
  name: string;
  series: string;
  year: number;
  description: string;
  setprice: string;
  color: string;
  deleted: boolean;
};

export type Stock = {
  id: number;
  itemID: number;
  price: number;
  size: number;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  amount: number;
  arrival: Date;
  condition: string;
  item: Item;
};

export type Users = {
  id: number;
  firstName: string;
  lastName: string;
  kanaFirstName: string;
  kanaLastName: string;
  email: string;
  password: string;
  zipcode: string;
  address: string;
  telephone: string;
  deleted: string;
};

export type FavoriteItem = {
  itemId: number;
  cookieName: string | undefined;
  name: string;
  price: number;
  size: number;
  imagePath: string;
  condition: string;
  deleted: boolean;
};

export type FavoriteItem2 = {
<<<<<<< HEAD
  id: number;
  itemId: number;
  cookieName: string | undefined;
  name: string;
  price: number;
  size: number;
  imagePath: string;
  condition: string;
  deleted: boolean;
};
=======
  condition: string;
  imagePath: string;
  size: number;
  price: number;
  name: string;
  id: number,
  itemId: number;
  cookieName: string | undefined; 
}
>>>>>>> origin/main