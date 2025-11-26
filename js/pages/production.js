ProductTracker.o.pages.Production = Vue.component('Production', function (resolve, reject) {
    fetch("./src/html/pages/production.html").then(function (data) {
        data.text().then(function (html) {
            resolve({
                name: "Production",
                template: html,
                mixins: [ProductTracker.o.pages.DataTransfer, ProductTracker.o.pages.GlobalFunctions],
                data() {
                    return {
                        subNavigationCategories: [{
                            name: 'Create Process',
                            id: 'createProcess'
                        }, {
                            name: 'View Processes',
                            id: 'viewProcesses'
                        }],
                        selectedSubNavCategory: null,
                        process: {
                            "ProcessName": null,
                            "ProcessID": null,
                            "Process": []
                        },
                        productionProcess: {
                            createStage: {
                                stageName: null,
                                stageDescription: null,
                            },
                            editStage: {
                                stageName: null,
                                stageID: null,
                                stageDescription: null,
                            },
                            createProcess: {
                                "ProcessName": null,
                                "ProcessID": null,
                            }
                        },
                        search: {
                            Input: null,
                            Results: null,
                        },
                        data: null,
                        selectedProcessIndex: null,
                        selectedProcess: {
                            "ProductionProcessName": null,
                            "Stages": [],
                            "SelectedStage": null,
                        },
                        selectedViewProcessIndex: null,
                        state: 'init',
                        viewState: 'init',
                        darkTheme: ProductTracker.o.appData.DarkTheme
                    }
                },
                computed: {
                    getSelectedProcess: function () {
                        let vue = this;
                        return vue.process.Process;
                    },
                    canAddNewProcess: function () {
                        let vue = this;
                        if (vue.productionProcess.createProcess.ProcessName) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                },
                methods: {
                    initialise: async function () {
                        this.$root.loading = true;
                        await this.getData();
                        this.$root.loading = false;
                    },
                    uuidv4: function () {
                        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
                        );
                    },
                    openPopup: function (_popup) {
                        $('#popup-' + _popup).modal({
                            show: true
                        });
                    },
                    addStage: function () {
                        let vue = this;
                        let obj = {
                            "name": vue.productionProcess.createStage.stageName,
                            "id": 'stageID_' + vue.uuidv4(),
                            "stage": vue.productionProcess.createStage.stageDescription
                        }
                        vue.process.Process.push(obj);
                        vue.updateProcess();
                        vue.productionProcess.createStage.stageName = null;
                        vue.productionProcess.createStage.stageDescription = null;
                        vue.changeState('ViewProcess');
                    },
                    addProcess: async function () {
                        let vue = this;
                        this.$root.loading = true;
                        let results = await ProductTracker.o.pages.DataTransfer.addProductionProcess(vue.productionProcess.createProcess.ProcessName);
                        vue.getData();
                        this.$root.loading = false;
                        ProductTracker.o.pages.GlobalFunctions.toggleToast('toast-process-added');
                        vue.openPopup('editProcessAlert');
                        vue.changeState('ViewProcesses');
                        vue.clear();
                    },
                    updateProcess: async function () {
                        let vue = this;
                        this.$root.loading = true;
                        await ProductTracker.o.pages.DataTransfer.updateProductionProcess(vue.process);
                        this.$root.loading = false;
                    },
                    deleteProductionProcess: async function () {
                        let vue = this;
                        this.$root.loading = true;
                        let result = await ProductTracker.o.pages.DataTransfer.deleteProductionProcess(vue.process.ProcessID);
                        this.$root.loading = false;
                        this.goBack();
                    },
                    changeState: function (_state, _data) {
                        let vue = this;
                        vue.state = _state;
                        if (_state == 'EditStage') {
                            vue.selectedProcess.SelectedStage = _data;
                        }
                    },
                    editStage: function () {
                        let vue = this;
                        for (let i = 0; i < vue.getSelectedProcess.length; i++) {
                            if (vue.getSelectedProcess[i].id == vue.selectedProcess.SelectedStage.id) {
                                vue.process.Process[i].name = vue.selectedProcess.SelectedStage.name;
                                vue.process.Process[i].stage = vue.selectedProcess.SelectedStage.stage;
                            }
                        }
                        vue.updateProcess();
                        vue.changeState('ViewProcess');
                    },
                    deleteStage: function () {
                        let vue = this;
                        for (let i = 0; i < vue.getSelectedProcess.length; i++) {
                            if (vue.getSelectedProcess[i].id == vue.selectedProcess.SelectedStage.id) {
                                vue.process.Process.splice(i, 1);
                            }
                        }
                        vue.updateProcess();
                        vue.changeState('ViewProcess');
                    },
                    selectProcess: function (_index, _Process) {
                        this.selectedProcessIndex = _index;
                        this.selectedProcess.ProductionProcessName = _Process.ProductionProcessName;
                        this.selectedProcess.Stages = JSON.parse(_Process.Stages);
                        this.process.Process = JSON.parse(_Process.Stages) ? JSON.parse(_Process.Stages) : [];
                        this.process.ProcessID = _Process.ProductionID;
                        this.process.ProcessName = _Process.ProductionProcessName;
                    },
                    searchProductionProcessData: function () {
                        let vue = this;
                        let filteredResults = [];
                        _.filter(vue.data, function (_process) {
                            if (_process.ProductionProcessName.toLowerCase().includes(vue.search.Input.toLowerCase())) {
                                filteredResults.push(_process);
                            };
                        });
                        return filteredResults;
                    },
                    getData: async function () {
                        let vue = this;
                        this.$root.loading = true;
                        let results = await ProductTracker.o.pages.DataTransfer.getProductionProcesses();
                        this.$root.loading = false;
                        vue.data = results;
                        vue.reload++;
                    },
                    goBack: function (_to) {
                        if (_to == null) {
                            _to = 'init';
                        }
                        this.state = _to;
                        this.clear();
                    },
                    clear: function () {
                        this.productionProcess.createProcess.ProcessName = null;
                        this.productionProcess.createProcess.ProcessID = null;
                        this.productionProcess.createStage.ProcessName = null;
                        this.productionProcess.createStage.ProcessID = null;
                        this.search.Input = null;
                        this.selectedProcess.ProductionProcessName = null;
                        this.selectedProcess.Stages = null;
                        this.selectedProcess.SelectedStage = null;
                        this.selectedProcessIndex = null;
                        this.state = 'init';
                        this.viewState = 'init';
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