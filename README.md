# Sistema de Reservas de Salas

![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white)
![ASP.NET](https://img.shields.io/badge/ASP.NET-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![Entity Framework](https://img.shields.io/badge/Entity%20Framework-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

Aplicação web para gerenciar reservas de salas de reunião

## Estrutura do repositório

**Back-End**

```
desafio-reservas/
├── Controllers/
│ └── ReservaController.cs
├── Data/
│ ├── Map/
│ │ └── ReservaMap.cs
│ └── ReservasDbContext.cs
├── DTOs/
│ ├── CriarReservaDto.cs
│ └── ReservaDto.cs
├── Migrations/
├── Models/
│ ├── Reserva.cs
│ └── Sala.cs
├── Services/
│ └── ReservaService.cs
├── appsettings.json
└── Program.cs
```

**Front-End**

```
frontend/
└── src/
├── assets/
├── components/
│ ├── card-reserva/
│ │ └── CardReserva.jsx
│ ├── menu-lateral/
│ │ └── MenuLateral.jsx
│ ├── modal-confirmacao/
│ │ └── ModalConfirmacao.jsx
│ ├── paginacao/
│ │ └── paginacao.jsx
│ └── reserva-form/
│ └── ReservaForm.jsx
├── pages/
│ ├── criar-reservas/
│ │ └── CriarReservas.jsx
│ └── listar-reservas/
│ └── ExibirReservas.jsx
├── routes/
│ └── AppRoutes.jsx
├── services/
│ └── reservas-services/
│ └── reservaApi.js
├── App.jsx
├── index.css
└── main.jsx
```

## Pré-requisitos

- [Git](https://git-scm.com/)
- [.NET SDK 8](https://dotnet.microsoft.com/download)
- [Node.js 20+](https://nodejs.org/)
- Ferramenta `dotnet-ef`

A ferramenta `dotnet-ef` é usada para aplicar as migrations do Entity Framework, caso ainda não tenha rode no terminal após instalar o .NET SDK 8 o seguinte comando:

```
dotnet tool install --global dotnet-ef
```

Não é necessário instalar nenhum banco de dados separado o projeto usa
SQLite, que roda como um arquivo local, criado automaticamente ao aplicar
as migrations.

## Como rodar o projeto

Todo o processo abaixo é feito via terminal — não é necessário abrir o
projeto em nenhuma IDE específica.

### 1. Clonar o repositório

```bash
git clone https://github.com/miltonjss/app-reservas.git
cd app-reservas
```

### 2. Back-end

Entre na pasta do projeto:

```bash
cd backend/desafio-reservas
```

Aplique as migrations — isso cria o arquivo `reservas.db` já com as
tabelas e as três salas cadastradas via seed:

```bash
dotnet ef database update
```

Execute a API:

```bash
dotnet run
```

A API sobe em `https://localhost:7003` (porta definida em
`Properties/launchSettings.json`). Caso essa porta já esteja em uso na
sua máquina, o .NET informará no terminal a porta real utilizada — nesse
caso, será necessário ajustar uma configuração para manter tudo
funcionando.

**Sobre o CORS:** o back-end está configurado para aceitar requisições
vindas especificamente de `http://localhost:5173` (a porta padrão do
front-end). Essa política está definida em `Program.cs`.
Se a porta do front-end mudar por qualquer motivo, essa configuração
precisa ser atualizada, ou as chamadas da aplicação React para a API
serão bloqueadas pelo navegador.

Para ajustar, edite a URL dentro do `WithOrigins` em `Program.cs`:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // <- altere aqui
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
```

### 3. Front-end

Com o back-end já em execução, abra um novo terminal e rode os comandos:

```bash
cd frontend
npm install
npm run dev
```

A aplicação abre em `http://localhost:5173` (porta padrão do Vite).

**Dependência entre front-end e back-end:** o endereço da API está fixo
no arquivo `src/services/reservas-services/reservaApi.js`
(`https://localhost:7003/api/Reserva`). Se a porta do back-end for
diferente da padrão na sua máquina, esse arquivo precisa ser atualizado
para apontar para a porta correta — do contrário, a aplicação não
conseguirá se comunicar com a API.

## Endpoints da API

| Método | Rota                | Descrição                                    |
| ------ | ------------------- | -------------------------------------------- |
| GET    | `/api/Reserva`      | Lista reservas ativas, ordenadas por horário |
| POST   | `/api/Reserva`      | Cria uma nova reserva                        |
| DELETE | `/api/Reserva/{id}` | Cancela uma reserva                          |

### Regras de validação (aplicadas no back-end)

- Sala, título, horário de início e fim são obrigatórios
- O horário de fim precisa ser posterior ao horário de início
- Duas reservas na mesma sala não podem se sobrepor no tempo
- A sala informada precisa existir no banco

## Salas disponíveis

As salas são fixas, criadas via seed no banco de dados ao aplicar as
migrations: Sala Azul, Sala Verde e Sala Amarela.

## Cancelamento de reservas

A reserva não é removida do banco, apenas marcada com a propriedade `Cancelada = true`.

Pensando no contexto real, manter o
histórico de reservas canceladas permite análises futuras — por exemplo,
identificar se uma sala específica tem um número desproporcional de
cancelamentos, o que poderia indicar um problema de estrutura, ou
simplesmente um padrão de imprevistos. Remover o registro permanentemente
descartaria essa possibilidade de análise.

A validação de sobreposição de horários e a listagem de reservas ambas
ignoram reservas já canceladas, então uma reserva cancelada libera
aquele horário/sala para novas reservas.
