export function ForeignParadeep(portDueChoose, LGRT, HGRT, pilotageChoose, Shifting, Hours, WaterUsage, WaterType, Cancellation, Garbage, SGST, CGST, DollarVal){
    let PortDues = portDueChoose ? 0.267 * (LGRT == 0 ? HGRT : LGRT) * DollarVal : 0;
    let BerthHire = 0.002624 * HGRT * DollarVal * Hours ;
    let WaterCharge = 0;
    if(WaterType == 0){WaterCharge = 4.41 * DollarVal * WaterUsage;}
    else if(WaterType == 1){WaterCharge = 8.84 * DollarVal * WaterUsage;}
    else if(WaterType == 2){WaterCharge = 20.87 * DollarVal * WaterUsage;}
    let Pilotage = 0;
    if (pilotageChoose){
        Pilotage += (0.56207 * DollarVal * ((HGRT<=30000) ? HGRT : 30000));
        Pilotage += (((0.44945 * ((HGRT>60000) ? 30000 : ((HGRT - 30000 > 0) ? (HGRT - 30000) : 0))) + ((HGRT>30000) ? 16862 : 0)) * DollarVal);
        Pilotage += (((0.393 * ((HGRT>60000) ? (HGRT - 60000) : 0)) + ((HGRT>60000) ? 30345.5 : 0)) * DollarVal);
    }
    let ShiftingCost = Shifting * (Pilotage/2);
    let TotalCharge = PortDues + BerthHire + WaterCharge + ShiftingCost + Pilotage + Garbage - Cancellation;
    let SGSTCost = SGST * TotalCharge;
    let CGSTCost = CGST * TotalCharge;
    let FinalCost = TotalCharge + SGSTCost + CGSTCost;
    return {
        PortDues: PortDues,
        BerthHire: BerthHire,
        WaterCharge: WaterCharge,
        Pilotage: Pilotage,
        Cancellation: Cancellation,
        GarbageCost: Garbage,
        ShiftingCost: ShiftingCost,
        SGSTCost: SGSTCost,
        CGSTCost: CGSTCost,
        TotalCharge: TotalCharge,
        FinalCost: FinalCost,
    }
}

export function CoastalParadeep(portDueChoose,LGRT, HGRT, pilotageChoose, Shifting, Hours, WaterUsage, WaterType, Cancellation, Garbage, SGST, CGST){
    let PortDues = portDueChoose ? 6.574 * (LGRT == 0 ? HGRT : LGRT) : 0;
    let BerthHire = 0.064 * HGRT * Hours ;
    let Pilotage = 0;
    if (pilotageChoose){
        Pilotage += (13.83 * ((HGRT<=30000) ? HGRT : 30000));
        Pilotage += ((11.06 * ((HGRT>60000) ? 30000 : ((HGRT - 30000 > 0) ? (HGRT - 30000) : 0))) + ((HGRT>30000) ? 414900 : 0));
        Pilotage += ((9.68 * ((HGRT>60000) ? (HGRT - 60000) : 0)) + ((HGRT>60000) ? 746700 : 0));
    }
    let WaterCharge = 0;
    if(WaterType == 0){WaterCharge = 108.66 * WaterUsage;}
    else if(WaterType == 1){WaterCharge = 217.33 * WaterUsage;}
    else if(WaterType == 2){WaterCharge = 513.45 * WaterUsage;}
    let ShiftingCost = Shifting * (Pilotage/2);
    let TotalCharge = PortDues + BerthHire + WaterCharge + ShiftingCost + Pilotage + Garbage - Cancellation;
    let SGSTCost = SGST * TotalCharge;
    let CGSTCost = CGST * TotalCharge;
    let FinalCost = TotalCharge + SGSTCost + CGSTCost;
    return {
        PortDues: PortDues,
        BerthHire: BerthHire,
        WaterCharge: WaterCharge,
        Pilotage: Pilotage,
        Cancellation: Cancellation,
        GarbageCost: Garbage,
        ShiftingCost: ShiftingCost,
        SGSTCost: SGSTCost,
        CGSTCost: CGSTCost,
        TotalCharge: TotalCharge,
        FinalCost: FinalCost,
    }
}

export function VesselGopalapur(VesChoose, Shift, WarpChoose, HGRT, AncHrs, PilCanc, Tug,  PilDetHrs, TugHrs, PenBerthHrs, ColdMoveChoose, Coll, Bill, Inc, WtrUsg, DollarVal ){
    let VesCharge = 0;
    let ShiftingCost = 0;
    let WarpCost = WarpChoose ? (0.15*DollarVal*HGRT) : 0;
    let AnchorageCost = 0.03 * DollarVal * AncHrs * HGRT;
    let PilCancCost = PilCanc * DollarVal;
    let PilDetCost = 300 * DollarVal * PilDetHrs* Tug;
    let TugCost = 1000 * DollarVal * TugHrs * Tug;
    let PenBerthCost = 0.02 * DollarVal * PenBerthHrs * HGRT;
    let ColdMoveCost = ColdMoveChoose ? 2.25 * DollarVal * HGRT : 0;
    let GarbageCost = 150 * DollarVal * Coll;
    let ShpChndCost = 5000 * Bill;
    let PenCost = 500 * DollarVal * Inc;
    let WharfageCost = 25 * WtrUsg;
    if(VesChoose){
        if(HGRT <= 20000){
            VesCharge = 1.75 * HGRT * DollarVal;
        }else if(HGRT > 20000 && HGRT <= 40000){
            VesCharge = ((1.75 *20000)+(1.9 * (HGRT -20000)))* DollarVal;
        }else{
            VesCharge = (((1.75 + 1.9)*20000)+(2.08 * (HGRT-40000))) * DollarVal;
        }
    }
    if(Shift!=0){
        if(HGRT <= 20000){
            ShiftingCost = 0.26 * HGRT * DollarVal * Shift;
        }else if(HGRT > 20000 && HGRT <= 40000){
            ShiftingCost = ((0.26*20000)+(0.28 * (HGRT-20000))) * DollarVal * Shift;
        }else{
            ShiftingCost = (((0.26+0.28)*20000) + (2*(HGRT-40000))) * DollarVal * Shift;
        }
    }
    let TotalCharge = VesCharge + ShiftingCost + WarpCost + AnchorageCost + PilCancCost + PilDetCost + TugCost + PenBerthCost + ColdMoveCost + GarbageCost + ShpChndCost + PenCost + WharfageCost;
    return {
        "Vessel Charge": VesCharge,
        "Shifting Cost": ShiftingCost,
        "Warping Cost": WarpCost,
        "Anchorage Cost": AnchorageCost,
        "Pilot Cancellation Cost": PilCancCost,
        "Pilot Detention Cost": PilDetCost,
        "Tug Hire Cost": TugCost,
        "Penal Berth Hire Cost": PenBerthCost,
        "Cold Move Cost": ColdMoveCost,
        "Garbage Cost": GarbageCost,
        "Ship Chandling Cost": ShpChndCost,
        "Penanlty Charge": PenCost,
        "Wharfage Cost": WharfageCost,
        "Total Charge": TotalCharge,
    }
}