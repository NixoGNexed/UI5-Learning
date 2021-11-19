sap.ui.define([
    "com/myorg/ui5learning/controller/BaseController",
    'sap/ui/model/json/JSONModel',
    "sap/ui/core/routing/History",
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
            },

            onNavBack() {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.back();
                } else {
                    this.navTo("RouteMainView", {}, true);
                }
            },

            onPressOpenDetails(characterName) {
                this.navTo("RouteDetailView", {
                    character : characterName
                });
            }

        });
    });
