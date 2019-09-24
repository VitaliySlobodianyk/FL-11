export const userActions = {
    aDD_ITEMS(quant) {
        return {
            type: 'addItems',
            value: quant
        };
    },
    rEMOVE_ITEM(itemId) {
        return {
            type: 'removeItem',
            value: itemId
        };
    },
    sEARCH_ITEMS(text) {
        return {
            type: 'searchItems',
            value: text
        };
    }
};