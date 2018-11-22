import { ProxyServiceMock } from "./proxy.service.mock";
import { MembershipService } from "./membership.service";

describe("MembershipService getUsers() method", () => {
    let proxy = ProxyServiceMock;
    let proxySpy: jasmine.Spy;
    let membershipService: IMembershipService = new MembershipService();

    beforeEach(() => {
        proxySpy = spyOn(proxy, "getData").and.callThrough();
    });

    /**
     * Calls getUsers() and checks a call was made to the server
     * and that the reponse contains results.
     */
    it("should call server and return search results", (done) => {
        membershipService.getUsers().then(res => {
            expect(proxySpy).toHaveBeenCalled();
            expect(res.length).toBeGreaterThan(0);
            done();
        });
    });

    /**
     * Calls getUsers() with a `name` parameter and checks
     * that the results match the name.
     */
    it("should return only results that match the name query", (done) => {
        const name = "dave";
        membershipService.getUsers(name).then(results => {
            let isResultsCorrect = resultsMatchNameQuery(results, name);
            expect(isResultsCorrect).toBeTruthy();
            done();
        });
    });

    /** 
     * Performs the same getUsers() call multiple times 
     * and checks that only one request was actually sent to the server.
     */
    it("should throttle repeating requests until server replies", (done) => {
        callServiceMultipleTimes(5).then((res) => {
            expect(proxySpy).toHaveBeenCalledTimes(1);
            expect(res[0]).toEqual(res[1]);
            done();
        });
    });

    /**
     * Performs the same request multiple times. Once finished with the
     * first request it does it again. Then it checks that only 2 calls were
     * made to the server.
     */
    it("should send another request when called after resolved", (done) => {
        callServiceMultipleTimes(5).then(() => {
            callServiceMultipleTimes(5);
            expect(proxySpy).toHaveBeenCalledTimes(2);
            done();
        });
    });

    /**
     * Sends 2 different calls to the server and 
     * checks 2 calls were sent to the server.
     */
    it("should call server once per query", (done) => {
        const phrase1 = "dave";
        const phrase2 = "michael";
        membershipService.getUsers(phrase1);
        membershipService.getUsers(phrase2);
        expect(proxySpy).toHaveBeenCalledTimes(2);
        done();
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
    function resultsMatchNameQuery(results: IUser[], name: string) {
        return results.every(x => x.name.toLowerCase().indexOf(name.toLowerCase()) >= 0);
    }

    /**
     * Calls getUsers() multiple times according the the `repeat` parameter and passes the name to search.
     * Returns a promise containing an array of result arrays -> IUser[][]. 
     *
     * @param {number} repeat
     * @param {string} [name]
     * @returns `Promise<IUser[][]>`
     */
    function callServiceMultipleTimes(repeat: number, name?: string): Promise<IUser[][]> {
        const arr: Promise<IUser[]>[] = Array(repeat).fill(0).map(x => membershipService.getUsers.bind(membershipService)(name));
        return Promise.all(arr);
    }
});

