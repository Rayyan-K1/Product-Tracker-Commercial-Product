ProductTracker.o.pages.UpdateOrderStatus = Vue.component('UpdateOrderStatus', function (resolve, reject) {
    fetch("./src/html/pages/updateOrderStatus.html").then(function (data) {
        data.text().then(function (html) {
            resolve({
                name: "UpdateOrderStatus",
                template: html,
                mixins: [ProductTracker.o.pages.DataTransfer, ProductTracker.o.pages.GlobalFunctions],
                data() {
                    return {
                        subNavigationCategories: [{
                            name: 'Track Orders',
                            id: 'trackOrders'
                        }],
                        selectedSubNavCategory: null,
                        search: {
                            searchInput: null,
                            searchFilterMode: 'Name',
                            searchResults: null,
                        },
                        selectedOrderIndex: null,
                        selectedOrder: null,
                        state: 'init',
                        isEdit: false,
                        productionProcessStages: null,
                        productionProcess: null,
                        darkTheme: ProductTracker.o.appData.DarkTheme
                    }
                },
                computed: {

                },
                methods: {
                    // Initialise function
                    initialise: function () {
                        this.selectedSubNavCategory = this.subNavigationCategories[0];
                    },
                    trackCustomerOrders: async function () {
                        let vue = this;
                        this.$root.loading = true;
                        // let results = await ProductTracker.o.pages.DataTransfer.trackOrder(vue.search.searchInput.replace("#", ""));
                        let results = await ProductTracker.o.pages.DataTransfer.getSpecificCustomerOrders(vue.search.searchInput);
                        this.$root.loading = false;
                        vue.search.searchResults = results;
                    },
                    selectOrder: async function (_index, _order) {
                        // let results = await ProductTracker.o.pages.DataTransfer.getProductionProcess(_product.ProductionID);
                        // this.newOrder.ProductionProcessStages = results;
                        this.$root.loading = true;
                        this.getProductionProcess(_order);
                        this.$root.loading = false;
                        this.selectedOrderIndex = _index;
                        this.selectedOrder = _order;
                        this.state = 'viewOrder';
                    },
                    editOrderStatus: function () {
                        this.isEdit = !this.isEdit;
                    },
                    getProductionProcess: async function (_order) {
                        let vue = this;
                        this.$root.loading = true;
                        let results = await ProductTracker.o.pages.DataTransfer.getSpecificProductionProcess(JSON.parse(_order.ProductionID));
                        this.$root.loading = false;
                        this.productionProcess = results[0].ProductionProcessName;
                        this.productionProcessStages = JSON.parse(results[0].Stages);
                    },
                    saveUpdatedOrderStatus: async function () {
                        let vue = this;
                        let stage = document.getElementById('orderProgress').value;
                        let progress = (100 / vue.productionProcessStages.length) * stage;
                        let obj = {
                            OrderID: vue.selectedOrder.ID,
                            Progress: progress
                        }
                        this.$root.loading = true;
                        let results = await ProductTracker.o.pages.DataTransfer.updateOrderStatus(obj);
                        this.$root.loading = false;
                        vue.isEdit = false;
                    },
                    goBack: function () {
                        this.state = 'init';
                        // clean inputs
                    }
                },
                mounted() {
                    this.initialise();
                },
            })
        })
    })
});