"use strict";

import { ItemList } from "./itemList";

export class Exercise2Screen {
    /**
     * Table rows displaying the set of users
     */
    userRows = new UserRowList(element.all(by.repeater("row in ctrl.userList")));
    
    /**
     * Table element displaying the set of users; 
     * note: {@userRows} provides a better API for working with the individual table rowss
     */
    userTable = element(by.css("table"));
    
    /**
     * Open the screen in the browser
     */
    open() {
        browser.get("#/exercise2")
    };
}

class UserRowList extends ItemList<UserRow, UserRowList> {

    protected create(items: protractor.ElementArrayFinder) {
        return new UserRowList(items);
    }

    protected wrap(item: protractor.ElementFinder) {
        return new UserRow(item);
    };
}


export class UserRow {
    constructor(public row: protractor.ElementFinder) { }
    name = this.row.element(by.binding("row.name"));
    email = this.row.element(by.binding("row.email"));
    phone = this.row.element(by.binding("row.phone"));
    static where = {
        nameEq(name: string): (row: UserRow) => webdriver.promise.Promise<boolean> {
            return (r: UserRow) => r.name.getText().then((n) => n === name);
        }
    }
}