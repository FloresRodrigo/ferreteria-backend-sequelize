const transporter = require('../configs/mail.config');

//Plantillas para mandar mails
class MailService {
    //Registro exitoso
    async sendWelcomeEmail(usuario) {
        await transporter.sendMail({
            from: `"Ferreteria" <${process.env.NODEMAIL_USER}>`,
            to: usuario.email,
            subject: 'Bienvenido a Ferreteria',
            html: `
                <h2>¡Bienvenido ${usuario.nombre_completo}!</h2>
                <p>Su cuenta fue creada exitosamente.</p>
                <p>Ya puede iniciar sesion y comenzar a comprar.</p>
            `
        });
    }

    //Solicitud de recuperacion de contraseña
    async sendResetPasswordEmail(usuario, resetToken) {
        await transporter.sendMail({
            from: `"Ferreteria" <${process.env.NODEMAIL_USER}>`,
            to: usuario.email,
            subject: 'Recuperacion de contraseña',
            html: `
                <p>Solicito recuperar su contraseña.</p>
                <p>Ingrese al siguiente link para iniciar el proceso.</p>
                <h2>http://paginaenprogreso/reset-password?token=${resetToken}</h2>
                <p>Este codigo es de un solo uso y deja de ser valido en 15 minutos.</p>
            `
        });
    }

    //Cambio de contraseña exitoso
    async sendPasswordChangedEmail(usuario) {
        await transporter.sendMail({
            from: `"Ferreteria" <${process.env.NODEMAIL_USER}>`,
            to: usuario.email,
            subject: 'Contraseña restablecida',
            html: `
                <p>Su contraseña fue restablecida correctamente.</p>
                <p>Si no fue usted quien solicito el cambio, contactenos inmediatamente.</p>
            `
        });
    }
};

module.exports = new MailService();