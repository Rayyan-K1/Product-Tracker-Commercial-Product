ProductTracker.o.pages.LandingPage = Vue.component('LandingPage', function (resolve, reject) {
    fetch("./src/html/pages/landingPage.html").then(function (data) {
        data.text().then(function (html) {
            resolve({
                name: "LandingPage",
                template: html,
                mixins: [ProductTracker.o.pages.DataTransfer, ProductTracker.o.pages.GlobalFunctions],
                data() {
                    return {
                        errorMessage: null,
                        userCredentials: {
                            email: null,
                            password: null,
                        }
                    }
                },
                computed: {

                },
                methods: {
                    login: function (_email, _password) {
                        let vue = this;
                    }
                },
                mounted() {

                },
            })
        })
    })
});