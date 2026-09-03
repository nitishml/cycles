// import { db } from "@/db/drizzle";
// import { roleEnum, user } from "@/db/schema";
// import { eq } from "drizzle-orm";
// import { redirect } from "next/navigation";
// import { getSession } from "./get-session";

// type AllowedRole = typeof roleEnum.enumValues[number]
// // type AllowedStaffRole = typeof staffRoleEnum.enumValues[number]

// export async function validateRole(allowedRoles: AllowedRole[]) {
//     const session = await getSession();

//     if (!session) {
//         redirect("/login");
//     }

//     const userRole = await db.query.user.findFirst({
//         where: eq(user.id, session.userId),
//         columns: { role: true }
//     });

//     if (!userRole || !allowedRoles.includes(userRole.role as AllowedRole)) {
//         return { authorized: false };
//     }

//     return { authorized: true };
// }

// // export async function validateStaffRole(allowedRoles: AllowedStaffRole[]) {
// //     const session = await getSession();

// //     if (!session) {
// //         redirect("/auth/login");
// //     }

// //     const userRole = await db.query.staff.findFirst({
// //         where: eq(user.id, session.userId),
// //         columns: { staffRole: true }
// //     });

// //     if (!userRole || !allowedRoles.includes(userRole.staffRole as AllowedStaffRole)) {
// //         return { staffAccess: false };
// //     }

// //     return { staffAccess: true };
// // }


// export async function roleRedirector(id: string) {
//     const userRole = await db.query.user.findFirst({
//         where: eq(user.id, id),
//         columns: { role: true }
//     });

//     // const staffRole = await db.query.staff.findFirst({
//     //     where: eq(user.id, id),
//     //     columns: { staffRole: true }
//     // });

//     return {
//         role: userRole?.role || undefined,
//         // staffRole: staffRole?.staffRole || undefined
//     }
// }