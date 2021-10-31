function sum(array) {
  var total = 0;
  array = array.filter(item => item !== null);
  array = array.map(item => parseFloat(item));
  for (var i = 0; i < array.length; i++) total += array[i];
  return total;
}

export function ForeignParadeep(portDueChoose, LGRT, HGRT, pilotageChoose, Shifting, Hours, WaterUsage, WaterType, Cancellation, Garbage, SGST, CGST, DollarVal){
    let PortDues = portDueChoose ? Math.round(0.267 * (LGRT == 0 ? HGRT : LGRT) * DollarVal) : 0;
    let BerthHire = Math.round(0.002624 * HGRT * DollarVal * Hours) ;
    let WaterCharge = 0;
    if(WaterType == 0){WaterCharge = Math.round(4.41 * DollarVal * WaterUsage);}
    else if(WaterType == 1){WaterCharge = Math.round(8.84 * DollarVal * WaterUsage);}
    else if(WaterType == 2){WaterCharge = Math.round(20.87 * DollarVal * WaterUsage);}
    let Pilotage = 0;
    if (pilotageChoose){
        Pilotage += Math.round(0.56207 * DollarVal * ((HGRT<=30000) ? HGRT : 30000));
        Pilotage += Math.round(((0.44945 * ((HGRT>60000) ? 30000 : ((HGRT - 30000 > 0) ? (HGRT - 30000) : 0)))) * DollarVal);
        Pilotage += Math.round(((0.393 * ((HGRT>60000) ? (HGRT - 60000) : 0)) ) * DollarVal);
    }
    let ShiftingCost = Math.round(Shifting * (Pilotage/2));
    let TotalCharge = PortDues + BerthHire + WaterCharge + ShiftingCost + Pilotage + Garbage - Math.round(Cancellation);
    let SGSTCost = Math.round(SGST * TotalCharge);
    let CGSTCost = Math.round(CGST * TotalCharge);
    let FinalCost = TotalCharge + SGSTCost + CGSTCost;
    return {
        calcVal: {"Port Dues": PortDues,
        "Berth Hire": BerthHire,
        "Water Charge": WaterCharge,
        "Pilotage": Pilotage,
        "Cancellation": Cancellation,
        "Garbage Cost": Garbage,
        "Shifting Cost": ShiftingCost,
        "SGST Cost": SGSTCost,
        "CGST Cost": CGSTCost,
        "Total Charge": TotalCharge,},
        finalCost: {"Final Cost": FinalCost},
        "portType" : "Paradeep"
    }
}

export function CoastalParadeep(portDueChoose,LGRT, HGRT, pilotageChoose, Shifting, Hours, WaterUsage, WaterType, Cancellation, Garbage, SGST, CGST){
    let PortDues = portDueChoose ? Math.round(6.574 * (LGRT == 0 ? HGRT : LGRT)) : 0;
    let BerthHire = Math.round(0.064 * HGRT * Hours) ;
    let Pilotage = 0;
    if (pilotageChoose){
        Pilotage += Math.round(13.83 * ((HGRT<=30000) ? HGRT : 30000));
        Pilotage += Math.round((11.06 * ((HGRT>60000) ? 30000 : ((HGRT - 30000 > 0) ? (HGRT - 30000) : 0))));
        Pilotage += Math.round((9.68 * ((HGRT>60000) ? (HGRT - 60000) : 0)));
    }
    let WaterCharge = 0;
    if(WaterType == 0){WaterCharge = Math.round(108.66 * WaterUsage);}
    else if(WaterType == 1){WaterCharge = Math.round(217.33 * WaterUsage);}
    else if(WaterType == 2){WaterCharge = Math.round(513.45 * WaterUsage);}
    let ShiftingCost = Math.round(Shifting * (Pilotage/2));
    let TotalCharge = PortDues + BerthHire + WaterCharge + ShiftingCost + Pilotage + Garbage - Math.round(Cancellation);
    let SGSTCost = Math.round(SGST * TotalCharge);
    let CGSTCost = Math.round(CGST * TotalCharge);
    let FinalCost = TotalCharge + SGSTCost + CGSTCost;
    return {
        calcVal: {"Port Dues": PortDues,
        "Berth Hire": BerthHire,
        "Water Charge": WaterCharge,
        "Pilotage": Pilotage,
        "Cancellation": Cancellation,
        "Garbage Cost": Garbage,
        "Shifting Cost": ShiftingCost,
        "SGST Cost": SGSTCost,
        "CGST Cost": CGSTCost,
        "Total Charge": TotalCharge,},
        finalCost: {"Final Cost": FinalCost},
        "portType" : "Paradeep"
    }
}

export function VesselGopalapur(VesChoose, Shift, WarpChoose, HGRT, AncHrs, PilCanc, Tug,  PilDetHrs, TugHrs, PenBerthHrs, ColdMoveChoose, Coll, Bill, Inc, WtrUsg, DollarVal ){
    let VesCharge = 0;
    let ShiftingCost = 0;
    let WarpCost = WarpChoose ? Math.round(0.15*DollarVal*HGRT) : 0;
    let AnchorageCost = Math.round(0.03 * DollarVal * AncHrs * HGRT);
    let PilCancCost = Math.round(PilCanc * DollarVal);
    let PilDetCost = Math.round(300 * DollarVal * PilDetHrs* Tug);
    let TugCost = Math.round(1000 * DollarVal * TugHrs * Tug);
    let PenBerthCost = Math.round(0.02 * DollarVal * PenBerthHrs * HGRT);
    let ColdMoveCost = ColdMoveChoose ? Math.round(2.25 * DollarVal * HGRT) : 0;
    let GarbageCost = Math.round(150 * DollarVal * Coll);
    let ShpChndCost = Math.round(5000 * Bill);
    let PenCost = Math.round(500 * DollarVal * Inc);
    let WharfageCost = Math.round(25 * WtrUsg);
    if(VesChoose){
        if(HGRT <= 20000){
            VesCharge = 1.75 * HGRT * DollarVal;
        }else if(HGRT > 20000 && HGRT <= 40000){
            VesCharge = ((1.75 *20000)+(1.9 * (HGRT -20000)))* DollarVal;
        }else{
            VesCharge = (((1.75 + 1.9)*20000)+(2.08 * (HGRT-40000))) * DollarVal;
        }
    }
    VesCharge = Math.round(VesCharge);
    if(Shift!=0){
        if(HGRT <= 20000){
            ShiftingCost = 0.26 * HGRT * DollarVal * Shift;
        }else if(HGRT > 20000 && HGRT <= 40000){
            ShiftingCost = ((0.26*20000)+(0.28 * (HGRT-20000))) * DollarVal * Shift;
        }else{
            ShiftingCost = (((0.26+0.28)*20000) + (2*(HGRT-40000))) * DollarVal * Shift;
        }
    }
    ShiftingCost = Math.round(ShiftingCost);
    let TotalCharge = VesCharge + ShiftingCost + WarpCost + AnchorageCost + PilCancCost + PilDetCost + TugCost + PenBerthCost + ColdMoveCost + GarbageCost + ShpChndCost + PenCost + WharfageCost;
    let FinalCost = TotalCharge;
    return {
        calcVal: {"Vessel Charge": VesCharge,
        "Shifting Cost": ShiftingCost,
        "Warping Cost": WarpCost,
        "Anchorage Cost": AnchorageCost,
        "Pilot Cancellation": PilCancCost,
        "Pilot Detention ": PilDetCost,
        "Tug Hire Cost": TugCost,
        "Penal Berth Hire": PenBerthCost,
        "Cold Move Cost": ColdMoveCost,
        "Garbage Cost": GarbageCost,
        "Ship Chandling": ShpChndCost,
        "Penanlty Charge": PenCost,
        "Wharfage Cost": WharfageCost,
        "Total Charge": TotalCharge,},
        finalCost:{"Final Cost": FinalCost},
        "portType": "Gopalapur"
    }
}

export function TamilNadu(PortDueChoice, HGRT, BerthHireChoice, PilotageChoice, ShiftingChoice, AncHrs, CGST, SGST, DollarVal, calcType){
    let PortDues = 0;
    let BerthHire = 0;
    let Pilotage = 0;
    let shifting = 0;
    let AnchorageCost = 0;
    if(calcType=="Foreign"){
        if(PortDueChoice != null){
            if(PortDueChoice == 0){
                PortDues = Math.round(0.3285 * DollarVal * HGRT);
            }else if(PortDueChoice == 1){
                PortDues = Math.round(0.1642 * DollarVal * HGRT);
            }
        }
        if(BerthHireChoice){
            if(HGRT<=20000){BerthHire=Math.round(0.0075 * DollarVal * HGRT);}
            else if(HGRT>20000 && HGRT <=30000){BerthHire=Math.round(((0.0075 * 20000) + (0.0081 * (HGRT-20000)))*DollarVal);}
            else if(HGRT>30000 && HGRT <=60000){BerthHire = Math.round(((0.0081 * 10000) + (0.0075 * 20000) + (0.0065 * (HGRT-30000)))*DollarVal);}
            else if(HGRT>60000){BerthHire = Math.round(((0.0081 * 10000) + (0.0075 * 20000) + (0.0065 * 30000) + (0.0057 * (HGRT-60000)))*DollarVal);}
        }
        if(PilotageChoice){
            if(HGRT<=20000){Pilotage = Math.round(0.5162 * DollarVal * HGRT);}
            else if(HGRT>20000 && HGRT <=30000){Pilotage = Math.round(((0.5162 * 20000) + (0.5338 * (HGRT-20000)))*DollarVal);}
            else if(HGRT>30000 && HGRT <=60000){Pilotage = Math.round(((0.5338 * 10000) + (0.5162 * 20000) + (0.427 * (HGRT-30000)))*DollarVal);}
            else if(HGRT>60000){Pilotage = Math.round(((0.5338 * 10000) + (0.5162 * 20000) + (0.427 * 30000) + (0.3737 * (HGRT-60000)))*DollarVal);}
        }
        if(ShiftingChoice){
            if(HGRT<=20000){shifting = Math.round(0.1807 * DollarVal * HGRT);}
            else if(HGRT>20000 && HGRT <=30000){shifting = Math.round(((0.1807 * 20000) + (0.1868 * (HGRT-20000)))*DollarVal);}
            else if(HGRT>30000 && HGRT <=60000){shifting = Math.round(((0.1868 * 10000) + (0.1807 * 20000) + (0.1495 * (HGRT-30000)))*DollarVal);}
            else if(HGRT>60000){shifting = Math.round(((0.1868 * 10000) + (0.1807 * 20000) + (0.1495 * 30000) + (0.0057 * (HGRT-60000)))*DollarVal);}
        }
        if(AncHrs!=0){
            if(HGRT <= 3000){AnchorageCost = Math.round(0.000599 * DollarVal * HGRT * AncHrs);}
            else if(HGRT > 3000 && HGRT <= 10000){AnchorageCost = Math.round(((0.000599 * 3000) + (0.000388 * (HGRT-3000))) * DollarVal * AncHrs);}
            else if(HGRT > 10000 && HGRT <= 15000){AnchorageCost = Math.round(((0.000599 * 3000) + (0.000388 * 7000) + (0.0005 * (HGRT-10000))) * DollarVal * AncHrs);}
            else if(HGRT > 15000 && HGRT <= 20000){AnchorageCost = Math.round(((0.000599 * 3000) + (0.000388 * 7000) + (0.0005 * 5000) + (0.0006 * (HGRT-15000))) * DollarVal * AncHrs);}
            else if(HGRT > 20000 && HGRT <= 25000){AnchorageCost = Math.round(((0.000599 * 3000) + (0.000388 * 7000) + (0.0005 * 5000) + (0.0006 * 5000) + (0.0009 * (HGRT-20000))) * DollarVal * AncHrs);}
            else if(HGRT > 25000 && HGRT <= 30000){AnchorageCost = Math.round(((0.000599 * 3000) + (0.000388 * 7000) + (0.0005 * 5000) + (0.0006 * 5000) + (0.0009 * 5000) + (0.001 * (HGRT-25000))) * DollarVal * AncHrs);}
            else{AnchorageCost = Math.round(((0.000599 * 3000) + (0.000388 * 7000) + (0.0005 * 5000) + (0.0006 * 5000) + (0.0009 * 5000) + (0.001 * 5000) + (0.0011 * (HGRT-30000))) * DollarVal * AncHrs);}
        }
    }else if(calcType=="Coastal"){
        if(PortDueChoice != null){
            if(PortDueChoice == 0){
                PortDues = Math.round(8.55 * HGRT);
            }else if(PortDueChoice == 1){
                PortDues = Math.round(4.3 * HGRT);
            }
        }
        if(BerthHireChoice){
            if(HGRT<=20000){BerthHire=Math.round(0.1932 * HGRT);}
            else if(HGRT>20000 && HGRT <=30000){BerthHire=Math.round((0.1932 * 20000) + (0.2105 * (HGRT-20000)));}
            else if(HGRT>30000 && HGRT <=60000){BerthHire = Math.round((0.2105 * 10000) + (0.1932 * 20000) + (0.1684 * (HGRT-30000)));}
            else if(HGRT>60000){BerthHire = Math.round((0.2105 * 10000) + (0.1932 * 20000) + (0.1684 * 30000) + (0.1474 * (HGRT-60000)));}
        }
        if(PilotageChoice){
            if(HGRT<=20000){Pilotage = Math.round(13.47 * HGRT);}
            else if(HGRT>20000 && HGRT <=30000){Pilotage = Math.round((13.47 * 20000) + (13.92 * (HGRT-20000)));}
            else if(HGRT>30000 && HGRT <=60000){Pilotage = Math.round((13.92 * 10000) + (13.47 * 20000) + (11.14 * (HGRT-30000)));}
            else if(HGRT>60000){Pilotage = Math.round((13.92 * 10000) + (13.47 * 20000) + (11.14 * 30000) + (9.74 * (HGRT-60000)));}
        }
        if(ShiftingChoice){
            if(HGRT<=20000){shifting = Math.round(4.71 * HGRT);}
            else if(HGRT>20000 && HGRT <=30000){shifting = Math.round((4.71 * 20000) + (4.87 * (HGRT-20000)));}
            else if(HGRT>30000 && HGRT <=60000){shifting = Math.round((4.87 * 10000) + (4.71 * 20000) + (3.9 * (HGRT-30000)));}
            else if(HGRT>60000){shifting = Math.round((4.87 * 10000) + (4.71 * 20000) + (3.9 * 30000) + (3.41 * (HGRT-60000)));}
        }
        if(AncHrs!=0){
            if(HGRT <= 3000){AnchorageCost = Math.round(0.0155 * HGRT * AncHrs);}
            else if(HGRT > 3000 && HGRT <= 10000){AnchorageCost = Math.round(((0.0155 * 3000) + (0.0104 * (HGRT-3000)))  * AncHrs);}
            else if(HGRT > 10000 && HGRT <= 15000){AnchorageCost = Math.round(((0.0155 * 3000) + (0.0104 * 7000) + (0.0135 * (HGRT-10000)))  * AncHrs);}
            else if(HGRT > 15000 && HGRT <= 20000){AnchorageCost = Math.round(((0.0155 * 3000) + (0.0104 * 7000) + (0.0135 * 5000) + (0.0165 * (HGRT-15000)))  * AncHrs);}
            else if(HGRT > 20000 && HGRT <= 25000){AnchorageCost = Math.round(((0.0155 * 3000) + (0.0104 * 7000) + (0.0135 * 5000) + (0.0165 * 5000) + (0.0226 * (HGRT-20000)))  * AncHrs);}
            else if(HGRT > 25000 && HGRT <= 30000){AnchorageCost = Math.round(((0.0155 * 3000) + (0.0104 * 7000) + (0.0135 * 5000) + (0.0165 * 5000) + (0.0226 * 5000) + (0.0248 * (HGRT-25000)))  * AncHrs);}
            else{AnchorageCost = Math.round(((0.0155 * 3000) + (0.0104 * 7000) + (0.0135 * 5000) + (0.0165 * 5000) + (0.0226 * 5000) + (0.0248 * 5000) + (0.0269 * (HGRT-30000)))  * AncHrs);}
        }
    }
    let TotalCharge = PortDues + BerthHire + Pilotage + shifting + AnchorageCost;
    let CGSTCost = Math.round(TotalCharge * CGST);
    let SGSTCost = Math.round(TotalCharge * SGST);
    let FinalCost = TotalCharge + CGSTCost + SGSTCost;
    return{
        calcVal:{
        "Port Dues": PortDues,
        "Berth Hire": BerthHire,
        "Pilotage": Pilotage,
        "Shifting": shifting,
        "Anchorage Cost": AnchorageCost,
        "CGST": CGSTCost,
        "SGST": SGSTCost,
        "Total Charge": TotalCharge,},
        finalCost:{
        "Final Cost": FinalCost,},
        "portType" : "Tamil Nadu"
    }
}

export function NewMangalore(PortDueChoice, HGRT, BerthHireChoice, subBerthHireChoice, BerthHrs, BerthVsslNo, PilotageChoice, PilotageVsslNo, ShiftingChoice, ShiftingVsslNo, DetentionCharge, TugHireCharge, AncChoice, AncHrs, DollarVal, calcType){
    let PortDues = 0;
    let BerthHire = 0;
    let Pilotage = new Array(6).fill(null);
    let shifting = new Array(5).fill(0);
    let AnchorageCost = 0;
    if(calcType === "Foreign"){
        if(PortDueChoice!==false){
            if(PortDueChoice == 0 || PortDueChoice == 2 || PortDueChoice == 4){
                PortDues = Math.round(0.344 * HGRT * DollarVal);
            } else if(PortDueChoice == 1 || PortDueChoice == 3){
                PortDues = Math.round(0.055 * HGRT * DollarVal);
            }
        }
        if(BerthHireChoice!==false){
            if(BerthHireChoice == 0){
                BerthHire = Math.round(0.0024 * HGRT * DollarVal * BerthHrs[0]);
            }else if(BerthHireChoice == 1){
                if(subBerthHireChoice == 0 || subBerthHireChoice == 5){
                    BerthHire = Math.round(0.0034 * HGRT * DollarVal * BerthHrs[1]);
                }else if(subBerthHireChoice == 1 || subBerthHireChoice == 4){
                    BerthHire = Math.round(4.26 * HGRT * DollarVal * BerthHrs[1] * BerthVsslNo);
                }else if(subBerthHireChoice == 2){
                    BerthHire = Math.round(0.68 * HGRT * DollarVal * BerthHrs[1] * BerthVsslNo);
                }else if(subBerthHireChoice == 3){
                    BerthHire = Math.round(0.33 * HGRT * DollarVal * BerthHrs[1] * BerthVsslNo);
                }
            }
        }
        if(PilotageChoice.length > 0){
            if(PilotageChoice.includes(0)){
                if(HGRT<=30000){Pilotage[0] = Math.round(0.441 * HGRT * DollarVal);}
                else if(HGRT>30000 && HGRT <=60000){Pilotage[0] = Math.round((0.441 * 30000) + (0.353 * (HGRT-30000)) * DollarVal);}
                else if(HGRT>60000){Pilotage[0] = Math.round((0.441 * 30000) + (0.353 * 30000) + (0.309 * (HGRT-60000)) * DollarVal);}
            }
            if(PilotageChoice.includes(1)){
                Pilotage[1] = Math.round(0.26 * HGRT * DollarVal);
            }
            if(PilotageChoice.includes(2)){
                if(HGRT<=200){Pilotage[2] = Math.round(98 * DollarVal * PilotageVsslNo[0]);}
                else {Pilotage[2] = Math.round(147 * DollarVal * PilotageVsslNo[0]);}
            }
            if(PilotageChoice.includes(3)){
                Pilotage[3] = Math.round(98 * PilotageVsslNo[1] * DollarVal);
            }
            if(PilotageChoice.includes(4)){
                if(HGRT<=30000){Pilotage[4] = Math.round(0.441 * HGRT * DollarVal * PilotageVsslNo[2]);}
                else if(HGRT>30000 && HGRT <=60000){Pilotage[4] = Math.round((0.441 * 30000) + (0.353 * (HGRT-30000)) * DollarVal * PilotageVsslNo[2]);}
                else if(HGRT>60000){Pilotage[4] = Math.round((0.441 * 30000) + (0.353 * 30000) + (0.309 * (HGRT-60000)) * DollarVal * PilotageVsslNo[2]);}
            }
            if(PilotageChoice.includes(5)){
                if(HGRT<=30000){Pilotage[5] = Math.round(0.441 * HGRT * DollarVal * PilotageVsslNo[3]);}
                else if(HGRT>30000 && HGRT <=60000){Pilotage[5] = Math.round((0.441 * 30000) + (0.353 * (HGRT-30000)) * DollarVal * PilotageVsslNo[3]);}
                else if(HGRT>60000){Pilotage[5] = Math.round((0.441 * 30000) + (0.353 * 30000) + (0.309 * (HGRT-60000)) * DollarVal * PilotageVsslNo[3]);}
            }
        }
        if(ShiftingChoice.length > 0){ 
            if(ShiftingChoice.includes(0)){
                if(HGRT<=30000){shifting[0] = Math.round(0.11 * HGRT * DollarVal);}
                else if(HGRT>30000 && HGRT <=60000){shifting[0] = Math.round((0.11 * 30000) + (0.088 * (HGRT-30000)) * DollarVal);}
                else if(HGRT>60000){shifting[0] = Math.round((0.11 * 30000) + (0.088 * 30000) + (0.077 * (HGRT-60000)) * DollarVal);}
            }
            if(ShiftingChoice.includes(1)){
                if(HGRT<=200){shifting[1] = Math.round(24.56 * ShiftingVsslNo * DollarVal);}
                else {shifting[1] = Math.round(36.82 * ShiftingVsslNo * DollarVal);}
            }
        }
        if(AncChoice){
            if(AncChoice===0){
                if(AncHrs<=72) AnchorageCost = 0
                else if(AncHrs>72 && AncHrs <=144) AnchorageCost = Math.round(0.05 * BerthHire)
                else if(AncHrs>144 && AncHrs <=216) AnchorageCost = Math.round(0.1 * BerthHire)
            }
            else if(AncChoice===1){
                if(AncHrs<=48) AnchorageCost = 0
                else if(AncHrs>48 && AncHrs <=96) AnchorageCost = Math.round(0.1 * BerthHire)
                else if(AncHrs>96 && AncHrs <=144) AnchorageCost = Math.round(0.3 * BerthHire)
                else AnchorageCost = Math.round(0.5 * BerthHire)
            }
        }
    }
    else if(calcType==='coastal'){
        if(PortDueChoice!==false){
            if(PortDueChoice == 0 || PortDueChoice == 2 || PortDueChoice == 4){
                PortDues = Math.round(5.57 * HGRT );
            } else if(PortDueChoice == 1 || PortDueChoice == 3){
                PortDues = Math.round(2.57 * HGRT );
            } else PortDues = 0;
        }
        if(BerthHireChoice!==false){
            if(BerthHireChoice == 0){
                BerthHire = Math.round(0.062 * HGRT  * BerthHrs[0]);
            }else if(BerthHireChoice == 1){
                if(subBerthHireChoice == 0 || subBerthHireChoice == 5){
                    BerthHire = Math.round(0.092 * HGRT  * BerthHrs[1]);
                }else if(subBerthHireChoice == 1 || subBerthHireChoice == 4){
                    BerthHire = Math.round(113.89 * HGRT  * BerthHrs[1] * BerthVsslNo);
                }else if(subBerthHireChoice == 2){
                    BerthHire = Math.round(18.24 * HGRT  * BerthHrs[1] * BerthVsslNo);
                }else if(subBerthHireChoice == 3){
                    BerthHire = Math.round(8.95 * HGRT  * BerthHrs[1] * BerthVsslNo);
                }
            }
        }
        if(PilotageChoice){
            if(PilotageChoice == 0){
                if(HGRT<=30000){Pilotage[0] = Math.round(11.17 * HGRT );}
                else if(HGRT>30000 && HGRT <=60000){Pilotage[0] = Math.round((11.17 * 30000) + (9.42 * (HGRT-30000)) );}
                else if(HGRT>60000){Pilotage[0] = Math.round((11.17 * 30000) + (9.42 * 30000) + (8.24 * (HGRT-60000)) );}
            }
            if(PilotageChoice == 1){
                Pilotage[1] = Math.round(0.26 * HGRT );
            }
            if(PilotageChoice == 2){
                if(HGRT<=200){Pilotage[2] = Math.round(2625  * PilotageVsslNo);}
                else {Pilotage[2] = Math.round(3936  * PilotageVsslNo);}
            }
            if(PilotageChoice == 3){
                Pilotage[3] = Math.round(2625 * PilotageVsslNo );
            }
            if(PilotageChoice == 4){
                if(HGRT<=30000){Pilotage[0] = Math.round(11.17 * HGRT );}
                else if(HGRT>30000 && HGRT <=60000){Pilotage[0] = Math.round((11.17 * 30000) + (9.42 * (HGRT-30000)) * PilotageVsslNo);}
                else if(HGRT>60000){Pilotage[0] = Math.round((11.17 * 30000) + (9.42 * 30000) + (8.24 * (HGRT-60000))* PilotageVsslNo );}
            }
            if(PilotageChoice == 5){
                if(HGRT<=30000){Pilotage[0] = Math.round(11.17 * HGRT );}
                else if(HGRT>30000 && HGRT <=60000){Pilotage[0] = Math.round((11.17 * 30000) + (9.42 * (HGRT-30000)) * PilotageVsslNo);}
                else if(HGRT>60000){Pilotage[0] = Math.round((11.17 * 30000) + (9.42 * 30000) + (8.24 * (HGRT-60000)) * PilotageVsslNo);}
            }
        }
        if(ShiftingChoice){
            if(ShiftingChoice == 0){
                if(HGRT<=30000){shifting[0] = Math.round(2.95 * HGRT );}
                else if(HGRT>30000 && HGRT <=60000){shifting[0] = Math.round((2.95 * 30000) + (2.36 * (HGRT-30000)) );}
                else if(HGRT>60000){shifting[0] = Math.round((2.95 * 30000) + (2.36 * 30000) + (2.06 * (HGRT-60000)) );}
            }
            if(ShiftingChoice == 1){
                if(HGRT<=200){shifting[1] = Math.round(656 * ShiftingVsslNo );}
                else {shifting[1] = Math.round(984 * ShiftingVsslNo );}
            }
        }
        if(AncHrs){
            if(AncChoice===0){
                if(AncHrs<=72) AnchorageCost = 0
                else if(AncHrs>72 && AncHrs <=144) AnchorageCost = Math.round(0.05 * BerthHire)
                else if(AncHrs>144 && AncHrs <=216) AnchorageCost = Math.round(0.1 * BerthHire)
            }
            else if(AncChoice===1){
                if(AncHrs<=48) AnchorageCost = 0
                else if(AncHrs>48 && AncHrs <=96) AnchorageCost = Math.round(0.1 * BerthHire)
                else if(AncHrs>96 && AncHrs <=144) AnchorageCost = Math.round(0.3 * BerthHire)
                else AnchorageCost = Math.round(0.5 * BerthHire)
            }
        }
    }
    let TotalCost = Math.round(PortDues + BerthHire + sum(Pilotage) + sum(shifting) + DetentionCharge + TugHireCharge + AnchorageCost);
    return {
        calcVal:{
        "Port Dues": PortDues,
        "Berth Hire": BerthHire,
        "Pilotage (PILOTAGE BOTH INWARD/OUTWARD)" : Pilotage[0],
        "Pilotage (SPM)" : Pilotage[1],
        "Pilorage (BARGES,TUGS,LAUNCHES)": Pilotage[2],
        "Pilotage (BUNKER BARGE)": Pilotage[3],
        "Pilotage (EXCLUSIVELY CALlING AT BERTH)": Pilotage[4],
        "Pilotage (EXCLUSIVELY CALlING AT ANCHORAGE)": Pilotage[5],
        "Shifting (PILOTAGE BOTH INWARD/OUTWARD)": shifting[0],
        "Shifting (BARGES, TUGS, LAUNCHES)": shifting[1],
        "Shifting (BUNKER BARGE)": ShiftingChoice.includes(2) ? 0: null,
        "Shifting (EXCLUSIVELY CALlING AT BERTH)" : ShiftingChoice.includes(3) ? 0: null,
        "Shifting (EXCLUSIVELY CALlING AT ANCHORAGE)" : ShiftingChoice.includes(4) ? 0: null,
        "Detention Charge": DetentionCharge,
        "Tug Hire Charge" : TugHireCharge,
        "Anchorage Charge": AnchorageCost,},
        finalCost:{
        "Final Cost": TotalCost,},
        "portType" : "New Mangalore"
    }
}