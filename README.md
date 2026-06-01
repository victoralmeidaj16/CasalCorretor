# Casal Corretor — AB Invest Group

Este é o repositório do projeto **Casal Corretor**, desenvolvido para a **AB Invest Group**.

## Guia de Configuração das Variáveis de Ambiente

Para que a plataforma funcione corretamente (especialmente as integrações de simulação e geração de conteúdo/imagens com IA), você precisa configurar o arquivo das variáveis de ambiente.

### Localização do Arquivo `.env.local`

O arquivo `.env.local` **deve estar localizado na pasta raiz do projeto**:
```
/Users/victoralmeidaj16/Downloads/Casal Corretor - Projeto/.env.local
```

> [!IMPORTANT]
> O arquivo `.env.local` está listado no `.gitignore`. Isso significa que ele **nunca** será enviado para o repositório público do GitHub, mantendo as suas chaves de API totalmente seguras e privadas.

---

### Como Configurar

1. Na raiz do projeto, crie um arquivo chamado `.env.local`.
2. Adicione as seguintes variáveis a ele (utilizando as suas chaves reais):

```env
# Chave de API da OpenAI (utilizada na simulação de rota)
OPENAI_API_KEY=sua_chave_openai_aqui

# Chave de API da Google AI / Gemini (utilizada para geração de imagens e textos)
GOOGLE_AI_API_KEY=sua_chave_google_ai_aqui

# Modelos recomendados (opcional - a aplicação possui valores padrão)
GEMINI_MODEL=gemini-2.5-flash
GEMINI_IMAGE_MODEL=gemini-3-pro-image-preview
```

Você pode usar o arquivo [.env.example](file:///Users/victoralmeidaj16/Downloads/Casal%20Corretor%20-%20Projeto/.env.example) como base para a criação do seu arquivo local.

---

## Executando o Projeto Localmente

1. **Instalar Dependências**:
   ```bash
   npm install
   ```

2. **Iniciar Servidor de Desenvolvimento**:
   ```bash
   npm run dev
   ```

3. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.
