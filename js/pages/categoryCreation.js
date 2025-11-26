ProductTracker.o.pages.CategoryCreation = Vue.component('CategoryCreation', function (resolve, reject) {
    fetch("./src/html/pages/categoryCreation.html").then(function (data) {
        data.text().then(function (html) {
            resolve({
                name: "CategoryCreation",
                template: html,
                mixins: [ProductTracker.o.pages.DataTransfer, ProductTracker.o.pages.GlobalFunctions],
                data() {
                    return {
                        subNavigationCategories: [{
                            name: 'Add Category',
                            id: 'addCategory'
                        }],
                        selectedSubNavCategory: null,
                        addNewCategory: {
                            categoryName: null,
                        }
                    }
                },
                computed: {
                    canAddCategory: function () {
                        if (this.addNewCategory.categoryName) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                },
                methods: {
                    initialise: function () {
                        this.selectedSubNavCategory = this.subNavigationCategories[0];
                    },
                    addCategory: async function () {
                        let vue = this;
                        let obj = {
                            categoryName: vue.addNewCategory.categoryName,
                            createdBy: vue.$root.userCredentials.userID,
                        }
                        let result = await ProductTracker.o.pages.DataTransfer.addCategory(obj);
                        ProductTracker.o.pages.GlobalFunctions.toggleToast('toast-category-added');
                        vue.clear();
                    },
                    clear: function () {
                        let vue = this;
                        vue.addNewCategory.categoryName = null;
                    }
                },
                mounted() {
                    this.initialise();
                },
            })
        })
    })
});