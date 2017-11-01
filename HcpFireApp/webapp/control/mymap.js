/* global Highcharts, Chart */
sap.ui.define([
    "sap/ui/core/Control",
    "com/hcpfireapp/libs/gmaps"
], function(Control) {
    "use strict";

    return Control.extend("com.hcpfireapp.control.mymap", {
    	
    	 metadata : {
                properties : {           // setter and getter are created behind the scenes, incl. data binding and type validation
                    latitude: "float",
                    longitude: "float",
					address : "string"
                }
            },
            init: function(){
                this._html = new sap.ui.core.HTML({content:"<div style='height:100%;width:100%;' id='" + this.getId()+"-map'></div>"});
            },

            renderer : function(oRm, oControl) {
                oRm.write("<div style='height:20rem;width:68rem;margin:10px;' "); 
                oRm.writeControlData(oControl);  // writes the Control ID and enables event handling - important!
                oRm.write(">");
                oRm.renderControl(oControl._html);
                oRm.write("</div>");
            },
            
            onAfterRendering : function() {   
                if (!this.initialized) {      // after the first rendering initialize the map
                    this.initialized = true;
					var geocoder= new google.maps.Geocoder();
                    var options = { 
                        zoom:12, 
						//center: new google.maps.LatLng(this.getLatitude(),this.getLongitude()), 
                        mapTypeId: "roadmap" 
                    };
                    var _map = new google.maps.Map(jQuery.sap.domById(this.getId()+"-map"),options);
					geocoder.geocode( { 'address': this.getAddress()}, function(results, status) {
						if (status == google.maps.GeocoderStatus.OK) {
							 _map.setCenter(results[0].geometry.location);
							  var marker = new google.maps.Marker({
									  map: _map,
									  position: results[0].geometry.location
								 });
						} else {
							  alert('Geocode was not successful for the following reason: ' + status);
						}
						  });
                } else {  // after subsequent rerenderings, the map needs to get the current values set
                    _map.setCenter(new google.maps.LatLng(this.getLatitude(),this.getLongitude()));
                }
            }
    	
    });
});