import type { Task } from '@/domain/entities/Task'

export function newTaskTemplate(name: string, task: Task) {
  return `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; background-color: #f4f4f4; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
        <div style="background-color: #28a745; color: #ffffff; padding: 20px; text-align: center;">
            <h2 style="margin: 0;">Nova Tarefa Criada</h2>
        </div>
        <div style="padding: 20px 30px; line-height: 1.6; color: #333333;">
            <p>Olá <strong>${name}</strong>,</p>
            <p>Uma nova tarefa foi criada em sua conta no MyTasksApp. Aqui estão os detalhes:</p>
            <ul style="list-style-type: none; padding: 0;">
                <li style="margin-bottom: 10px;"><strong>Título:</strong> ${task.title}</li>
                <li style="margin-bottom: 10px;"><strong>Descrição:</strong> ${task.description || 'Sem descrição'}</li>
                <li style="margin-bottom: 10px;"><strong>Data de Vencimento:</strong> ${task.dueDate.toLocaleDateString('pt-BR')}</li>
            </ul>
            <p>Você pode acessar e gerenciar a tarefa através do nosso aplicativo.</p>
            <p>Atenciosamente,<br>Equipe MyTasksApp</p>
        </div>
        <div style="background-color: #f0f0f0; color: #777777; text-align: center; padding: 15px; font-size: 0.9em; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0;">Este é um e-mail automático. Por favor, não responda.</p>
        </div>
    </div>
</div>`
}
