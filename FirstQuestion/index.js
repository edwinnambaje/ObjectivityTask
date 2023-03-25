function swapElements(array, indice1, indice2) {
    const temp = array[indice1];
    array[indice1] = array[indice2];
    array[indice2] = temp;
    return array;
}
const arr = [10, 12, 23, 34, 45];
swapElements(arr, 1, 3);
console.log(arr); 