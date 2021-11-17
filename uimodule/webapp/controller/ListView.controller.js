sap.ui.define([
    "com/myorg/ui5learning/controller/BaseController",
    'sap/ui/model/json/JSONModel',
    "sap/ui/core/routing/History",
    "sap/ui/util/Storage"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} BaseController
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.core.routing.History} History
     */
    function (Controller, JSONModel, History, Storage) {
        "use strict";

        return Controller.extend("com.myorg.ui5learning.controller.ListView", {

            onInit() {
                var oModel = new JSONModel();
                this.getView().setModel(oModel, 'characters');

                var storage = new Storage(Storage.Type.session, "listViewStorage")
                var localStorageContent = storage.get("listViewData");

                if(localStorageContent) {
                    this.getView().getModel('characters').setData(localStorageContent);
                    return;
                } 

                oModel.loadData('https://api.sampleapis.com/avatar/characters');
                oModel.attachRequestCompleted(function() {
                    var requestedContent = oModel.getData();
                    requestedContent = requestedContent.filter(x => x.hasOwnProperty('name'));

                    // remove all character after .png form image url
                    requestedContent.forEach(element => {
                        element.image = element.image.substring(0, element.image.indexOf('.png') + 4);
                    });
                    storage.put("listViewData", requestedContent)
                    this.getView().getModel('characters').setData(requestedContent);
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
            },

            onPressOpenDetails(characterDetails) {
                var oModel = new JSONModel(characterDetails);
                // sap.ui.getCore().setModel(oModel, "details");
                this.getOwnerComponent().setModel(oModel, "details"); 
                // sap.ui.getCore().setModel(oModel, "details");
                // characterDetails = JSON.stringify(characterDetails);

                this.navTo("RouteDetailView", {
                    character : characterDetails.name
                });
            }

        });
    });
