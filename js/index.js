const router = new VueRouter({
    // Route Declaration
    routes: [{
        path: '/',
        name: 'LandingPage',
        component: ProductTracker.o.pages.LandingPage,
    }, {
        path: '/Dashboard',
        name: 'Dashboard',
        component: ProductTracker.o.pages.Dashboard,
    }, {
        path: '/Analytics',
        name: 'Analytics',
        component: ProductTracker.o.pages.Analytics,
    }, {
        path: '/Customers',
        name: 'Customers',
        component: ProductTracker.o.pages.Customers,
    }, {
        path: '/Products',
        name: 'Products',
        component: ProductTracker.o.pages.Products,
    }, {
        path: '/PlaceOrder',
        name: 'Place Order',
        component: ProductTracker.o.pages.PlaceOrder,
    }, {
        path: '/OrderLog',
        name: 'Order Log',
        component: ProductTracker.o.pages.OrderLog,
    }, {
        path: '/Production',
        name: 'Production',
        component: ProductTracker.o.pages.Production,
    }, {
        path: '/UpdateOrderStatus',
        name: 'Update Order Status',
        component: ProductTracker.o.pages.UpdateOrderStatus,
    }, {
        path: '/ManageUsers',
        name: 'Manage Users',
        component: ProductTracker.o.pages.ManageUsers,
    }, {
        path: '/AuditLog',
        name: 'Audit Log',
        component: ProductTracker.o.pages.AuditLog,
    }, {
        path: '/CategoryCreation',
        name: 'Category Creation',
        component: ProductTracker.o.pages.CategoryCreation,
    }, {
        path: '/DepartmentCreation',
        name: 'Department Creation',
        component: ProductTracker.o.pages.DepartmentCreation,
    }, {
        path: '/Settings',
        name: 'Settings',
        component: ProductTracker.o.pages.Settings,
    }]
})
// Vue Instance
ProductTracker.o.pages.Index = new Vue({
    el: '#app',
    data: {
        isUserLoggedIn: true,
        errorMessage: null,
        userCredentials: {
            userID: null,
            username: null,
            email: null,
            password: null,
            admin: 1,
        },
        businesses: [{
            "BusinessName": "",
            "Config": {

            }
        }, {
            "BusinessName": "Demo",
            "Config": {

            }
        }],
        businessSelected: true,
        search: {
            input: null,
        },
        // loading: false,
        darkTheme: ProductTracker.o.appData.DarkTheme
    },
    computed: {

    },
    methods: {
        initialise: function () {
            let vue = this;
        },
        openPopup: function (_popup) {
            $('#popup-' + _popup).modal({
                show: true
            });
        },
        selectBusiness: function (_business) {
            let vue = this;
            vue.businessSelected = _business;
        },
        login: async function (_email, _password) {
            let vue = this;
            vue.loading = true;
            let results = await ProductTracker.o.pages.DataTransfer.checkLogin(_email, _password);
            if (results.length > 0) {
                vue.userCredentials.userID = results[0].userID;
                vue.userCredentials.username = results[0].username;
                vue.userCredentials.email = results[0].email;
                vue.userCredentials.admin = JSON.parse(results[0].admin);
                vue.isUserLoggedIn = true;
                vue.$router.push('/Products');
            } else {
                vue.errorMessage = "Incorrect Credentials";
            }
            vue.loading = false;
        },
        checkTheme: function () {
            this.darkTheme = ProductTracker.o.appData.DarkTheme;
        },
        logout: function () {
            this.isUserLoggedIn = false;
            this.errorMessage = null;
            this.userCredentials.email = null;
            this.userCredentials.password = null;
        },
        searchByBusinessName: function () {
            let vue = this;
            let array = [];
            for (let i = 0; i < vue.businesses.length; i++) {
                if (vue.businesses[i].BusinessName.toLowerCase().includes(vue.search.input.toLowerCase())) {
                    array.push(vue.businesses[i]);
                }
            }
            return array;
        }
    },
    router,
    mounted() {
        this.initialise();
    },
    watch: {
        'search.input': function () {
            let vue = this;
            vue.searchByBusinessName();
        }
    }
});