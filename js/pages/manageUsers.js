ProductTracker.o.pages.ManageUsers = Vue.component('ManageUsers', function (resolve, reject) {
    fetch("./src/html/pages/manageUsers.html").then(function (data) {
        data.text().then(function (html) {
            resolve({
                name: "ManageUsers",
                template: html,
                mixins: [ProductTracker.o.pages.DataTransfer, ProductTracker.o.pages.GlobalFunctions],
                data() {
                    return {
                        subNavigationCategories: [{
                            name: 'View Users',
                            id: 'viewUsers'
                        }, {
                            name: 'Add User',
                            id: 'addUser'
                        }],
                        selectedSubNavCategory: null,
                        usersList: null,
                        search: {
                            Input: null,
                        },
                        selectedUserIndex: null,
                        selectedUser: null,
                        state: 'viewUsers',
                        password: {
                            newPassword: null,
                            isNewPassword: false,
                        },
                        addNewUser: {
                            username: null,
                            email: null,
                            password: null,
                            role: null,
                        },
                        auditLog: [],
                        darkTheme: ProductTracker.o.appData.DarkTheme
                    }
                },
                computed: {
                    canAddUser: function () {
                        let vue = this;
                        if (vue.addNewUser.username && vue.addNewUser.email && vue.addNewUser.password && vue.addNewUser.role) {
                            return true;
                        } else {
                            return false;
                        }
                    }

                },
                methods: {
                    initialise: async function () {
                        this.$root.loading = true;
                        await this.getUsersList();
                        this.$root.loading = false;
                    },
                    openPopup: function (_popup) {
                        $('#popup-' + _popup).modal({
                            show: true
                        });
                    },
                    addToAuditLog: function () {
                        let vue = this;
                        let dateNow = new Date().toISOString();
                        let obj = {
                            "timestamp": dateNow,
                            "userID": vue.$root.userCredentials.userID,
                            "audit": {
                                "user": vue.selectedUser,
                                "pw": vue.password.newPassword ? vue.password.newPassword : null,
                            },
                        }
                        vue.auditLog.push(obj);
                    },
                    addUser: async function () {
                        this.$root.loading = true;
                        let vue = this;
                        let obj = {
                            username: vue.addNewUser.username,
                            email: vue.addNewUser.email,
                            password: vue.addNewUser.password,
                            admin: vue.addNewUser.role,
                            createdBy: vue.$root.userCredentials.userID,
                        }
                        let result = await ProductTracker.o.pages.DataTransfer.addUser(obj);
                        ProductTracker.o.pages.GlobalFunctions.toggleToast('toast-user-added');
                        vue.clear();
                        this.$root.loading = false;
                    },
                    changePassword: function () {
                        let vue = this;
                        vue.password.isNewPassword = true;
                    },
                    savePassword: function () {
                        let vue = this;
                        vue.password.isNewPassword = false;
                        vue.addToAuditLog();
                    },
                    getUsersList: async function () {
                        let users = await ProductTracker.o.pages.DataTransfer.getAllUsers();
                        this.usersList = users;
                    },
                    selectUser: function (_index, _user) {
                        this.selectedUserIndex = _index;
                        this.selectedUser = _user;
                        this.password.newPassword = null;
                        this.password.isNewPassword = false;
                    },
                    updateUserDetails: async function () {
                        let vue = this;
                        let obj = {
                            "UserID": vue.selectedUser.userID,
                            "Username": vue.selectedUser.username,
                            "Email": vue.selectedUser.email,
                            "Password": vue.password.newPassword ? vue.password.newPassword : null,
                            "Privilege": vue.selectedUser.privilege,
                            "Admin": vue.selectedUser.admin,
                            "Preferences": vue.selectedUser.preferences,
                            "AuditLog": null,
                        }
                        let result = await ProductTracker.o.pages.DataTransfer.updateUserCredentials(obj);
                        vue.goBack();
                    },
                    deleteUser: async function () {
                        let result = await ProductTracker.o.pages.DataTransfer.deleteUser(this.selectedUser.userID);
                        this.goBack();
                    },
                    searchUsersList: function () {
                        let vue = this;
                        let filteredResults = [];
                        _.filter(vue.usersList, function (_user) {
                            if (_user.email.toLowerCase().includes(vue.search.Input.toLowerCase())) {
                                filteredResults.push(_user);
                            };
                        });
                        return filteredResults;
                    },
                    editUser: async function () {
                        this.$root.loading = true;
                        this.state = 'editUser';
                        let user = await ProductTracker.o.pages.DataTransfer.getSpecificUser(this.selectedUser.userID);
                        this.selectedUser = user[0];
                        this.initialise();
                        this.$root.loading = false;
                    },
                    goBack: function () {
                        this.state = 'viewUsers';
                    },
                    clear: function () {
                        let vue = this;
                        vue.addNewUser.username = null;
                        vue.addNewUser.email = null;
                        vue.addNewUser.password = null;
                        vue.addNewUser.role = null;
                    }
                },
                mounted() {
                    this.selectedSubNavCategory = this.subNavigationCategories[0];
                    this.initialise();
                },
            })
        })
    })
});