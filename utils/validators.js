export const validateProductForm = (formData) => {
    const errors = {}

    if (!formData.name?.trim()) {
        errors.name = "نام محصول الزامی است"
    } else if (formData.name.trim().length < 3) {
        errors.name = "نام محصول حداقل باید ۳ کاراکتر باشد"
    }

    if (!formData.type) {
        errors.type = "نوع محصول را انتخاب کنید"
    }

    if (!formData.material) {
        errors.material = "جنس محصول را انتخاب کنید"
    }

    if (!formData.category) {
        errors.category = "طرح محصول را انتخاب کنید"
    }

    if (!formData.description?.trim()) {
        errors.description = "توضیحات الزامی است"
    } else if (formData.description.trim().length < 10) {
        errors.description = "توضیحات باید حداقل ۱۰ کاراکتر باشد"
    }

    if (!formData.unitprice) {
        errors.unitprice = "قیمت خرید الزامی است"
    } else if (Number(formData.unitprice) <= 0) {
        errors.unitprice = "قیمت خرید باید بیشتر از صفر باشد"
    }

    if (!formData.price) {
        errors.price = "قیمت فروش الزامی است"
    } else if (Number(formData.price) <= 0) {
        errors.price = "قیمت فروش باید بیشتر از صفر باشد"
    } else if (Number(formData.price) < Number(formData.unitprice)) {
        errors.price = "قیمت فروش نباید کمتر از قیمت خرید باشد"
    }

    if (formData.img instanceof File) {
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"]

        if (!allowedTypes.includes(formData.img.type)) {
            errors.img = "فرمت تصویر باید jpg، png یا webp باشد"
        }

        if (formData.img.size > 1024 * 1024) {
            errors.img = "حجم تصویر نباید بیشتر از ۱ مگابایت باشد"
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    }
}
