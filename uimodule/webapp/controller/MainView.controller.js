sap.ui.define([
    "com/myorg/ui5learning/controller/BaseController",
    'sap/ui/model/json/JSONModel'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} BaseController
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("com.myorg.ui5learning.controller.MainView", {

            onInit: function () {
                var oModel = new JSONModel("/models/topics.json");
                this.getView().setModel(oModel, "topics");
            },

            onPressChangeTheme: function () {
                if(sap.ui.getCore().getConfiguration().getTheme() === "sap_fiori_3_dark") {
                    sap.ui.getCore().applyTheme("sap_fiori_3");
                } else {
                    sap.ui.getCore().applyTheme("sap_fiori_3_dark");
                }
            },

            onPressNavigateToList: function () {
                this.navTo("RouteListView");
            },

        });
    });
