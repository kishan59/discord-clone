
import { db } from '@/lib/db';
import { auth, currentUser } from "@clerk/nextjs/server";

export const initialProfile = async () => {
    const { redirectToSignIn } = await auth();
    const user = await currentUser();

    if (!user) {
        return redirectToSignIn();
    }

    let profile = await db.profile.findUnique({
        where: {
            userId: user.id
        }
    });

    if (profile) {
        return profile;
    }

    try {
        const newProfile = await db.profile.create({
            data: {
                userId: user.id,
                name: `${user.firstName} ${user.lastName}`,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress
            }
        });
        
        return newProfile;
    } catch (error) {
        profile = await db.profile.findUnique({
            where: {
                userId: user.id
            }
        });
        
        if (profile) {
            return profile;
        }
        
        throw error;
    }
}