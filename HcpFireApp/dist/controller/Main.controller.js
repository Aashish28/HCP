sap.ui.define([
			"sap/ui/core/mvc/Controller"
		], function(Controller) {
			"use strict";

			return Controller.extend("com.hcpfireapp.controller.Main", {
				onInit: function() {
					var that = this;
					setInterval(function() {
						that.doGet(that);
					}, 2000);
				},

				doGet: function(obj) {
					var sUrlCount = '/iot/v1/api/http/app.svc/T_IOT_3739597CDBB10D3A8A44/$count';
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

								sUrl = '/iot/v1/api/http/app.svc/T_IOT_3739597CDBB10D3A8A44?$top=1&$skip=' + skip;

							jQuery.ajax({
								type: "GET",
								contentType: "application/json",
								url: sUrl,
								dataType: "json",
								async: false,
								success: function(data, textStatus, jqXHR) {
									that.getView().byId("idNotifText").setText(data.d.results[0].C_SENSOR1 + "  ");
									var dt = that._getDateTime(data.d.results[0].C_TIMESTAMP);
									that.getView().byId("idNotifTime").setText(dt);
								},
								error: function() {
									//	            	alert("error to post");
								}

							});

						},
						
						_getDateTime:function(stimeStamp){
							var sTs =  stimeStamp.replace(".","");
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
							
							formattedDT = formattedDate + " " + formattedTime;
							
							return formattedDT;

						}
						
						

					});
			});