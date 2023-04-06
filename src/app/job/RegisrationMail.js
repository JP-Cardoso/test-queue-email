import Mail from '../lib/mail';

export default {
    key: 'RegistrationMail',
    async handle({ data }) {
        const { user } = data

        await Mail.sendMail({
            from: 'Queue Test <queue@testequeue.com.br>',
            to: `${user.name} <${user.email}>`,
            subject: 'Cadastro de usuário',
            html: `Olá, ${user.name}, isso aqui é um teste`
        });
    },
}