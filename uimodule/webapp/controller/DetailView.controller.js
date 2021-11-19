sap.ui.define([
    "com/myorg/ui5learning/controller/BaseController",
    "sap/ui/core/routing/History",
    'sap/ui/model/json/JSONModel',
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} BaseController
     * @param {typeof sap.ui.core.routing.History} History
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     */
    function (Controller, History, JSONModel) {
        "use strict";

        return Controller.extend("com.myorg.ui5learning.controller.ListView", {

            onInit() {
                this.getRouter().attachRouteMatched(this.onRouteMatched, this);
            },

            onRouteMatched() {
                var details = this.getOwnerComponent().getModel("characters").getData();

                if(!details) {
                    alert("Character not found");
                    return;
                }

                // get character name from url
                var url = window.location.href;
                var parameter = decodeURI(url.split("characters/")[1]);

                var details = details.find(obj => {
                    return obj.name === parameter
                })

                var oModel = new JSONModel(details);
                this.getView().setModel(oModel, "details")
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
