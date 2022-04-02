export const isRealValue = (obj) => {
    return obj && obj !== 'null' && typeof obj !== 'undefined';
}