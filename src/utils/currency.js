const vndCurrencyFormat = (rawPrice) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(rawPrice);
};

export { vndCurrencyFormat };


const discountPercent = (newPrice, oldPrice) => {
    return (100 - (newPrice / oldPrice) * 100).toFixed(0);
};

export { discountPercent }