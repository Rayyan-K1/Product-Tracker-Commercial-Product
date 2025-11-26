ProductTracker.o.pages.Settings = Vue.component('Settings', function (resolve, reject) {
    fetch("./src/html/pages/settings.html").then(function (data) {
        data.text().then(function (html) {
            resolve({
                name: "Settings",
                template: html,
                mixins: [ProductTracker.o.pages.DataTransfer, ProductTracker.o.pages.GlobalFunctions],
                data() {
                    return {
                        darkTheme: ProductTracker.o.appData.DarkTheme,
                        state: 'init'
                    }
                },
                computed: {

                },
                methods: {
                    setTheme: function (_theme) {
                        if (_theme == 'Dark') {
                            ProductTracker.o.appData.DarkTheme = true;
                        } else {
                            ProductTracker.o.appData.DarkTheme = false;
                        }
                    },
                    openPopup: function (_popup) {
                        $('#popup-' + _popup).modal({
                            show: true
                        });
                    },
                    changePage: function (_state) {
                        let vue = this;
                        vue.state = _state;
                    },
                    resetData: function () {
                        let vue = this;
                        vue.$root.logout();
                        vue.$root.businessSelected = null;
                        vue.$root.search.input = null;
                    }
                },
                mounted() {

                },
            })
        })
    })
});