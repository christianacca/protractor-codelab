"use strict";

describe('Exercise2', function() {

    beforeEach(function() {
        browser.get('#/exercise2');
    });

    it('should count the number of users', function() {
        // Use element.all to count the number of rows in the table.
        var rows = element.all(by.css('table tr'));
        expect(rows.count()).toBe(9);
    });

    it('should find user using by.repeater', function() {
        // Count the number of users by repeater.

        // Hint:
        // http://www.protractortest.org/#/api?view=ProtractorBy.prototype.repeater
        var userRows = element.all(by.repeater("row in ctrl.userList"));
        expect(userRows.count()).toBe(8);
    });

    it('should find Chuck Norris email address in the first row', function() {
        // Chain element finders to get Chuck Norris' email address.

        // Hint: Chuck Norris is always on the first table row.
        // Hint:
        // http://www.protractortest.org/#/api?view=ElementFinder.prototype.element
        
        var chucksEmailDisplay = element.all(by.repeater("row in ctrl.userList"))
            .get(0)
            .element(by.binding("row.email"));
        
        expect(chucksEmailDisplay.getText()).toBe("chuck@gmail.com");
    });
    
    it('should find the email address for John Rambo', function() {
        // Use the advanced features of element.all to find John Rambo's email address.

        // Hints:
        // You don't know in which row Larry Page is located, but you know the user
        // is present.
        // http://www.protractortest.org/#/api?view=ElementArrayFinder.prototype.filter
        // http://www.protractortest.org/#/api?view=ElementArrayFinder.prototype.map
        
        var ramboEmailDisplay = element.all(by.repeater("row in ctrl.userList"))
            .filter((row) => {
                return row.element(by.binding("row.name")).getText().then((name) => name === "John Rambo")
            })
            .map((row) => row.element(by.binding("row.email")).getText())
            .then((emails) => emails[0]);
        
        expect(ramboEmailDisplay).toEqual("rambo@gmail.com")
    });
});