export function ForeignParadeep(PortDuesChoose, PilotageChoose, BirthHireChoose, HGRT, Shifting, Hours, WaterUsage, WaterType, Cancellation, Garbage, SGST, CGST, DollarVal){
    let PortDues = PortDuesChoose ? 0.267 * HGRT * DollarVal : 0;
    let BirthHire = BirthHireChoose ? 0.002624 * HGRT * DollarVal * Hours : 0;
    let WaterCharge = 0;
    console.log(WaterUsage);
    if(WaterType == 0){WaterCharge = 4.41 * DollarVal * WaterUsage;}
    else if(WaterType == 1){WaterCharge = 8.84 * DollarVal * WaterUsage;}
    else if(WaterType == 2){WaterCharge = 20.87 * DollarVal * WaterUsage;}
    let Pilotage = 0;
    if (PilotageChoose == true){
        let Pilotage3 = 0;
        let Pilotage1 = 0;
        let Pilotage2 = 0;
        if(HGRT>60000){
            Pilotage3 = ((0.393 * DollarValue * (HGRT - 60000)) + (30345.5 * DollarVal))
        }
        if(HGRT>30000){
            Pilotage2 = ((0.44945 * DollarVal * (HGRT - 30000)) + (16862 * DollarVal))
        }
        if(HGRT < 30000){
            Pilotage1 = (0.56207 * DollarVal * HGRT)
        }
        Pilotage = Pilotage1 + Pilotage2 + Pilotage3;
    }
    let ShiftingCost = Shifting * (Pilotage/2);
    let GarbageCost = Garbage ? 1000 : 0;
    let TotalCharge = PortDues + BirthHire + WaterCharge + ShiftingCost + Pilotage + GarbageCost - Cancellation;
    let SGSTCost = SGST ? (TotalCharge * 0.09) : 0;
    let CGSTCost = CGST ? (TotalCharge * 0.09) : 0;
    let FinalCost = TotalCharge + SGSTCost + CGSTCost;
    return {
        PortDues: PortDues,
        BirthHire: BirthHire,
        WaterCharge: WaterCharge,
        Pilotage: Pilotage,
        Cancellation: Cancellation,
        GarbageCost: GarbageCost,
        ShiftingCost: ShiftingCost,
        SGSTCost: SGSTCost,
        CGSTCost: CGSTCost,
        TotalCharge: TotalCharge,
        FinalCost: FinalCost,
    }
}