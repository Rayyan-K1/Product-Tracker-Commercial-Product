ProductTracker.o.pages.Dashboard = Vue.component('Dashboard', function (resolve, reject) {
    fetch("./src/html/pages/dashboard.html").then(function (data) {
        data.text().then(function (html) {
            resolve({
                name: "Dashboard",
                template: html,
                mixins: [ProductTracker.o.pages.DataTransfer, ProductTracker.o.pages.GlobalFunctions],
                data() {
                    return {
                        subNavigationCategories: [{
                            name: 'Add Category',
                            id: 'addCategory'
                        }, {
                            name: 'View Categories',
                            id: 'viewCategories'
                        }],
                        selectedSubNavCategory: null,
                    }
                },
                computed: {

                },
                methods: {

                },
                mounted() {

                },
            })
        })
    })
});