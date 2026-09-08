import { roleEnum } from "@/db/schema";

export type Me = {
    id: string;
    name: string;
    role: typeof roleEnum.enumValues[number]
    mobileVerified: boolean;
    email: string;
    mobile: string;
    designation: string | null;
    department: string | null;
}
