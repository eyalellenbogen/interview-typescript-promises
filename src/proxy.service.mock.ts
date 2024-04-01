const data: IUser[] = [
  {
    name: "Ewing Wallace",
    age: 20,
  },
  {
    name: "Michael Craft",
    age: 30,
  },
  {
    name: "Anthony Blackwell",
    age: 38,
  },
  {
    name: "Dave Sims",
    age: 26,
  },
  {
    name: "Castaneda Todd",
    age: 39,
  },
  {
    name: "Middleton Hancock",
    age: 31,
  },
  {
    name: "Dave Carney",
    age: 28,
  },
  {
    name: "Kathryn Franklin",
    age: 31,
  },
  {
    name: "Silva Lewis",
    age: 30,
  },
  {
    name: "Marisa Nunez",
    age: 27,
  },
  {
    name: "Mullins Lancaster",
    age: 35,
  },
  {
    name: "Vargas Pace",
    age: 20,
  },
];

export const ProxyServiceMock: IProxyService = {
  getData(): Promise<IUser[]> {
    return new Promise((resolve, reject) => {
      resolve(data);
    });
  },
};
