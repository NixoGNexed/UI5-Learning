sap.ui.define([
    "com/myorg/ui5learning/controller/BaseController",
    'sap/ui/model/json/JSONModel',
    "sap/ui/core/routing/History"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} BaseController
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.core.routing.History} History
     */
    function (Controller, JSONModel, History) {
        "use strict";

        return Controller.extend("com.myorg.ui5learning.controller.ListView", {

            onInit() {
                var oModel = new JSONModel();
                this.getView().setModel(oModel, 'characters');

                oModel.loadData('https://api.sampleapis.com/avatar/characters');
                oModel.attachRequestCompleted(function() {
                    var data = oModel.getData();
                    data = data.filter(x => x.hasOwnProperty('name'));

                    // remove all character after .png form image url
                    data.forEach(element => {
                        element.image = element.image.substring(0, element.image.indexOf('.png') + 4);
                    });

                    this.getView().getModel('characters').setData(data);
                }.bind(this))
            },

            onNavBack() {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.back();
                } else {
                    this.navTo("RouteMainView", {}, true);
                }
            }

        });
    });
