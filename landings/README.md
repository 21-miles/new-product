# Next Boilerplate com TypeScript, Stripe e ShadCN UI

Este é um boilerplate para projetos Next.js com TypeScript, Stripe e ShadCN UI, preparado para desenvolvimento rápido de aplicações web modernas. Abaixo, listamos alguns dos principais pacotes usados para aprimorar a funcionalidade e a experiência do usuário.

## Principais Pacotes

### 1. **@fontsource**

- Este projeto utiliza a biblioteca `@fontsource` para importar e gerenciar fontes personalizadas como **Work Sans**, **Bangers** e **Rammetto One**. Essa biblioteca facilita a integração de fontes diretamente no projeto, sem necessidade de links externos. Além disso, possibilita a aplicação de fontes com estilos variados para diferentes seções da aplicação.

### 2. **@stripe/react-stripe-js e @stripe/stripe-js**

- Estes pacotes são usados para integrar o sistema de pagamento Stripe, permitindo gerenciar pagamentos de forma segura e eficiente. O `@stripe/react-stripe-js` fornece componentes React para o Stripe, enquanto o `@stripe/stripe-js` lida com a integração da API, simplificando o processo de configuração de pagamentos.

### 3. **@radix-ui/react-accordion e outros componentes Radix UI**

- O Radix UI é uma biblioteca de componentes acessíveis e personalizáveis. Neste projeto, utilizamos componentes como o `Accordion`, `Dialog` e `Popover`, fornecendo uma base consistente para criação de interfaces modernas e acessíveis. Os componentes Radix UI são modulares e focados em acessibilidade, o que melhora a experiência do usuário.

### 4. **tailwindcss e tailwindcss-animate**

- Tailwind CSS é utilizado como framework de estilos, permitindo uma estilização eficiente e rápida. Combinado com `tailwindcss-animate`, possibilita a criação de animações suaves e customizáveis para uma interface mais dinâmica e envolvente.

## Configuração Inicial

Para começar, extraia o conteúdo do arquivo ZIP e configure seu repositório Git:

1. Abra o terminal na pasta do projeto.
2. Inicie um repositório Git local:

   ```
   git init
   ```

3. Adicione todos os arquivos e faça o primeiro commit:

   ```
   git add .
   git commit -m "Initial commit"
   ```

4. Crie um repositório no GitHub e conecte-o ao seu projeto:

   ```
   git remote add origin https://github.com/seu-usuario/seu-repositorio.git
   git branch -M master
   git push -u origin master
   ```

## Rodando o Projeto Localmente

Para iniciar o servidor de desenvolvimento:

```
npm i && npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver o projeto em ação.

## Estrutura do Projeto

Você pode começar a editar o conteúdo da página principal modificando `app/page.tsx`. Todas as alterações serão refletidas automaticamente no navegador.

## Saiba Mais

Para aprender mais sobre Next.js e seus recursos:

- [Documentação do Next.js](https://nextjs.org/docs)
- [GitHub do Next.js](https://github.com/vercel/next.js)

Feedback e contribuições são sempre bem-vindos!

---

# Passos para Deploy no Netlify

1. Acesse o [site da Netlify](https://www.netlify.com/) e faça login ou crie uma conta.
2. Clique em "New site" e selecione "Import an existing project".
3. Conecte-se ao GitHub e selecione o repositório criado anteriormente.
4. Remova todas as configurações e deixe a configuração manual. Com isso, a inicialização será responsabilidade do arquivo `netlify.toml`, que se encontra na raiz do projeto.

5. Clique em "Deploy site".

Após o deploy, o Netlify fornecerá uma URL para o seu projeto. Você poderá customizar o nome do site nas configurações de domínio.

---

Pronto! Agora seu projeto está configurado com Git e Netlify. Você pode continuar o desenvolvimento e fazer deploys automáticos com cada commit no GitHub.
