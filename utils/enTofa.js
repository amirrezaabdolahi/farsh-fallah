import { productTypes } from "./productDetail";

export function enTypeToFa(type) {
    return type === productTypes[0].value
        ? productTypes[0].label
        : type === productTypes[1].value
          ? productTypes[1].label
          : productTypes[2].label;
}
