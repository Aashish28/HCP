sap.ui.define([
    "sap/ui/model/odata/type/DateTime",
    "sap/ui/model/odata/type/Time",
], function(DateTimeType, TimeType) {
    "use strict";

    return {
        getStatus:function(sDateTime){
        	var sText;
        	var cDate = new Date();
        	var timeDiff = Math.abs(cDate.getTime() - sDateTime.getTime());
			var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
			switch (diffDays) {
				case 0:
					sText = "Fire Reported"
					break;
				case 1:
					sText = "Fire Control In progess"
					break;
				case 2:
					sText = "Fire Controlled"
					break;
				default:
					sText = "Fire Controlled"
					break;
			}
        	return sText;
        },
        
        getFireInformation:function(sInfo){
        	var rNumb , sText;
        	rNumb = Math.floor(Math.random() * 4);
        	switch (rNumb) {
        		case 0:
        			sText = "Fire is FAST! In less than 30 seconds a small flame can turn into a major fire. " +
        					"It only takes minutes for thick black smoke to fill a house or for it to be engulfed in flames.";
        			break;
        		case 1:
        			sText = "Fire is HOT! Heat is more threatening than flames. Room temperatures in a fire can be 100 degrees at floor level and rise to 600 degrees at eye level. "+ 
        					"Inhaling this super-hot air will scorch your lungs and melt clothes to your skin.";
					break;
        		case 2:
        			sText = "Fire is DARK! Fire starts bright, but quickly produces black smoke and complete darkness.";
					break;
        		case 3:
        			sText = "Fire is DEADLY! Smoke and toxic gases kill more people than flames do. Fire produces poisonous gases that make you disoriented and drowsy. "+ 
        					"Asphyxiation is the leading cause of fire deaths, exceeding burns by a three-to-one ratio."
					break;
        		default:
        	}
        	return sText;
        } 
    }
    
});