export interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface CheckoutState {
  shippingAddress: ShippingAddress | null;
  couponCode: string;
}
