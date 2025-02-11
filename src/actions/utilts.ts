import { getServerSession } from "next-auth"

export const checkIsAuthUser = async (userEmail: string) => {
    const session = await getServerSession()
    if (session?.user?.email !== userEmail) {
      throw new Error('Unauthorized')
    }
  }