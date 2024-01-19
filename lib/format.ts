export const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-In", {
        style: "currency",
        currency: "INR",
    }).format(price)
}