import { create } from 'zustand';
import getUsers from "@/app/actions/getUsers";
// zustand after getUsers set state to users
interface UsersStore {
    users: any;
  }

const useUsers = () => create<UsersStore>((set) => ({
    users: getUsers(),
    getAll: async () => {
        return (await getUsers())?.map((user) => ({
            value: user.id,
            label: user.name,
            image: user.image,
            email: user.email,
            }))
        },
    getByValue: async (value: string) => {

        return (await getUsers())?.find((item) => item.id === value);
    },
}));
export default useUsers;