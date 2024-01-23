export type Expense = {
  postingDate: string;
  recipient: string;
  operationAmount: string;
  category: string;
  id: string;
};

export enum SpendCategory {
  Groceries = 'Artykuły spożywcze',
  Fuel = 'Paliwo',
  Transportation = 'Transport',
  BeautyAndHair = 'Uroda, fryzjer',
  Cosmetics = 'Kosmetyki',
  OnlineShopping = 'Zakupy przez internet',
  Restaurants = 'Restauracje',
  Cinema = 'Kino',
  Clubs = 'Kluby',
  Sports = 'Sport',
  Books = 'Książki',
  Travel = 'Podróże',
  Subscriptions = 'Subskrypcje',
  HomeAccessories = 'Akcesoria domowe',
  Others = 'Inne',
  Taxes = 'Podatki',
  InternetTVPhone = 'Internet, TV, telefon',
  PublicTransport = 'Transport publiczny',
  Home = 'Dom',
  HomeEquipment = 'Wyposażenie domu',
  Clothing = 'Ubrania',
  Bills = 'Rachunki',
  Uncategorized = 'Bez kategorii',
}

export const SPEND_CATEGORIES: SpendCategory[] = Object.values(SpendCategory);
