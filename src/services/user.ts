import { getAdminByAuthId } from "../db/queries/admin";
import {
  getDefaultStaff,
  getRoleByStaffId,
  getStaffById,
} from "../db/queries/staff";
import { STAFF_ROLES } from "../config/constants";
import { authUtil } from "../utils/auth";
import type { Document } from "mongoose";

class LoginService {
  private authId: string;
  private isAdminUser: boolean;

  constructor(authId: string, isAdmin: boolean) {
    this.authId = authId;
    this.isAdminUser = isAdmin;
  }

  private loginSuperAdmin = async () => {
    const admin = await getAdminByAuthId(this.authId);
    if (!admin) return null;
    return { actor: admin, role: STAFF_ROLES[0] };
  };

  private loginStaff = async () => {
    const staff = await getDefaultStaff(this.authId);
    const role = await getRoleByStaffId(staff?._id?.toString() ?? "");

    if (!staff || !role) return null;

    return { actor: staff, role: role.type };
  };

  private formatResponse = async (res: {
    actor: Document;
    role: (typeof STAFF_ROLES)[number];
  }) => {
    const { actor, role } = res;
    const token = authUtil.generateToken({
      user: this.authId,
      actor: actor._id as string,
      role: role,
    });

    const userType = this.isAdminUser ? "admin" : "staff";
    return { auth: { id: this.authId, role, token }, [userType]: actor };
  };

  public async getAuthedActor() {
    const method = this.isAdminUser ? this.loginSuperAdmin : this.loginStaff;
    const loginResponse = await method();
    if (loginResponse === null) return null;

    return this.formatResponse(loginResponse);
  }

  public async authStaff(staffId: string) {
    const staff = await getStaffById(staffId);
    const role = await getRoleByStaffId(staff?._id?.toString() ?? "");

    if (!staff || !role) return null;
    return this.formatResponse({ actor: staff, role: role.type });
  }
}

export { LoginService };
