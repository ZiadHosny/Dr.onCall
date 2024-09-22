export const ratingHelper = (arr) => {
    let avg = 0;
    arr.forEach((ele) => {
        avg += ele;
    });
    return avg / arr.length;
};
