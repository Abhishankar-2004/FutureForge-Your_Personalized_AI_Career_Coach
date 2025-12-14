import { db } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

/**
 * Ensures a user exists in the database, creating them if they don't exist
 * @param {string} userId - The Clerk user ID
 * @returns {Promise<User>} The user object from the database
 */
export async function ensureUserExists(userId) {
  let user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    const clerkUser = await currentUser();
    user = await db.user.create({
      data: {
        clerkUserId: userId,
        email: clerkUser?.emailAddresses?.[0]?.emailAddress || "",
        name: clerkUser?.fullName || clerkUser?.firstName || "",
        imageUrl: clerkUser?.imageUrl || null,
      },
    });
  }

  return user;
}

/**
 * Gets the current authenticated user, ensuring they exist in the database
 * @returns {Promise<{userId: string, user: User}>} The Clerk user ID and database user object
 */
export async function getCurrentUser() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await ensureUserExists(userId);
  return { userId, user };
}