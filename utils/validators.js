import { productTypes } from "./productDetail";

export const validateProductForm = (formData) => {
    const errors = {};

    if (!formData.name?.trim()) {
        errors.name = "نام محصول الزامی است";
    } else if (formData.name.trim().length < 3) {
        errors.name = "نام محصول حداقل باید ۳ کاراکتر باشد";
    }
    if (!formData.serial_number?.trim()) {
        errors.serial_number = "شناسه محصول الزامی است";
    }

    if (!formData.type) {
        errors.type = "نوع محصول را انتخاب کنید";
    }

    if (!formData.crop_sex) {
        errors.crop_sex = "جنس محصول را انتخاب کنید";
    }

    if (!formData.branch) {
        errors.branch = "طرح محصول را انتخاب کنید";
    }

    if (!formData.unit_price) {
        errors.unit_price = "قیمت خرید الزامی است";
    } else if (Number(formData.unit_price) <= 0) {
        errors.unit_price = "قیمت خرید باید بیشتر از صفر باشد";
    }

    if (!formData.sale_price) {
        errors.sale_price = "قیمت فروش الزامی است";
    } else if (Number(formData.sale_price) <= 0) {
        errors.sale_price = "قیمت فروش باید بیشتر از صفر باشد";
    } else if (Number(formData.sale_price) < Number(formData.unit_price)) {
        errors.sale_price = "قیمت فروش نباید کمتر از قیمت خرید باشد";
    }

    if (!formData.size && formData.type === productTypes[0]) {
        errors.size = "اندازه الزامی است";
    }
    if (!formData.width && formData.type === productTypes[1]) {
        errors.width = "اندازه الزامی است";
    }
    if (!formData.length && formData.type === productTypes[1]) {
        errors.length = "اندازه الزامی است";
    }

    if (formData.image instanceof File) {
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

        if (!allowedTypes.includes(formData.image.type)) {
            errors.image = "فرمت تصویر باید jpg، png یا webp باشد";
        }

        if (formData.image.size > 1024 * 1024) {
            errors.image = "حجم تصویر نباید بیشتر از ۱ مگابایت باشد";
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

export const validateSaleForm = (form, items) => {
    const errors = {};

    if (!items) errors.product = "محصول الزامی است";

    if (!/^09\d{9}$/.test(form.phone)) errors.phone = "شماره تلفن نامعتبر است";

    if (!form.province) errors.province = "استان را انتخاب کنید";
    if (!form.city) errors.city = "شهر را انتخاب کنید";

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};
