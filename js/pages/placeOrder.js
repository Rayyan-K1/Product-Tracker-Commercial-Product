ProductTracker.o.pages.PlaceOrder = Vue.component('PlaceOrder', function (resolve, reject) {
    fetch("./src/html/pages/placeOrder.html").then(function (data) {
        data.text().then(function (html) {
            resolve({
                name: "PlaceOrder",
                template: html,
                mixins: [ProductTracker.o.pages.DataTransfer, ProductTracker.o.pages.GlobalFunctions],
                data() {
                    return {
                        subNavigationCategories: [{
                            name: 'New Order',
                            id: 'newOrder'
                        }],
                        selectedSubNavCategory: null,
                        selectedProductIndex: null,
                        selectedProduct: null,
                        data: null,
                        orderData: null,
                        state: 'init',
                        newOrder: {
                            Completed: false,
                            Quantity: 0,
                            CompletionTimestamp: null,
                            Progress: null,
                            allocatedProductionProcess: null,
                            Customer: null,
                        },
                        productionProcess: null,
                        selectedProductionProcessStages: null,
                        darkTheme: ProductTracker.o.appData.DarkTheme,
                        search: {
                            Input: null,
                            Results: null,
                        },
                        customers: null,
                    }
                },
                computed: {
                    canConfirmOrder: function () {
                        let vue = this;
                        if (vue.newOrder.Quantity > 0 && (vue.newOrder.Completed == "true" ? (vue.newOrder.CompletionTimestamp ? true : false) : true) && vue.newOrder.allocatedProductionProcess && vue.newOrder.Progress && vue.newOrder.Customer) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    canAddCompletionDate: function () {
                        let vue = this;
                        if (vue.newOrder.Completed == "true") {
                            return true;
                        } else {
                            return false;
                        }
                    },
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
                    switchPage: function (_page) {
                        let vue = this;
                        switch (_page) {
                            case "addOrder":
                                vue.state = _page;
                                break;
                        }
                    },
                    selectProduct: async function (_index, _product) {
                        this.$root.loading = true;
                        let results = await ProductTracker.o.pages.DataTransfer.getProductionProcesses();
                        this.productionProcess = results;
                        this.selectedProductIndex = _index;
                        this.selectedProduct = _product;
                        this.clear();
                        this.$root.loading = false;
                    },
                    getProducts: async function () {
                        let vue = this;
                        this.$root.loading = true;
                        let results = await ProductTracker.o.pages.DataTransfer.getProductsList();
                        this.data = results;
                        this.$root.loading = false;
                    },
                    getAllOrders: async function () {
                        let vue = this;
                        this.$root.loading = true;
                        let results = await ProductTracker.o.pages.DataTransfer.getOrdersList();
                        vue.orderData = results;
                        this.$root.loading = false;
                    },
                    searchOrdersData: function () {
                        let vue = this;
                        let filteredResults = [];
                        _.filter(vue.data, function (_order) {
                            if (_order.Name.toLowerCase().includes(vue.search.Input.toLowerCase())) {
                                filteredResults.push(_order);
                            };
                        });
                        return filteredResults;
                    },
                    uuidv4: function () {
                        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
                        );
                    },
                    addOrder: async function (_obj) {
                        let vue = this;
                        let quantity = this.newOrder.Quantity;
                        let price = _obj.Price * quantity;
                        let allocatedProductionProcess = this.newOrder.allocatedProductionProcess.ProductionID;
                        let stage = document.getElementById('orderProgress').value;
                        let progress = (100 / vue.selectedProductionProcessStages.length) * stage;
                        let completed = progress == 100 ? true : this.newOrder.Completed;
                        let customerID = document.getElementById('orderCustomer').value;
                        let completionTimestamp = null;
                        if (completed == true) {
                            completionTimestamp = vue.newOrder.CompletionTimestamp;
                        }
                        let obj = {
                            orderID: 'orderID_' + vue.uuidv4(),
                            name: _obj.Name,
                            features: _obj.ProductFeatures,
                            price: price,
                            quantity: quantity,
                            orderNumber: vue.uuidv4(),
                            description: _obj.Description,
                            completed: completed,
                            completionDate: completionTimestamp,
                            progress: progress,
                            productionID: allocatedProductionProcess,
                            customerID: customerID,
                            timestamp: new Date().toISOString()
                        };
                        this.state = 'init';
                        this.$root.loading = true;
                        await ProductTracker.o.pages.DataTransfer.addOrder(obj);
                        this.$root.loading = false;
                        ProductTracker.o.pages.GlobalFunctions.toggleToast('toast-order-added');
                    },
                    getAllCustomers: async function () {
                        let vue = this;
                        let results = await ProductTracker.o.pages.DataTransfer.getAllCustomers();
                        vue.customers = results;
                    },
                    goBack: function () {
                        this.state = 'init';
                        // clean inputs
                    },
                    getCustomers: function () {
                        let vue = this;
                        return _.sortBy(vue.customers, 'Surname')
                    },
                    getPrice: function () {
                        let vue = this;
                        return Math.round((vue.selectedProduct.Price * vue.newOrder.Quantity) * 100) / 100;
                    },
                    clear: function () {
                        this.newOrder.Completed = false;
                        this.newOrder.Quantity = 0;
                        this.newOrder.CompletionTimestamp = null;
                        this.newOrder.Progress = null;
                        this.newOrder.allocatedProductionProcess = null;
                        this.newOrder.Customer = null;
                    }
                },
                mounted() {
                    this.initialise();
                },
                watch: {
                    'newOrder.allocatedProductionProcess': function (_val) {
                        this.selectedProductionProcessStages = JSON.parse(_val.Stages);
                    }
                }
            })
        })
    })
});