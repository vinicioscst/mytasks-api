export function welcomeTemplate(name: string) {
  return `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; background-color: #f4f4f4; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
        <div style="background-color: #007bff; color: #ffffff; padding: 20px; text-align: center;">
            <h2 style="margin: 0;">Bem-vindo(a) ao MyTasksApp!</h2>
        </div>
        <div style="padding: 20px 30px; line-height: 1.6; color: #333333;">
            <p>Olá <strong>${name}</strong>,</p>
            <p>Estamos muito felizes em tê-lo(a) conosco no MyTasksApp!</p>
            <p>Aqui estão algumas dicas para você começar:</p>
            <ul style="list-style-type: disc; padding-left: 20px;">
                <li style="margin-bottom: 10px;">Crie suas primeiras tarefas e organize seu dia.</li>
                <li style="margin-bottom: 10px;">Explore nossas funcionalidades para gerenciar suas tarefas de forma eficiente.</li>
            </ul>
            <p>Se precisar de qualquer ajuda, não hesite em entrar em contato conosco.</p>
            <p>Bem-vindo(a) a bordo!</p>
            <p>Atenciosamente,<br>Equipe MyTasksApp</p>
        </div>
        <div style="background-color: #f0f0f0; color: #777777; text-align: center; padding: 15px; font-size: 0.9em; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0;">Este é um e-mail automático. Por favor, não responda.</p>
        </div>
    </div>
</div>`
}
