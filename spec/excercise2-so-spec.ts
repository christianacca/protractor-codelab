"use strict";

import { Exercise2Screen, UserRow } from "./screens/exercise2Screen";

describe('Exercise2', function() {

    var screen = new Exercise2Screen();
    beforeEach(function() {
        screen.open();
    });

    it('should count the number of users', function() {
        // Use element.all to count the number of rows in the table.
        var rows = screen.userTable.all(by.css("tr"));
        expect(rows.count()).toBe(9);
    });

    it('should find user using by.repeater', function() {
        // Count the number of users by repeater.

        // Hint:
        // http://www.protractortest.org/#/api?view=ProtractorBy.prototype.repeater
        expect(screen.userRows.count()).toBe(8);
    });

    it('should find Chuck Norris email address in the first row', function() {
        // Chain element finders to get Chuck Norris' email address.

        // Hint: Chuck Norris is always on the first table row.
        // Hint:
        // http://www.protractortest.org/#/api?view=ElementFinder.prototype.element
        
        expect(screen.userRows.get(0).email.getText()).toBe("chuck@gmail.com");
    });
    
    it('should find the email address for John Rambo', () => {
        var email = screen.userRows
            .find(UserRow.where.nameEq("John Rambo")).email;

        expect(email.getText()).toEqual("rambo@gmail.com")
    });
    
    function emailEq(email: string, user: UserRow) {
        return user.email.getText().then((value) => value === email);
    }
    
    it('should find the phone for specific email', () => {
        var phone = screen.userRows
            .find((user) => emailEq("rambo@gmail.com", user)).phone;

        expect(phone.getText()).toEqual("415-555-9876")
    });
});