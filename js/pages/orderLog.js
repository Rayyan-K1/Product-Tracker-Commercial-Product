ProductTracker.o.pages.OrderLog = Vue.component('OrderLog', function (resolve, reject) {
    fetch("./src/html/pages/orderLog.html").then(function (data) {
        data.text().then(function (html) {
            resolve({
                name: "OrderLog",
                template: html,
                mixins: [ProductTracker.o.pages.DataTransfer, ProductTracker.o.pages.GlobalFunctions],
                data() {
                    return {
                        subNavigationCategories: [{
                            name: 'Order Log',
                            id: 'orderLog'
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
                        },
                        productionProcess: null,
                        selectedOrderForUpdatedOrderState: null,
                        selectedProductionProcessStages: null,
                        darkTheme: ProductTracker.o.appData.DarkTheme,
                        search: {
                            searchInput: null,
                            data: [],
                        },
                        customers: null,
                        customerNameReload: 0,
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
                    switchPage: function (_page) {
                        let vue = this;
                        switch (_page) {
                            case "addOrder":
                                vue.state = _page;
                                break;
                        }
                    },
                    formatDate: function (_ISOTimestamp) {
                        let standardDate = new Date(_ISOTimestamp);
                        let formattedDate = standardDate.getDate() + "/" + standardDate.getMonth() + "/" + standardDate.getFullYear();
                        return formattedDate;
                    },
                    selectProduct: async function (_index, _product) {
                        this.$root.loading = true;
                        let results = await ProductTracker.o.pages.DataTransfer.getProductionProcesses();
                        this.productionProcess = results;
                        this.selectedProductIndex = _index;
                        this.selectedProduct = _product;
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

                    getCustomerDataForOrder: function (_customerID) {
                        ProductTracker.o.pages.DataTransfer.getCustomers('CustomerID', {
                            "CustomerID": _customerID
                        }).then((data) => {
                            return data[0].Title + " " + data[0].FirstName + " " + data[0].Surname;
                        });
                    },
                    updateOrderState: async function (_ID) {
                        let vue = this;
                        // this.$root.loading = true;
                        await ProductTracker.o.pages.DataTransfer.updateOrderState(_ID);
                        vue.initialise();
                        // this.$root.loading = false;
                    },
                    getCustomerForOrder: function (_customerID) {
                        let vue = this;
                        for (let i = 0; i < vue.customers.length; i++) {
                            if (_customerID == vue.customers[i].ID) {
                                return vue.customers[i].Title + " " + vue.customers[i].FirstName + " " + vue.customers[i].Surname;
                            }
                        }
                    },
                    getAllCustomers: async function () {
                        let vue = this;
                        let results = await ProductTracker.o.pages.DataTransfer.getAllCustomers();
                        vue.customers = results;
                    },
                    searchOrders: async function () {
                        let vue = this;
                        let array = [];
                        if (vue.search.searchInput.trim()) {
                            for (let i = 0; i < vue.orderData.length; i++) {
                                if (vue.orderData[i].CustomerID == vue.search.searchInput) {
                                    array.push(vue.orderData[i]);
                                }
                            }
                            vue.search.data = array;
                        } else {
                            vue.search.data = [];
                        }
                    },
                    openPopup: function (_popup, _orderID) {
                        $('#popup-' + _popup).modal({
                            show: true
                        });
                        this.selectedOrderForUpdatedOrderState = _orderID;
                    }
                },
                mounted() {
                    this.initialise();
                },
                watch: {
                    'newOrder.allocatedProductionProcess': function (_val) {
                        this.selectedProductionProcessStages = JSON.parse(_val.Stages);
                    },
                    'search.searchInput': function (_val) {
                        if (!_val) {
                            this.searchOrders();
                        }
                    }
                }
            })
        })
    })
});