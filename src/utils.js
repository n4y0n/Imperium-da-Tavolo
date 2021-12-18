export const getMaxTroops = civilization => {
    switch (civilization) {
        case "roma": return 200;
        case "britannia": return 10;
        default: return 5;
    }
}