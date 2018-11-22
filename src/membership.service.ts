import { ProxyServiceMock } from "./proxy.service.mock";

export class MembershipService implements IMembershipService {
    public getUsers(): Promise<IUser[]> {
        throw Error("Not implemented");
    }
}
