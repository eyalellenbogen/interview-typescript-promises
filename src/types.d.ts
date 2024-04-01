interface IUser {
  age: number;
  name: string;
}

interface IProxyService {
  getData(): Promise<IUser[]>;
}

interface IMembershipService {
  getUsers(name?: string): Promise<IUser[]>;
}
