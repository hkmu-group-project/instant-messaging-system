import { create } from "zustand";

type UserStore = {
    id: string | undefined;
    name: string | undefined;
    setId: (id: string) => void;
    setName: (name: string) => void;
};

const useUserStore = create<UserStore>(
    (set): UserStore => ({
        id: undefined,
        name: undefined,
        setId: (id: string): void => {
            set({
                id,
            });
        },
        setName: (name: string): void => {
            set({
                name,
            });
        },
    }),
);

export type { UserStore };
export { useUserStore };
