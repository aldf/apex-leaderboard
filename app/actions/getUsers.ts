import prisma from "@/app/libs/prismadb";
import { UserSelectValue } from "@/app/components/inputs/UserSelect";
export default async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true
      },
    });

    // return users as UserSelectValue
    return users.map((user) => ({
        id: user.id,
        name: user.name as string || null,
        image: user.image as string || null,
        email: user.email as string || null,
        }))
        
  } catch (error: any) {
    return null;
  }
}