import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        maxlength: [20, "name cannot exceed 16 characters"]
    },
    email : {
        type : String,
        required: [true, "email is required"],
        lowercase: true,
        validate: [validator.isEmail, "Please enter a valid email"],
        unique: [true, "email already exists"]
    },
    password: {
        type: String,
        required: [true, "please enter a password"],
        minlength: 6,
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, "please enter confirm password"],
        validate: {
            validator: function(val){
                return val == this.password
            },
            message: "Password & Confirm password must be same"
        }
    },
    gender: {
        type: String,
        required: [true, "Please select a gender"],
        enum: ["male", "female"]
    },
    profilePic: {
        type: String,
        default: "",
    },
    isActive : {
        type: Boolean,
        default: true,
        select: false
    },
    OTP: String,
    OTPValidated: Boolean,
    OTPExpires: Date
    
}, {timestamps: true})

userSchema.pre("save", async function(next){
    if (!this.isModified('password')) {
        return next();
      }
    // if (this.bypassMiddleware) {
    //     return next();
    //   }
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    this.confirmPassword = undefined;

    next()
})

userSchema.pre(/^find/, function(next){
    this.find({active: {$ne: false}})

    next()
})

const User = mongoose.model("User", userSchema)
User.createIndexes();

export default User;