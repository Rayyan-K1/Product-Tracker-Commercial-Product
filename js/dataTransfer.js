ProductTracker.o.pages.DataTransfer = {
    uuidv4: function () {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    },
    getProductsList: function () {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "http://" + ProductTracker.o.appData.IP + "/ProductTracker/src/php/getProducts.php",
                type: "POST",
                dataType: "json",
                data: {

                },
                success: function (data) {
                    resolve(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.responseText == 'Result Fetch failed') {
                        resolve(true);
                    } else {
                        reject(textStatus);
                    }
                }
            });
        });
    },
    getCategories: function () {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "http://" + ProductTracker.o.appData.IP + "/ProductTracker/src/php/getCategories.php",
                type: "POST",
                dataType: "json",
                data: {

                },
                success: function (data) {
                    resolve(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.responseText == 'Result Fetch failed') {
                        resolve(true);
                    } else {
                        reject(textStatus);
                    }
                }
            });
        });
    },
    getOrdersList: function () {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "http://" + ProductTracker.o.appData.IP + "/ProductTracker/src/php/getOrders.php",
                type: "POST",
                dataType: "json",
                data: {

                },
                success: function (data) {
                    resolve(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.responseText == 'Result Fetch failed') {
                        resolve(true);
                    } else {
                        reject(textStatus);
                    }
                }
            });
        });
    },
    getCustomers: function (_searchParameters, _searchCriteria) {
        let url = null;
        if (_searchParameters == 'Name') {
            url = "http://" + ProductTracker.o.appData.IP + "/ProductTracker/src/php/getCustomersByName.php"
        } else if (_searchParameters == 'Email') {
            url = "http://" + ProductTracker.o.appData.IP + "/ProductTracker/src/php/getCustomersByEmail.php"
        } else if (_searchParameters == 'CustomerID') {
            url = "http://" + ProductTracker.o.appData.IP + "/ProductTracker/src/php/getCustomersByCustomerID.php"
        }
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                data: _searchCriteria,
                success: function (data) {
                    resolve(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.responseText == 'Result Fetch failed') {
                        resolve(true);
                    } else {
                        reject(textStatus);
                    }
                }
            });
        });
    },
    getProductionProcesses: function () {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "http://" + ProductTracker.o.appData.IP + "/ProductTracker/src/php/getProductionProcesses.php",
                type: "POST",
                dataType: "json",
                data: {

                },
                success: function (data) {
                    resolve(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.responseText == 'Result Fetch failed') {
                        resolve(true);
                    } else {
                        reject(textStatus);
                    }
                }
            });
        });
    },
    getSpecificProductionProcess: function (_productionID) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "http://" + ProductTracker.o.appData.IP + "/ProductTracker/src/php/getSpecificProductionProcess.php",
                type: "POST",
                dataType: "json",
                data: {
                    ProductionID: _productionID
                },
                success: function (data) {
                    resolve(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.responseText == 'Result Fetch failed') {
                        resolve(true);
                    } else {
                        reject(textStatus);
                    }
                }
            });
        });
    },
    getSpecificCustomerOrders: function (_customerID) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "http://" + ProductTracker.o.appData.IP + "/ProductTracker/src/php/getSpecificCustomerOrders.php",
                type: "POST",
                dataType: "json",
                data: {
                    CustomerID: _customerID
                },
                success: function (data) {
                    resolve(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.responseText == 'Result Fetch failed') {
                        resolve(true);
                    } else {
                        reject(textStatus);
                    }
                }
            });
        });
    },
    getSpecificUser: function (_userID) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "http://" + ProductTracker.o.appData.IP + "/ProductTracker/src/php/getSpecificUser.php",
                type: "POST",
                dataType: "json",
                data: {
                    "UserID": _userID
                },
                success: function (data) {
                    resolve(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.responseText == 'Result Fetch failed') {
                        resolve(true);
                    } else {
                        reject(textStatus);
                    }
                }
            });
        });
    },
    getAllUsers: function () {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "http://" + ProductTracker.o.appData.IP + "/ProductTracker/src/php/getUsers.php",
                type: "POST",
                dataType: "json",
                data: null,
                success: function (data) {
                    resolve(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.responseText == 'Result Fetch failed') {
                        resolve(true);
                    } else {
                        reject(textStatus);
                    }
                }
            });
        });
    },
    getAllCustomers: function () {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "http://" + ProductTracker.o.appData.IP + "/ProductTracker/src/php/getCustomers.php",
                type: "POST",
                dataType: "json",
                data: null,
                success: function (data) {
                    resolve(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.responseText == 'Result Fetch failed') {
                        resolve(true);
                    } else {
                        reject(textStatus);
                    }
                }
            });
        });
    },
    addProduct: function (_obj) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "http://" + ProductTracker.o.appData.IP + "/ProductTracker/src/php/addProduct.php",
                type: "POST",
                dataType: "json",
                data: {
                    ID: _obj.id,
                    Name: _obj.name,
                    Description: _obj.description,
                    Progress: _obj.progress,
                    Price: _obj.price,
                    OrderNumber: _obj.orderNumber,
                    Category: _obj.category,
                    // Features: _obj.productFeatures
                },
                success: function (data) {
                    resolve(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.responseText = 'Product Added') {
                        resolve(true);
                    } else {
                        reject(textStatus);
                    }
                }
            });
        });
    },
    addOrder: function (_obj) {
        return new Promise((resolve, reject) => {
            // let id = "3";
            $.ajax({
                url: "http://" + ProductTracker.o.appData.IP + "/ProductTracker/src/php/addOrder.php",
                type: "POST",
                dataType: "json",
                data: {
                    ID: _obj.orderID,
                    Name: _obj.name,
                    Features: _obj.productFeatures,
                    Price: _obj.price,
                    Quantity: _obj.quantity,
                    OrderNumber: _obj.orderNumber,
                    Description: _obj.description,
                    Completed: _obj.completed,
                    CompletionDate: _obj.completionDate,
                    ProductionID: JSON.stringify(_obj.productionID),
                    Progress: _obj.progress,
                    CustomerID: _obj.customerID,
                    Timestamp: _obj.timestamp
                },
                success: function (data) {
                    resolve(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.responseText = 'Order Added') {
                        resolve(true);
                    } else {
                        reject(textStatus);
                    }
                }
            });
        });
    },
    addCustomer: function (_obj) {
        let vue = this;
        return new Promise((resolve, reject) => {
            // let id = "3";
            $.ajax({
                url: "http://" + ProductTracker.o.appData.IP + "/ProductTracker/src/php/addCustomer.php",
                type: "POST",
                dataType: "json",
                data: {
                    ID: 'customer_' + vue.uuidv4(),
                    Title: _obj.title,
                    FirstName: _obj.firstName,
                    Surname: _obj.surname,
                    Telephone: _obj.telephone,
                    EmailAddress: _obj.emailAddress,
                    Notes: _obj.notes,
                    Tags: JSON.stringify(_obj.tags),
                    Address: _obj.address,
                    Postcode: _obj.postcode,
                },
                success: function (data) {
                    resolve(true);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.responseText = 'Customer Added') {
                        resolve(true);
                    } else {
                        reject(textStatus);
                    }
                }
            });
        });
    },
    addUser: function (_obj) {
        let vue = this;
        return new Promise((resolve, reject) => {
            // let id = "3";
            $.ajax({
                url: "http://" + ProductTracker.o.appData.IP + "/ProductTracker/src/php/addUser.php",
                type: "POST",
                dataType: "json",
                data: {
                    UserID: 'user_' + vue.uuidv4(),
                    Username: _obj.username,
                    Email: _obj.email,
                    Password: _obj.password,
                    Privilege: null,
                    Preferences: null,
                    Admin: _obj.admin,
                    AuditLog: null,
                    CreatedBy: _obj.createdBy,
                },
                success: function (data) {
                    resolve(true);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.responseText = 'User Added') {
                        resolve(true);
                    } else {
                        reject(textStatus);
                    }
                }
            });
        });
    },
    addCategory: function (_obj) {
        let vue = this;
        return new Promise((resolve, reject) => {
            // let id = "3";
            $.ajax({
                url: "http://" + ProductTracker.o.appData.IP + "/ProductTracker/src/php/addCategory.php",
                type: "POST",
                dataType: "json",
                data: {
                    CategoryID: 'category_' + vue.uuidv4(),
                    CategoryName: _obj.categoryName,
                    CreatedBy: _obj.createdBy,
                },
                success: function (data) {
                    resolve(true);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.responseText = 'Category Added') {
                        resolve(true);
                    } else {
                        reject(textStatus);
                    }
                }
            });
        });
    },
    addProductionProcess: function (_processName) {
        let vue = this;
        return new Promise((resolve, reject) => {
            // let id = "3";
            $.ajax({
                url: "http://" + ProductTracker.o.appData.IP + "/ProductTracker/src/php/addProductionProcess.php",
                type: "POST",
                dataType: "json",
                data: {
                    ProductionID: 'production_' + vue.uuidv4(),
                    ProductionProcessName: _processName,
                },
                success: function (data) {
                    resolve(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.responseText = 'Production Process Added') {
                        resolve(true);
                    } else {
                        reject(textStatus);
                    }
                }
            });
        });
    },
    updateProductionProcess: function (_obj) {
        return new Promise((resolve, reject) => {
            // let id = "3";
            $.ajax({
                url: "http://" + ProductTracker.o.appData.IP + "/ProductTracker/src/php/updateProductionProcess.php",
                type: "POST",
                dataType: "json",
                data: {
                    ProductionID: _obj.ProcessID,
                    ProductionProcessName: _obj.ProcessName,
                    Stages: JSON.stringify(_obj.Process),
                },
                success: function (data) {
                    resolve(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.responseText = 'Production Process Successfully Edited') {
                        resolve(true);
                    } else {
                        reject(textStatus);
                    }
                }
            });
        });
    },
    updateProduct: function (_obj) {
        return new Promise((resolve, reject) => {
            // let id = "3";
            $.ajax({
                url: "http://" + ProductTracker.o.appData.IP + "/ProductTracker/src/php/updateProduct.php",
                type: "POST",
                dataType: "json",
                data: {
                    ProductID: _obj.ProductID,
                    ProductName: _obj.ProductName,
                    ProductDescription: _obj.ProductDescription,
                    Price: _obj.Price,
                    Category: _obj.Category,
                    // ProductFeatures: _obj.ProductFeatures,
                },
                success: function (data) {
                    resolve(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.responseText = 'Product Successfully Edited') {
                        resolve(true);
                    } else {
                        reject(textStatus);
                    }
                }
            });
        });
    },
    updateUserCredentials: function (_obj) {
        return new Promise((resolve, reject) => {
            // let id = "3";
            $.ajax({
                url: "http://" + ProductTracker.o.appData.IP + "/ProductTracker/src/php/updateUserCredentials.php",
                type: "POST",
                dataType: "json",
                data: {
                    UserID: _obj.UserID,
                    Username: _obj.Username != null ? _obj.Username.length > 0 ? _obj.Username : null : null,
                    Email: _obj.Email != null ? _obj.Email.length > 0 ? _obj.Email : null : null,
                    Password: _obj.Password != null ? _obj.Password.length > 0 ? _obj.Password : null : null,
                    Privilege: _obj.Privilege != null ? _obj.Privilege.length > 0 ? _obj.Privilege : null : null,
                    Admin: _obj.Admin != null ? _obj.Admin.length > 0 ? _obj.Admin : null : null,
                    Preferences: _obj.Preferences != null ? _obj.Preferences.length > 0 ? _obj.Preferences : null : null,
                    AuditLog: _obj.AuditLog != null ? _obj.AuditLog.length > 0 ? _obj.AuditLog : null : null
                },
                success: function (data) {
                    resolve(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.responseText = 'User Successfully Edited') {
                        resolve(true);
                    } else {
                        reject(textStatus);
                    }
                }
            });
        });
    },
    updateOrderStatus: function (_obj) {
        return new Promise((resolve, reject) => {
            // let id = "3";
            $.ajax({
                url: "http://" + ProductTracker.o.appData.IP + "/ProductTracker/src/php/updateOrderStatus.php",
                type: "POST",
                dataType: "json",
                data: {
                    OrderID: _obj.OrderID,
                    Progress: _obj.Progress,
                },
                success: function (data) {
                    resolve(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.responseText = 'Order Status Successfully Edited') {
                        resolve(true);
                    } else {
                        reject(textStatus);
                    }
                }
            });
        });
    },
    updateOrderState: function (_ID) {
        return new Promise((resolve, reject) => {
            // let id = "3";
            $.ajax({
                url: "http://" + ProductTracker.o.appData.IP + "/ProductTracker/src/php/updateOrderState.php",
                type: "POST",
                dataType: "json",
                data: {
                    OrderID: _ID
                },
                success: function (data) {
                    resolve(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.responseText = 'Order State Successfully Edited') {
                        resolve(true);
                    } else {
                        reject(textStatus);
                    }
                }
            });
        });
    },
    deleteProduct: function (_ID) {
        return new Promise((resolve, reject) => {
            // let id = "3";
            $.ajax({
                url: "http://" + ProductTracker.o.appData.IP + "/ProductTracker/src/php/deleteProduct.php",
                type: "POST",
                dataType: "json",
                data: {
                    ProductID: _ID,
                },
                success: function (data) {
                    resolve(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.responseText = 'Product Successfully Deleted') {
                        resolve(true);
                    } else {
                        reject(textStatus);
                    }
                }
            });
        });
    },
    deleteProductionProcess: function (_ID) {
        return new Promise((resolve, reject) => {
            // let id = "3";
            $.ajax({
                url: "http://" + ProductTracker.o.appData.IP + "/ProductTracker/src/php/deleteProductionProcess.php",
                type: "POST",
                dataType: "json",
                data: {
                    ProductionProcessID: _ID,
                },
                success: function (data) {
                    resolve(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.responseText = 'Production Process Successfully Deleted') {
                        resolve(true);
                    } else {
                        reject(textStatus);
                    }
                }
            });
        });
    },
    deleteUser: function (_ID) {
        return new Promise((resolve, reject) => {
            // let id = "3";
            $.ajax({
                url: "http://" + ProductTracker.o.appData.IP + "/ProductTracker/src/php/deleteUser.php",
                type: "POST",
                dataType: "json",
                data: {
                    UserID: _ID,
                },
                success: function (data) {
                    resolve(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.responseText = 'User Successfully Deleted') {
                        resolve(true);
                    } else {
                        reject(textStatus);
                    }
                }
            });
        });
    },
    deleteCustomer: function (_ID) {
        return new Promise((resolve, reject) => {
            // let id = "3";
            $.ajax({
                url: "http://" + ProductTracker.o.appData.IP + "/ProductTracker/src/php/deleteCustomer.php",
                type: "POST",
                dataType: "json",
                data: {
                    CustomerID: _ID,
                },
                success: function (data) {
                    resolve(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.responseText = 'Customer Successfully Deleted') {
                        resolve(true);
                    } else {
                        reject(textStatus);
                    }
                }
            });
        });
    },
    checkLogin: function (_email, _password) {
        return new Promise((resolve, reject) => {
            // let id = "3";
            $.ajax({
                url: "http://" + ProductTracker.o.appData.IP + "/ProductTracker/src/php/checkLogin.php",
                type: "POST",
                dataType: "json",
                data: {
                    Email: _email.toLowerCase(),
                    Password: _password,
                },
                success: function (data) {
                    resolve(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    reject(textStatus);
                }
            });
        });
    },
}