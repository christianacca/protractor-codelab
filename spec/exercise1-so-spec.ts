"use strict";

import Screen from "./screens/exercise1Screen";

describe('Exercise1 (using page object)', function() {

    var screen = new Screen();
    beforeEach(function() {
        screen.open();
    });

    it('should find element by model', function() {
        // Use element to find an element by model. For example, find Bruce Lee's
        // email address:
        // <div>
        //   <label for="email">Email</label>
        //   <input type="text" id="email" ng-model="ctrl.user.email"/>
        // </div>

        // Hint:
        // http://www.protractortest.org/#/api?view=ProtractorBy.prototype.model
        expect(screen.emailInput.isPresent()).toBe(true);
    });

    it('should find element by binding', function() {
        // Use element to find an element by binding. For example, find Bruce Lee's
        // phone number:
        // <div>
        //   <strong>Phone:</strong>
        //   <span>{{ctrl.displayUser.phone}}</span>
        // </div>


        // Hint:
        // http://www.protractortest.org/#/api?view=ProtractorBy.prototype.binding
        expect(screen.phoneDisplay.isPresent()).toBe(true);
    });

    it('should get element text', function() {
        // Use element to get the text of a DOM node. For example: get Bruce Lee's
        // email address.
        expect(screen.emailDisplay.getText()).toBe("bruce.lee@google.com")
    });

    it('should get input text', function() {
        // Use element to get the text of an input. For example: get the name,
        // email, or phone in the inputs.
        expect(screen.emailInput.getAttribute("value")).toBe("bruce.lee@google.com");
    });

    it('should set input text', function() {
        // Use element to manipulate an input. For example: clear the name and
        // replace it with a new text value.
        screen.nameInput.clear();
        screen.nameInput.sendKeys("Christian Crowhurst");

        expect(screen.nameInput.getAttribute("value")).toBe("Christian Crowhurst");
    });

    it('should update contact information', function() {
        // Update the contact information.
        var nameInput = element(by.model('ctrl.user.name'));
        screen.nameInput.clear();
        screen.nameInput.sendKeys("Christian Crowhurst");
    
        screen.save();
    
        // Verify the "Contact info" was updated.
        expect(screen.nameDisplay.getText()).toBe("Christian Crowhurst");
    });
});