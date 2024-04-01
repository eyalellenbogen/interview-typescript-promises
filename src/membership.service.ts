import { ProxyServiceMock } from "./proxy.service.mock"; // <-- I am here for a reason... USE ME!

export class MembershipService implements IMembershipService {
  public getUsers(): Promise<IUser[]> {
    throw Error("Not implemented");
  }
}
