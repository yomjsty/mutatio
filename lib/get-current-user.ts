import { getSession } from "@/lib/get-session";

export const getCurrentUser = async () => {
    const session = await getSession();
    if (!session) return null;
    const user = session.user;
    return user;
};
