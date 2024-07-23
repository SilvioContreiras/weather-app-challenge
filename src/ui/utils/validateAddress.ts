export const validateAddress = (address: string): boolean => {
    const trimmedAddress = address.trim();
    const addressParts = trimmedAddress.split(/\s+/);

    if (addressParts.length < 3) {
        return false;
    }
    const hasStructureNumber = !isNaN(Number(addressParts[0]));
    const hasStreetName = addressParts.length > 1;

    return hasStructureNumber && hasStreetName;
};
