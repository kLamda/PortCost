export function ForeignParadeep(HGRT, pilotageChoose, Shifting, Hours, WaterUsage, WaterType, Cancellation, Garbage, SGST, CGST, DollarVal){
    let PortDues = 0.267 * HGRT * DollarVal;
    let BerthHire = 0.002624 * HGRT * DollarVal * Hours ;
    let WaterCharge = 0;
    if(WaterType == 0){WaterCharge = 4.41 * DollarVal * WaterUsage;}
    else if(WaterType == 1){WaterCharge = 8.84 * DollarVal * WaterUsage;}
    else if(WaterType == 2){WaterCharge = 20.87 * DollarVal * WaterUsage;}
    let Pilotage = 0;
    if (pilotageChoose){
        if(HGRT <= 30000){Pilotage += (0.56207 * DollarVal * HGRT)}
        if(HGRT>30000 && HGRT<=6000){Pilotage += ((0.44945 * DollarVal * (HGRT - 30000)) + (16862 * DollarVal))}
        if(HGRT>60000){Pilotage += ((0.393 * DollarVal * (HGRT - 60000)) + (30345.5 * DollarVal))}
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

export function CoastalParadeep(HGRT, pilotageChoose, Shifting, Hours, WaterUsage, WaterType, Cancellation, Garbage, SGST, CGST){
    let PortDues = 6.574 * HGRT;
    let BerthHire = 0.064 * HGRT * Hours ;
    let Pilotage = 0;
    if (pilotageChoose){
        if(HGRT <= 30000){Pilotage += (13.83 * HGRT)}
        if(HGRT>30000 && HGRT<=6000){Pilotage += ((11.06 * (HGRT - 30000)) + 414900)}
        if(HGRT>60000){Pilotage += ((9.68 * (HGRT - 60000)) + 746700)}
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