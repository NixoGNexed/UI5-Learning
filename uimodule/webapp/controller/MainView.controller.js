sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("com.myorg.ui5learning.controller.MainView", {

            onInit: function () {
                var oData = {
                    "data": [
                        {
                            "Name": "Create UI5-App"
                        },
                        {
                            "Name": "Work with O-Data"
                        },
                        {
                            "Name": "Try out Web-Components"
                        }
                    ]
                }


                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel, "data");
            },

            onPressNavigateToList: function () {

            }
        });
    });
