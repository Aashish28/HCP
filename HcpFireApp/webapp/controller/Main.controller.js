sap.ui.define([
			"sap/ui/core/mvc/Controller",
			"com/hcpfireapp/model/formatter",
		], function(Controller,formatter) {
			"use strict";

			return Controller.extend("com.hcpfireapp.controller.Main", {
				formatter: formatter,
				onInit: function() {
					var that = this;
					setInterval(function() {
						that.doGet(that);
					}, 2000);
				},

				doGet: function(obj) {
					var sUrlCount = '/iot/v1/api/http/app.svc/T_IOT_904F30C2D16479DF04DC/$count';
					var skip, sUrl;
					var that = this;

					jQuery.ajax({
							type: "GET",
							contentType: "application/json",
							url: sUrlCount,
							dataType: "json",
							async: false,
							success: function(data, textStatus, jqXHR) {
								skip = data - 1;
							},
							error: function() {
								alert("No Data Found");
							}
					});

								sUrl = '/iot/v1/api/http/app.svc/T_IOT_904F30C2D16479DF04DC?$top=1&$skip=' + skip;

							jQuery.ajax({
								type: "GET",
								contentType: "application/json",
								url: sUrl,
								dataType: "json",
								async: false,
								success: function(data, textStatus, jqXHR) {
									that.getView().byId("idNotifText").setText(data.d.results[0].C_MSG + "  ");
									var dt = that._getDateTime(data.d.results[0].G_CREATED);
									that.getView().byId("idNotifTime").setText(dt);
									that.getView().byId("imgb64").setSrc('data:image/jpeg;base64,' + data.d.results[0].C_IMAGE);
									that.getView().byId("idInfoText").setText(data.d.results[0].C_INFO);
									var sLanLat = data.d.results[0].C_LOCATION;
									var aLanLat = sLanLat.split(",");
									var oMyMap = that.getView().byId("myMap");
									oMyMap.setLatitude(parseFloat(aLanLat[0]));
									oMyMap.setLongitude(parseFloat(aLanLat[1]));
									oMyMap.setAddress("Pune");
								},
								error: function() {
									//	            	alert("error to post");
								}

							});

						},
						
						_getDateTime:function(stimeStamp){
							/*var sTs =  stimeStamp.replace(".","");
							sTs = sTs.substr(0,10);
							var date = new Date(parseInt(sTs)*1000);
							var formattedDT;

							var hours = date.getHours();
							// Minutes part from the timestamp
							var minutes = "0" + date.getMinutes();
							// Seconds part from the timestamp
							var seconds = "0" + date.getSeconds();

							// Will display time in 10:30:23 format
							var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
							
							var year = date.getFullYear();
							var month = date.getMonth()-1;
							var date = date.getDate();

							var formattedDate = date + '/' + month + '/' + year;
							
							formattedDT = formattedDate + " " + formattedTime;*/
							
							return new Date(+stimeStamp.replace(/\/Date\((\d+)\)\//, '$1'));

						},
						
						setFireLogCount:function(oEvent){
							var total = oEvent.getParameter("total");
							this.getView().byId("idIconTabBarMulti").getItems()[3].setCount(total);
						}
						
						

					});
			});