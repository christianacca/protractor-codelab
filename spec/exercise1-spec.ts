"use strict";

describe('Exercise1', function() {

  beforeEach(function() {
    browser.get('http://localhost:9000/#/exercise1');
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
    var emailInput = element(by.model('ctrl.user.email'));
    expect(emailInput.isPresent()).toBe(true);
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
    var phoneDisplay = element(by.binding('ctrl.displayUser.phone'));
    expect(phoneDisplay.isPresent()).toBe(true);
  });

  it('should find element by css', function() {
    // Use element to find an element by css. For example, find the email under
    // this tag:
    //
    // <div id="contact-email">
    //    <strong>Email:</strong>
    //    <span class="ng-binding">bruce.lee@google.com</span>
    // </div>
    var emailDisplay = element(by.css("#contact-email > span"));
    expect(emailDisplay.isPresent()).toBe(true); 
  });

  it('should get element text', function() {
    // Use element to get the text of a DOM node. For example: get Bruce Lee's
    // email address.
    var emailDisplay = element(by.binding('ctrl.displayUser.email'));
    expect(emailDisplay.getText()).toBe("bruce.lee@google.com")
  });

  it('should get input text', function() {
    // Use element to get the text of an input. For example: get the name,
    // email, or phone in the inputs.
    var emailInput = element(by.model('ctrl.user.email'));
    expect(emailInput.getAttribute("value")).toBe("bruce.lee@google.com");
  });

  it('should set input text', function() {
    // Use element to manipulate an input. For example: clear the name and
    // replace it with a new text value.
    var nameInput = element(by.model('ctrl.user.name'));
    nameInput.clear();
    nameInput.sendKeys("Christian Crowhurst");
    
    expect(nameInput.getAttribute("value")).toBe("Christian Crowhurst");
  });

  it('should update contact information', function() {
    // Update the contact information.
    var nameInput = element(by.model('ctrl.user.name'));
    nameInput.clear();
    nameInput.sendKeys("Christian Crowhurst");
    
    // Click on the update button.
    element(by.id('save-button')).click();
    
    // Verify the "Contact info" was updated.
    var nameDisplay = element(by.binding('ctrl.displayUser.name'));
    expect(nameDisplay.getText()).toBe("Christian Crowhurst");
  });
});