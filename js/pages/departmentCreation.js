ProductTracker.o.pages.DepartmentCreation = Vue.component('DepartmentCreation', function (resolve, reject) {
    fetch("./src/html/pages/departmentCreation.html").then(function (data) {
        data.text().then(function (html) {
            resolve({
                name: "DepartmentCreation",
                template: html,
                mixins: [ProductTracker.o.pages.DataTransfer, ProductTracker.o.pages.GlobalFunctions],
                data() {
                    return {
                        subNavigationCategories: [{
                            name: 'Add Department',
                            id: 'addDepartment'
                        }],
                        selectedSubNavCategory: null,
                    }
                },
                computed: {

                },
                methods: {
                    initialise: function () {
                        this.selectedSubNavCategory = this.subNavigationCategories[0];
                    },
                },
                mounted() {
                    this.initialise();
                },
            })
        })
    })
});