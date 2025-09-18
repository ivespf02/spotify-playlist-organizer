import { UserProfileI } from "@/types/UserProfileI";
import { create } from "zustand";

type UserProfileStoreT = UserProfileI & {
  accessToken: string;
};

type ProfileState = {
  profile: UserProfileStoreT;
  setProfile: (profile: UserProfileStoreT) => void;
  clearProfile: () => void;
};

export const useProfileStore = create<ProfileState>((set) => ({
  profile: {} as UserProfileStoreT,

  setProfile: (profile: UserProfileStoreT) =>
    set((state) => ({
      profile: profile,
    })),

  clearProfile: () => set({ profile: {} as UserProfileStoreT }),
}));
