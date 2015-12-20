"use strict";

/**
 * Represents a generic list of items displayed on a screen
 */
export abstract class ItemList<ItemT, ItemListT> {
    constructor(public items: protractor.ElementArrayFinder) { }

    /**
        * Count of the number of elements in {@link #items}
        *
        * @view
        * <ul>
        *   <li ng-repeat="user in ctrl.users">{{ user.name }}</li>
        * </ul>
        *
        * @example
        * var users = new UserList(element.all(by.repeater("user in ctrl.users")));
        * expect(users.count()).toBe(47);
        */
    count() {
        return this.items.count();
    }

    protected abstract create(rows: protractor.ElementArrayFinder): ItemList<ItemT, ItemListT>

    /**
        * Apply the `predicate` filter function to each item within {@link #items}. Returns
        * a new `ItemList` with all items that pass the filter function. The
        * `predicate` function receives the item as the first argument
        * and the index as a second arg.
        * This does not actually retrieve the underlying list of DOM elements.
        *
        * @view
        * <ul>
        *   <li ng-repeat="user in ctrl.users">{{ user.name }}</li>
        * </ul>
        *
        * @example
        * var users = new UserList(element.all(by.repeater("user in ctrl.users")));
        * var rambos = users.filter((user) => user.name.getText().then((name) => name.indexOf("Rambo") !== -1));
        * expect(rambos.count()).toBe(2);
        */
    filter<T>(predicate: (item: ItemT, index: number) => webdriver.promise.Promise<boolean> | boolean): ItemList<ItemT, ItemListT> {
        var matches = this.items.filter((item, idx) => {
            var wrapper = this.wrap(item);
            return predicate(wrapper, idx);
        });
        return this.create(matches);
    }

    /**
        * Apply the `predicate` filter function to each item within {@link #items} returning
        * the first item that passes the filter function. The
        * `predicate` function receives the item as the first argument.
        * This does not actually retrieve the underlying list of DOM elements.
        *
        * @view
        * <ul>
        *   <li ng-repeat="user in ctrl.users">{{ user.name }}</li>
        * </ul>
        *
        * @example
        * var users = new UserList(element.all(by.repeater("user in ctrl.users")));
        * var rambo = users.find((user) => user.name.getText().then((name) => name.indexOf("Rambo") !== -1));
        * expect(rambo.name.getText()).toBe("John Rambo");
        */
    find<T>(predicate: (item: ItemT) => webdriver.promise.Promise<boolean>): ItemT {
        return this.filter(predicate).first();
    }
    
    
    /**
        * Get the first item within the {@link #items}. This does not
        * actually retrieve the underlying DOM element.
        *
        * @view
        * <ul>
        *   <li ng-repeat="user in ctrl.users">{{ user.name }}</li>
        * </ul>
        *
        * @example
        * var users = new UserList(element.all(by.repeater("user in ctrl.users")));
        * expect(users.first().name.getText()).toBe('...');
        */
    first() {
        return this.wrap(this.items.first());
    }
    
    /**
        * Get an item within the {@link #items} by index position. The index starts at 0.
        * Negative indices are wrapped (i.e. -i means ith element from last)
        * This does not actually retrieve the underlying DOM element.
        *
        * @view
        * <ul>
        *   <li ng-repeat="user in ctrl.users">{{ user.name }}</li>
        * </ul>
        *
        * @example
        * var users = new UserList(element.all(by.repeater("user in ctrl.users")));
        * expect(users.get(0).name.getText()).toBe('...');
        * expect(users.get(1).name.getText()).toBe('...');
        */
    get(index: number) {
        return this.wrap(this.items.get(index));
    }
    
    /**
        * Get the last item within the {@link #items}. This does not
        * actually retrieve the underlying DOM element.
        *
        * @view
        * <ul>
        *   <li ng-repeat="user in ctrl.users">{{ user.name }}</li>
        * </ul>
        *
        * @example
        * var users = new UserList(element.all(by.repeater("user in ctrl.users")));
        * expect(users.last().name.getText()).toBe('...');
        */
    last() {
        return this.wrap(this.items.last());
    }
    
    /**
     * Create a wrapper over the `item` supplied so as to provide a taliored API for working with the `item`  
     */
    protected abstract wrap(item: protractor.ElementFinder): ItemT;
}