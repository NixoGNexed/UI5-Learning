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

        return Controller.extend("com.myorg.ui5learning.controller.DetailView", {

            onInit() {
                this.getRouter().getRoute("RouteDetailView").attachMatched(this.onRouteMatched, this);
            },

            onRouteMatched() {
                const characters = this.getOwnerComponent().getModel("characters").getData();

                if(!characters) {                    
                    this.navTo("RouteNotFoundView", {}, true);
                }

                // get character name from hash
                var parameter = this.getRouter().getHashChanger().getHash().split("/")[1];

                const character = characters.find(character => {
                    return character.name === parameter
                })

                if(!character) {
                    this.navTo("RouteNotFoundView", {}, true); 
                }

                var oModel = new JSONModel(character);
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
