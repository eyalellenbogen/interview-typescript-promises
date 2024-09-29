import { ProxyServiceMock } from "./proxy.service.mock";
import { MembershipService } from "./membership.service";
describe("MembershipService getUsers() method", () => {
  let proxy = ProxyServiceMock;
  let proxySpy: jest.SpyInstance<Promise<IUser[]>>;
  let membershipService: IMembershipService;

  beforeEach(() => {
    membershipService = new MembershipService();
    proxySpy = jest.spyOn(proxy, "getData");
    proxySpy.mockClear();
  });

  /**
   * Calls getUsers() and checks a call was made to the proxy
   * and that the reponse contains results.
   * --- flow ---
   * getUsers() => 1 proxy call
   */
  test(`should call proxy and get search results`, async () => {
    const res = await membershipService.getUsers();
    expect(proxySpy).toHaveBeenCalled();
    expect(res.length).toBeGreaterThan(0);
  });

  /**
   * Performs the same getUsers() call multiple times
   * and checks that only one request was actually sent to the proxy.
   * --- flow ---
   * getUsers()*5 => 1 proxy call
   */
  test(`should throttle repeating requests until the proxy returns a result`, async () => {
    const results = await callServiceMultipleTimes(5);
    expect(proxySpy).toHaveBeenCalledTimes(1);
    expect(results[0]).toEqual(results[1]);
  });

  /**
   * Performs the same request multiple times. Once finished with the
   * first set of requests (and a result was returned), it does it again. Then it checks that only 2 calls were
   * made to the proxy.
   * --- flow ---
   * getUsers()*5, await response, getUsers()*5 => 2 proxy calls
   */
  test(`should send another request when called after the first one was resolved`, async () => {
    await callServiceMultipleTimes(5);
    callServiceMultipleTimes(5);
    expect(proxySpy).toHaveBeenCalledTimes(2);
  });

  /**
   * Calls getUsers() with a "name" parameter and checks
   * that the results are filtered to match the parameter value.
   * --- flow ---
   * getUsers('dave'), await response => response data has only `dave` results
   */
  test(`should return only results that match the "name" query parameter`, async () => {
    const name = "dave";
    const results = await membershipService.getUsers(name);
    let isResultsCorrect = resultsMatchNameQuery(results, name);
    expect(isResultsCorrect).toBeTruthy();
  });

  /**
   * Executes the getUsers() call with 2 different "name" values
   * and then checks 2 calls were made to the proxy.
   * --- flow ---
   * getUsers('dave'), getUsers('michael') => 2 proxy calls
   */
  test(`should call proxy once per query`, () => {
    const phrase1 = "dave";
    const phrase2 = "michael";
    membershipService.getUsers(phrase1);
    membershipService.getUsers(phrase2);
    expect(proxySpy).toHaveBeenCalledTimes(2);
  });

  /** ----------------------------------------- */
  /** ------------ Helper methods ------------- */
  /** ----------------------------------------- */

  /**
   * Takes a result array and matches each `result.name` to the `name` paramter.
   *
   * @param {IUser[]} results
   * @param {string} name
   * @returns {boolean} `boolean` - true when every result matches and false when not
   */
  function resultsMatchNameQuery(results: IUser[], name: string): boolean {
    return results.every(
      (x) => x.name.toLowerCase().indexOf(name.toLowerCase()) >= 0
    );
  }

  /**
   * Calls getUsers() multiple times according the the `repeat` parameter and passes the name to search.
   * Returns a promise containing an array of result arrays -> IUser[][].
   *
   * @param {number} repeat
   * @param {string} [name]
   * @returns `Promise<IUser[][]>`
   */
  function callServiceMultipleTimes(
    repeat: number,
    name?: string
  ): Promise<IUser[][]> {
    const arr: Promise<IUser[]>[] = Array(repeat)
      .fill(0)
      .map((x) => membershipService.getUsers.bind(membershipService)(name));
    return Promise.all(arr);
  }
});
