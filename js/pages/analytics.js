ProductTracker.o.pages.Analytics = Vue.component('Analytics', function (resolve, reject) {
    fetch("./src/html/pages/analytics.html").then(function (data) {
        data.text().then(function (html) {
            resolve({
                name: "Analytics",
                template: html,
                mixins: [ProductTracker.o.pages.DataTransfer, ProductTracker.o.pages.GlobalFunctions],
                data() {
                    return {
                        subNavigationCategories: [{
                            name: 'Analytics',
                            id: 'analytics'
                        }, {
                            name: 'Charts',
                            id: 'charts'
                        }],
                        selectedSubNavCategory: null,
                        orderData: null,
                        customers: null,
                    }
                },
                computed: {

                },
                methods: {
                    initialise: function () {
                        this.selectedSubNavCategory = this.subNavigationCategories[0];
                        this.getAllOrders();
                        this.getAllCustomers();
                    },
                    initialiseCharts: function () {
                        this.initialiseChartOne();
                        this.initialiseChartTwo();
                        this.initialiseChartThree();
                        this.initialiseChartFour();
                    },
                    initialiseChartOne: async function () {
                        let results = await ProductTracker.o.pages.DataTransfer.getProductsList();
                        let productsLength = results.length;
                        let ctx = document.getElementById('canvasID').getContext('2d');
                        let myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ['', 'Products'],
                                datasets: [{
                                    label: '# of Products',
                                    data: [0, productsLength],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(255, 99, 132, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(255, 99, 132, 1)',
                                    ],
                                    borderWidth: 1
                                }]
                            },
                            options: {
                                scales: {
                                    y: {
                                        beginAtZero: true
                                    }
                                }
                            }
                        });
                    },
                    initialiseChartTwo: async function () {
                        let results = await ProductTracker.o.pages.DataTransfer.getProductsList();
                        let productsPriceArray = [0];
                        let productsNameArray = [''];
                        let backgroundColorArray = [''];
                        let borderColorArray = ['']
                        for (let i = 0; i < results.length; i++) {
                            productsNameArray.push(results[i].Name);
                            productsPriceArray.push(results[i].Price);
                            backgroundColorArray.push('rgba(54, 162, 235, 0.2)')
                            borderColorArray.push('rgba(54, 162, 235, 1)')
                        }
                        let ctx = document.getElementById('canvasTwoID').getContext('2d');
                        let myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: productsNameArray,
                                datasets: [{
                                    label: 'Price of Product',
                                    data: productsPriceArray,
                                    backgroundColor: backgroundColorArray,
                                    borderColor: borderColorArray,
                                    borderWidth: 1
                                }]
                            },
                            options: {
                                scales: {
                                    y: {
                                        beginAtZero: true
                                    }
                                }
                            }
                        });
                    },
                    initialiseChartThree: async function () {
                        let users = await ProductTracker.o.pages.DataTransfer.getAllUsers();
                        let ctx = document.getElementById('canvasThreeID').getContext('2d');
                        let myChart = new Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: ['Beginning', 'Currently'],
                                datasets: [{
                                    label: '# of Users',
                                    data: [0, users.length],
                                    backgroundColor: [
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(255, 206, 86, 1)',
                                    ],
                                    borderWidth: 1
                                }]
                            },
                            options: {
                                scales: {
                                    y: {
                                        beginAtZero: true
                                    }
                                }
                            }
                        });
                    },
                    initialiseChartFour: async function () {
                        let results = await ProductTracker.o.pages.DataTransfer.getAllCustomers();
                        let ctx = document.getElementById('canvasFourID').getContext('2d');
                        let myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ['', 'Customers'],
                                datasets: [{
                                    label: '# of Customers',
                                    data: [0, results.length],
                                    backgroundColor: [
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(75, 192, 192, 1)',
                                    ],
                                    borderWidth: 1
                                }]
                            },
                            options: {
                                scales: {
                                    y: {
                                        beginAtZero: true
                                    },
                                    x: {
                                        // The axis for this scale is determined from the first letter of the id as `'x'`
                                        // It is recommended to specify `position` and / or `axis` explicitly.
                                        type: 'time',
                                    }
                                }
                            }
                        });
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
                    checkCompletedOrders: function () {
                        let vue = this;
                        let array = [];
                        if (vue.orderData) {
                            for (let i = 0; i < vue.orderData.length; i++) {
                                if (vue.orderData[i].Dispatched == 'true') {
                                    array.push(vue.orderData[i]);
                                }
                            }

                        }
                        return array;
                    },
                    checkPendingOrders: function () {
                        let vue = this;
                        let array = [];
                        if (vue.orderData) {
                            for (let i = 0; i < vue.orderData.length; i++) {
                                if (!vue.orderData[i].Dispatched) {
                                    array.push(vue.orderData[i]);
                                }
                            }

                        }
                        return array;
                    },
                    checkTotalRevenue: function () {
                        let vue = this;
                        let revenue = 0;
                        if (vue.orderData) {
                            for (let i = 0; i < vue.orderData.length; i++) {
                                if (vue.orderData[i].Dispatched == 'true') {
                                    revenue = revenue + JSON.parse(vue.orderData[i].PricePU);
                                }
                            }
                        }

                        return revenue;
                    },
                    checkPendingRevenue: function () {
                        let vue = this;
                        let revenue = 0;
                        if (vue.orderData) {
                            for (let i = 0; i < vue.orderData.length; i++) {
                                if (!vue.orderData[i].Dispatched) {
                                    if (vue.orderData[i].PricePU) {
                                        revenue = revenue + JSON.parse(vue.orderData[i].PricePU);
                                    }
                                }
                            }
                        }

                        return revenue;
                    },
                },
                mounted() {
                    this.initialise();
                },
            })
        })
    })
});