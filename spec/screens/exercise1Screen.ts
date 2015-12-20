"use strict";

export default class Exercise1Screen {
    emailDisplay = element(by.binding("ctrl.displayUser.email"));
    nameDisplay = element(by.binding("ctrl.displayUser.name"));
    phoneDisplay = element(by.binding("ctrl.displayUser.phone"));
    emailInput = element(by.model("ctrl.user.email"));
    nameInput = element(by.model("ctrl.user.name"));
    phoneInput = element(by.model("ctrl.user.phone"));
    saveButton = element(by.id('save-button'));
    open() {
        browser.get("#/exercise1");
    }
    save() {
        this.saveButton.click();
    }
}