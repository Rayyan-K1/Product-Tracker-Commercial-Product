ProductTracker.o.pages.Products = Vue.component('Products', function (resolve, reject) {
    fetch("./src/html/pages/products.html").then(function (data) {
        data.text().then(function (html) {
            resolve({
                name: "Products",
                template: html,
                mixins: [ProductTracker.o.pages.DataTransfer, ProductTracker.o.pages.GlobalFunctions],
                data() {
                    return {
                        subNavigationCategories: [{
                            name: 'Add Product',
                            id: 'addProduct'
                        }, {
                            name: 'Catalogue',
                            id: 'catalogue'
                        }],
                        selectedSubNavCategory: null,
                        selectedProductFeature: null,
                        search: {
                            Input: null,
                            Results: null,
                        },
                        addNewProduct: {
                            ProductName: null,
                            Category: null,
                            ProductFeatures: null,
                            ProductDescription: null,
                            ProductPrice: null,
                        },
                        data: null,
                        categories: null,
                        reload: 0,
                        selectedProduct: null,
                        isEdit: false,
                        darkTheme: ProductTracker.o.appData.DarkTheme
                    }
                },
                computed: {
                    canAddNewProduct: function () {
                        let vue = this;
                        if (vue.addNewProduct.ProductName && vue.addNewProduct.Category) {
                            return false;
                        } else {
                            return true;
                        }
                    },
                },
                methods: {
                    initialise: async function () {
                        this.selectedSubNavCategory = this.subNavigationCategories[0];
                        this.$root.loading = true;
                        await this.getData();
                        this.$root.loading = false;
                    },
                    checkValueAgainstRange: function (_type) {
                        let vue = this;
                        switch (_type) {
                            case "price":
                                let regex = /^\d{0,8}(\.\d{1,4})?$/g;
                                if (!regex.test(vue.addNewProduct.ProductPrice)) {
                                    vue.addNewProduct.ProductPrice = null;
                                }
                                break;
                        }
                    },
                    getSelectedProduct: function () {
                        let vue = this;
                        return vue.selectedProduct ? vue.selectedProduct.Name : null;
                    },
                    searchProductsData: function () {
                        let vue = this;
                        let filteredResults = [];
                        _.filter(vue.data, function (_product) {
                            if (_product.Name.toLowerCase().includes(vue.search.Input.toLowerCase())) {
                                filteredResults.push(_product);
                            };
                        });
                        return filteredResults;
                    },
                    openPopup: function (_popup) {
                        $('#popup-' + _popup).modal({
                            show: true
                        });
                    },
                    closePopup: function (_popup) {
                        $('#popup-' + _popup).modal({
                            show: false
                        });
                    },
                    getData: async function () {
                        let vue = this;
                        try {
                            let results = await ProductTracker.o.pages.DataTransfer.getProductsList();
                            vue.data = results;
                        } catch (err) {}
                        this.$root.loading = true;
                        let categoryResults = await ProductTracker.o.pages.DataTransfer.getCategories();
                        this.$root.loading = false;
                        vue.categories = categoryResults;
                        vue.reload++;
                    },
                    uuidv4: function () {
                        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
                        );
                    },
                    addNewProductToList: async function () {
                        let vue = this;
                        let obj = {
                            "id": 'product_' + vue.uuidv4(),
                            "name": vue.addNewProduct.ProductName,
                            "description": vue.addNewProduct.ProductDescription,
                            "progress": 0,
                            "price": vue.addNewProduct.ProductPrice,
                            "orderNumber": "023-432987-8923",
                            "category": vue.addNewProduct.Category,
                            // "productFeatures": vue.addNewProduct.ProductFeatures
                        }
                        this.$root.loading = true;
                        await ProductTracker.o.pages.DataTransfer.addProduct(obj);
                        vue.clean();
                        ProductTracker.o.pages.GlobalFunctions.toggleToast('toast-product-added');
                        await vue.getData();
                        this.$root.loading = false;
                    },
                    saveUpdatedProduct: async function () {
                        let vue = this;
                        let productName = document.getElementById('productName').value;
                        let productPrice = document.getElementById('productPrice').value;
                        let productDescription = document.getElementById('productDescription').value;
                        let productCategory = document.getElementById('productCategory').value;
                        // let productFeatures = document.getElementById('productFeatures').value;
                        let obj = {
                            ProductID: vue.selectedProduct.ID,
                            ProductName: productName.length > 0 ? productName : vue.selectedProduct.Name,
                            ProductDescription: productDescription.length > 0 ? productDescription : vue.selectedProduct.Description,
                            Price: productPrice.length > 0 ? productPrice : vue.selectedProduct.Price,
                            Category: productCategory.length > 0 ? productCategory : vue.selectedProduct.Category,
                            // ProductFeatures: productFeatures.length > 0 ? productFeatures : vue.selectedProduct.ProductFeatures,

                        }
                        vue.closePopup('viewProduct');
                        this.$root.loading = true;
                        await ProductTracker.o.pages.DataTransfer.updateProduct(obj);
                        await vue.getData();
                        this.$root.loading = false;
                    },
                    deleteProduct: async function (_product) {
                        let vue = this;
                        this.$root.loading = true;
                        await ProductTracker.o.pages.DataTransfer.deleteProduct(_product.ID);
                        this.$root.loading = false;
                        for (let i = 0; i < vue.data.length; i++) {
                            if (vue.data[i].ID == _product.ID) {
                                vue.data.splice(i, 1);
                            }
                        }
                    },
                    clean: function () {
                        let vue = this;
                        vue.addNewProduct.ProductName = null;
                        vue.addNewProduct.Category = null;
                        vue.addNewProduct.ProductFeatures = null;
                        vue.addNewProduct.ProductDescription = null;
                        vue.addNewProduct.ProductPrice = null;
                    },
                },
                watch: {
                    'selectedProductFeature': function (_val) {
                        if (_val == 'Other') {
                            $('#popup-addCategory').modal({
                                show: true
                            });
                        }
                    }
                },
                mounted() {
                    this.initialise();
                },
            })
        })
    })
});