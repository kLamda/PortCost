export default function ForeignParadeep(HGRT, Shifting, Hours, WaterUsage, WaterType, Cancellation, Garbage, SGST, CGST, DollarVal){
    let PortDues = 0.267 * HGRT * DollarVal;
    let BirthHire = 0.002624 * HGRT * DollarVal * Hours;
    let WaterCharge = 0;
    if (WaterType != null){
        switch(WaterType){
            case 0:
                WaterCharge = 4.41 * DollarVal * WaterUsage;
                break;
            case 1:
                WaterCharge = 8.84 * DollarVal * WaterUsage;
                break;
            case 2:
                WaterCharge = 20.87 * DollarVal * WaterUsage;
                break;
        }
    }
    let Pilotage = Math.round(HGRT/30000) * (0.56207 * DollarVal * 30000) + Math.round((HGRT-30000)/30000) * ((0.44945 * DollarVal * 30000) + (16862 * DollarVal)) + (((HGRT - 60000) >0) ? ((0.393 * DollarValue * (HGRT - 60000)) + (30345.5 * DollarVal)) : 0);
    let ShiftingCost = Shifting * (Pilotage/2);
    let TotalCharge = PortDues + BirthHire + WaterCharge + ShiftingCost + Pilotage + Garbage - Cancellation;
    let SGSTCost = (TotalCharge * SGST)/100;
    let CGSTCost = (TotalCharge * CGST)/100;
    let FinalCost = TotalCharge + SGSTCost + CGSTCost;
    return {
        PortDues: PortDues,
        BirthHire: BirthHire,
        WaterCharge: WaterCharge,
        Pilotage: Pilotage,
        ShiftingCost: ShiftingCost,
        TotalCharge: TotalCharge,
        SGSTCost: SGSTCost,
        CGSTCost: CGSTCost,
        FinalCost: FinalCost
    }
}