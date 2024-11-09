exports.IMAGE_TYPE = Object.freeze({
    PARENT_CATEGORY: { name: "PARENT_CATEGORY" },
    SUB_CATEGORY: { name: "SUB_CATEGORY" },
    USER_PROFILE: { name: "USER_PROFILE" },
    SERVICE: { name: "SERVICE" },
    BLOGS: { name: "BLOG" },
    BANNERS: {
        INTRUSIVE: { name: "INTRUSIVE" },
        NORMAL: { name: "NORMAL" }
    }
})

exports.VERIFICATION = Object.freeze({
    VERIFIED: 1,
    UN_VERIFIED: 0
})
exports.ERROR_MESSAGES = Object.freeze({

    SOMETHING_WENT_WRONG: "Something Went Wrong",
    INTERNAL_SERVER_ERROR: "Internal Server Error",
    NO_USER_FOUND: "User doesn't exists",
    VERIFICATION_FAILED: "Verification code is invalid",
    CANT_UNVERIFY: "You can't unverify a user",
    CITY_ALREADY_EXISTS: "City already exists",
    REGION_ALREADY_ADDED: "Region already exists",
    NO_CITY_FOUND: "No cities available",
    NO_REGION_FOUND: "No regions available",
    USER_ALREADY_EXISTS: "User already exists!",
    PHONE_OR_PASSWORD_INVALID:"Phone number/Password is invalid",
    UN_AUTHORIZED:"Un Authorized Access",
    ADMIN_ALREADY_EXISTS:"User with this phone number already exists",
    SOMETHINGS_NOT_RIGHT:"Something is not right at our end.Please try again after some time",
    PASSWORD_MISMATCH:"Password mismatch",
    FAILED_TO_UPDATE_PASSWORD:"Failed to update password",
    INVALID_PASSWORD:"You have entered an invalid current password"
})

exports.SUCCESS_MESSAGES = Object.freeze({
    SUCCESSFULLY_CREATED: "Successfully Created",
    SUCCESSFULLY_ADDED: "Successfully Added",
    OTP_SENT: "OTP Sent Successfully",
    USER_VERIFIED: "Verification Successful",
    ADMIN_CREATION_SUCCESS:"You have created an admin successfully",
    PASSWORD_UPDATED_SUCCESSFULLY:"Password updated successfully",
    ADMIN_BANNER_DELETION:"Banner deleted successfully",
    SERVICE_DELETED_SUCCESSFULLY:"Service deleted successfully",
    LOCATION_DELETED_SUCCESSFULLY:"Location deleted successfully"


})
