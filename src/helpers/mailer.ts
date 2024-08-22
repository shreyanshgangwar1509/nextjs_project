import User from '@/model/userModel';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';

export const sendEmail = async({email,emailType,userId}:any)=>{

    try {

        // configure mial for usage
        const hashtoken =await bcryptjs.hash(userId.toStirng(),10); 
        if(emailType=="VERIFY"){
            await User.findByIdAndUpdate(userId,{
                $set:{verifyToken:hashtoken,
                    VerifyTokenExpiry: Date.now()+360000
                }});
        }else if(emailType=="RESET"){
            await User.findByIdAndUpdate(userId,{
                $set:{forgotPasswordToken:hashtoken,
                    forgotPasswordTokenExpiry:Date.now()+360000
                }});
        }


        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "b64c7e425bd359", //not herer
                pass: "c138af99f70adc"  // not here 
            }
            });
            const mailOptions = await transport.sendMail({
            from: '"Maddison Foo Koch 👻" <myemail@.com>', // sender address
            to: email,
            subject: emailType =="VERIFY" ? "verify your email":"reset your password",
            text: "Hello world?", // plain text body
            html: `<p>Click<a href="${process.env.DOMAIN}/verifyemail?token=${hashtoken}">here</a>to${emailType === 'VERRIFY'
            ?"verify your email":"reset your password"}
            or copy and paste the link below in your broswer
            <br>${process.env.DOMAIN}/verifyemail?token=${hashtoken}</p>`
            });

            const mailRespone=await transport.sendMail(mailOptions)
            return mailRespone;
    } catch (error) {
        throw error;
    }
}