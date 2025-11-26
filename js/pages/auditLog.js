ProductTracker.o.pages.AuditLog = Vue.component('AuditLog', function (resolve, reject) {
    fetch("./src/html/pages/auditLog.html").then(function (data) {
        data.text().then(function (html) {
            resolve({
                name: "AuditLog",
                template: html,
                mixins: [ProductTracker.o.pages.DataTransfer, ProductTracker.o.pages.GlobalFunctions],
                data() {
                    return {
                        subNavigationCategories: [{
                            name: 'Audit Log',
                            id: 'auditLog'
                        }],
                        selectedSubNavCategory: null,
                        selectedTab: 'dispatchedOrders',
                        orderData: null,
                        customers: null,
                        products: null
                    }
                },
                computed: {

                },
                methods: {
                    initialise: async function () {
                        this.$root.loading = true;
                        this.selectedSubNavCategory = this.subNavigationCategories[0];
                        await this.getProducts();
                        await this.getAllOrders();
                        await this.getAllCustomers();
                        this.$root.loading = false;
                    },
                    getAllOrders: async function () {
                        let vue = this;
                        this.$root.loading = true;
                        let results = await ProductTracker.o.pages.DataTransfer.getOrdersList();
                        vue.orderData = results;
                        this.$root.loading = false;
                    },
                    getAllCustomers: async function () {
                        let vue = this;
                        let results = await ProductTracker.o.pages.DataTransfer.getAllCustomers();
                        vue.customers = results;
                    },
                    getProducts: async function () {
                        let vue = this;
                        this.$root.loading = true;
                        let results = await ProductTracker.o.pages.DataTransfer.getProductsList();
                        this.products = results;
                        this.$root.loading = false;
                    },
                    getCustomerForOrder: function (_customerID) {
                        let vue = this;
                        for (let i = 0; i < vue.customers.length; i++) {
                            if (_customerID == vue.customers[i].ID) {
                                return vue.customers[i].Title + " " + vue.customers[i].FirstName + " " + vue.customers[i].Surname;
                            }
                        }
                    },
                    sortBy: function (_data, _by, _dataName) {
                        this[_dataName] = _.sortBy(_data, _by).reverse();
                    }

                },
                mounted() {
                    this.initialise();
                },
            })
        })
    })
});