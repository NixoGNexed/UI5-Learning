sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "com/myorg/ui5learning/model/models",
        'sap/ui/model/json/JSONModel',
        "sap/ui/util/Storage"
    ],
    function (UIComponent, Device, models, JSONModel, Storage) {
        "use strict";

        return UIComponent.extend("com.myorg.ui5learning.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                var oModel = new JSONModel();
                this.setModel(oModel, 'characters');

                var storage = new Storage(Storage.Type.session, "characterStorage")
                var localStorageContent = storage.get("characterStorage");

                if(localStorageContent) {
                    this.getModel('characters').setData(localStorageContent);
                    return;
                } 

                oModel.loadData('http://hp-api.herokuapp.com/api/characters');
                oModel.attachRequestCompleted(function() {
                    var requestedContent = oModel.getData();

                    // only show entries with an image
                    requestedContent = requestedContent.filter(x => x.image);

                    storage.put("characterStorage", requestedContent)
                    this.getView().getModel('characters').setData(requestedContent);
                }.bind(this))
            }
        });
    }
);