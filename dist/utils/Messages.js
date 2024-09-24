// import { LangType } from "./types.js";
// type MessageType = {
//     [key: string]: LangType
// }
export const Messages = {
    imageFile: {
        ar: 'يجب أن يكون الملف من نوع صورة.',
        en: 'The file should be an image type.',
    },
    createdSuccessfully: {
        en: 'Created Successfully',
        ar: 'تم الانشاء بنجاح',
    },
    updatedSuccessfully: {
        en: 'Deleted Successfully',
        ar: 'تم الحذف بنجاح',
    },
    foundSuccessfully: {
        en: 'Found Successfully',
        ar: 'تم العثور بنجاح',
    },
    deleteSuccessfully: {
        en: 'Deleted Successfully',
        ar: 'تم الحذف بنجاح',
    },
    accountAlreadyExists: {
        ar: 'الحساب موجود بالفعل. يرجى تسجيل الدخول أو إعادة تعيين كلمة المرور.',
        en: 'Account already exists. Please log in or reset your password.',
    },
    hashingError: {
        ar: 'حدث خطأ أثناء تشفير كلمة المرور. يرجى المحاولة لاحقًا.',
        en: 'An error occurred while hashing the password. Please try again later.',
    },
    accountCreatedSuccessfully: {
        ar: 'تم إنشاء الحساب بنجاح. يمكنك الآن تسجيل الدخول',
        en: 'Account created successfully. You can now log in.',
    },
    loginSuccessfully: {
        ar: 'تم تسجيل الدخول بنجاح.',
        en: 'Logged in successfully.',
    },
    incorrectPassword: {
        ar: 'كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.',
        en: 'Incorrect password. Please try again.',
    },
    accountNotFound: {
        ar: 'لم يتم العثور على الحساب. يرجى التحقق من المعلومات المقدمة.',
        en: 'Account not found. Please check the provided information.',
    },
    registerSuccessfullyConfirmEmail: {
        ar: 'تم انشاء الحساب يرجى تأكيد بريدك الإلكتروني أولاً.',
        en: 'Account created. Please verify your email first.',
    },
    inActiveUser: {
        en: 'Your account is currently inactive. Please contact support to reactivate.',
        ar: 'حسابك غير نشط حاليًا. يرجى الاتصال بالدعم لإعادة تفعيله.',
    },
    confirmEmail: {
        ar: 'يرجى تأكيد بريدك الإلكتروني أولاً.',
        en: 'Please confirm your email first.',
    },
    emailVerified: {
        ar: 'تم تأكيد بريدك الإلكتروني بنجاح.',
        en: 'Your email has been successfully verified.',
    },
    currentPasswordIncorrect: {
        ar: 'كلمة المرور الحالية غير صحيحة.',
        en: 'Current password is incorrect.',
    },
    passwordChangedSuccessfully: {
        ar: 'تم تغيير كلمة المرور بنجاح.',
        en: 'Password changed successfully.',
    },
    invalidToken: {
        ar: 'رمز التحقق غير صالح.',
        en: 'Verification token is invalid.',
    },
    noToken: {
        ar: 'غير مصرح، لا يوجد رمز.',
        en: 'Not authorized, no token.',
    },
    invalidUrl: {
        ar: 'عنوان URL غير صالح - لا يمكن الوصول إلى هذه النقطة.',
        en: "Invalid URL - can't access this endpoint.",
    },
};
