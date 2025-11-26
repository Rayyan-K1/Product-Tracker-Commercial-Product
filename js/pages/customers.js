ProductTracker.o.pages.Customers = Vue.component('Customers', function (resolve, reject) {
    fetch("./src/html/pages/customers.html").then(function (data) {
        data.text().then(function (html) {
            resolve({
                name: "Customers",
                template: html,
                mixins: [ProductTracker.o.pages.DataTransfer, ProductTracker.o.pages.GlobalFunctions],
                data() {
                    return {
                        subNavigationCategories: [{
                            name: 'Register New',
                            id: 'registerNew'
                        }, {
                            name: 'Lookup',
                            id: 'lookup'
                        }],
                        selectedSubNavCategory: null,
                        search: {
                            searchInput: null,
                            searchFilterMode: 'Name',
                            data: null,
                            selectedCustomer: null,
                            selectedCustomerTags: null,
                        },
                        registerNewCustomer: {
                            title: null,
                            firstName: null,
                            surname: null,
                            telephone: null,
                            emailAddress: null,
                            notes: null,
                            address: null,
                            postcode: null
                        },
                        labels: [],
                        dynamicLabelData: {
                            title: null,
                        },
                        darkTheme: ProductTracker.o.appData.DarkTheme
                    }
                },
                computed: {
                    canRegisterNewCustomer: function () {
                        let vue = this;
                        if (vue.registerNewCustomer.title && vue.registerNewCustomer.firstName && vue.registerNewCustomer.surname && vue.registerNewCustomer.telephone && vue.registerNewCustomer.emailAddress) {
                            return false;
                        } else {
                            return true;
                        }
                    },
                },
                methods: {
                    initialise: function () {
                        this.selectedSubNavCategory = this.subNavigationCategories[0];
                    },
                    uuidv4: function () {
                        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
                        );
                    },
                    openPopup: function (_popup) {
                        $('#popup-' + _popup).modal({
                            show: true
                        });
                    },
                    addLabel: function () {
                        let vue = this;
                        let obj = {
                            title: vue.dynamicLabelData.title,
                        };
                        let id = vue.dynamicLabelData.title + "_" + vue.uuidv4();
                        obj.bindID = id;
                        vue.labels.push(obj);
                    },
                    registerCustomer: async function () {
                        let vue = this;
                        this.$root.loading = true;
                        let tagArray = [];
                        for (let i = 0; i < vue.labels.length; i++) {
                            let obj = {};
                            let el = document.getElementById(vue.labels[i].bindID);
                            obj.bindID = [vue.labels[i].bindID];
                            obj.title = [vue.labels[i].title];
                            obj.value = el.value;
                            tagArray.push(obj);
                        }
                        this.registerNewCustomer.tags = tagArray;
                        let newCustomerObj = this.registerNewCustomer;

                        // Send HTTP call to register customer
                        await ProductTracker.o.pages.DataTransfer.addCustomer(newCustomerObj);
                        this.clean();
                        ProductTracker.o.pages.GlobalFunctions.toggleToast('toast-customer-registered');
                        $('#CustomersPage').animate({
                            scrollTop: 0
                        });
                        this.$root.loading = false;
                    },
                    toggleFilter: function (_filter) {
                        this.search.searchFilterMode = _filter;
                        this.search.searchInput = null;
                    },
                    searchCustomer: async function () {
                        let vue = this;
                        let params = {};
                        if (vue.search.searchFilterMode == 'Name') {
                            if (vue.search.searchInput.trim().split(" ").length == 2) {
                                params.FirstName = vue.search.searchInput.split(" ")[0];
                                params.Surname = vue.search.searchInput.split(" ")[1];
                            } else if (vue.search.searchInput.trim().split(" ").length == 1) {
                                params.FirstName = vue.search.searchInput.split(" ")[0];
                            }
                        } else {
                            params.Email = vue.search.searchInput.trim()
                        }
                        this.$root.loading = true;
                        // Send a HTTP request to get the result based on the search parameters
                        try {
                            let results = await ProductTracker.o.pages.DataTransfer.getCustomers(vue.search.searchFilterMode, params);
                            vue.search.data = results;
                        } catch (err) {
                            vue.search.data = null;
                        }
                        this.$root.loading = false;
                    },
                    selectCustomer: function (_customer) {
                        let vue = this;
                        vue.search.selectedCustomer = _customer;
                    },
                    getTagsFromSelectedCustomer: function (_customer) {
                        let vue = this;
                        vue.search.selectedCustomer ? vue.search.selectedCustomerTags = JSON.parse(_customer.Tags) : null;
                    },
                    deleteCustomer: async function () {
                        let vue = this;
                        await ProductTracker.o.pages.DataTransfer.deleteCustomer(vue.search.selectedCustomer.ID);
                        vue.searchCustomer();
                    },
                    clean: function () {
                        let vue = this;
                        vue.registerNewCustomer.title = null;
                        vue.registerNewCustomer.firstName = null;
                        vue.registerNewCustomer.surname = null;
                        vue.registerNewCustomer.telephone = null;
                        vue.registerNewCustomer.emailAddress = null;
                        vue.registerNewCustomer.notes = null;
                    }
                },
                mounted() {
                    this.initialise();
                },
            })
        })
    })
});