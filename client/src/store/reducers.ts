import { createSlice } from "@reduxjs/toolkit";

export interface UserObject {
  user: User | null;
}

export interface User {
  _id?: string;
  username?: string;
  email: string;
  password: string;
  passwordConfirm: string;
  fullName: string;
  dateOfBirth?: string; // Assuming it's stored as a string in a suitable format
  profilePicture?: string;
  phoneNumber?: string;
  addresses: Address[];
  orders: string[]; // Assuming order IDs are stored as strings
  paymentMethods: PaymentMethod[];
  age?: number;
  uniqueId: string;
  businessType?: BusinessType;
  businessName?: string;
  gstRegisteredNumber?: string;
}

interface Address {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

interface PaymentMethod {
  cardNumber: string;
  cardHolderName: string;
  expirationDate: string;
  isDefault: boolean;
}

enum BusinessType {
  SoleProprietorship = "Sole Proprietorship",
  Partnership = "Partnership",
  Corporation = "Corporation",
  LLC = "LLC",
  Other = "Other",
}

const userSlice = createSlice({
  name: "user",
  initialState: { user: null } as UserObject,
  reducers: {
    setUserObject: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUserObject, logoutUser } = userSlice.actions;

export default userSlice.reducer;
