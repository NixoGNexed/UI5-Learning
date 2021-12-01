sap.ui.define([
        "sap/ui/core/UIComponent",
        "com/myorg/ui5learning/model/models",
        'sap/ui/model/json/JSONModel',
        "sap/ui/util/Storage"
    ],
    function (UIComponent, deviceModel, JSONModel, localStorage) {
        "use strict";

        return UIComponent.extend("com.myorg.ui5learning.Component", {
            metadata: {
                manifest: "json"
            },

            localCharactersStorage: new localStorage(localStorage.Type.session, "characterStorage"),

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
                this.setModel(deviceModel.createDeviceModel(), "device");

                let oModel = new JSONModel();
                this.setModel(oModel, 'characters');

                let characters = this.localCharactersStorage.get("characterStorage");

                if(characters) {
                    this.getModel('characters').setData(characters);
                    return;
                } 

                oModel.loadData('http://hp-api.herokuapp.com/api/characters');
                oModel.attachRequestCompleted(function(oEvent) {
                    if(oEvent.getParameters().success) {
                        characters = oModel.getData();

                        // only show entries with an image
                        characters = characters.filter(character => character.image);
    
                        this.localCharactersStorage.put("characterStorage", characters)
                        this.getModel('characters').setData(characters);
                    }
                }.bind(this))
            }
        });
    }
);