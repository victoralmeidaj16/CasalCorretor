export type ContentType =
  | "showcase-imovel"
  | "imovel-semana"
  | "carousel-bairro"
  | "infografico-mercado"
  | "depoimento-cliente"
  | "calculadora-visual"
  | "quiz-perfil"
  | "mapa-bairros"
  | "vendido"
  | "hashtags"
  | "autoridade-pessoal"
  | "anuncio-premium";

export interface GeneratedContent {
  content: string;
  suggestions: string[];
}

export const CONTENT_MOCKS: Record<ContentType, GeneratedContent> = {
  "showcase-imovel": {
    content: `📍 SLIDE 1 — HOOK
"Alguns imóveis existem. Outros são uma declaração de estilo de vida."
[Imagem: fachada do imóvel ao entardecer]

🏛️ SLIDE 2 — O ESPAÇO
Living amplo com pé-direito duplo, revestimento em mármore Travertino e janelas do piso ao teto com vista para o mar.
4 suítes | 280m² | 3 vagas

💎 SLIDE 3 — OS DETALHES
Cozinha gourmet Siemens. Closet planejado. Varanda com churrasqueira integrada e hidromassagem. Automação residencial completa.

📊 SLIDE 4 — O INVESTIMENTO
Avaliação de mercado: R$ 8.500.000
Valorização projetada: +12% ao ano na região
Disponibilidade: apenas 2 unidades

📲 SLIDE 5 — CTA
Agende sua visita privativa.
Conteúdo exclusivo para compradores qualificados.
Link na bio → formulário de interesse`,
    suggestions: [
      "Adicione vídeo do tour virtual no stories logo após publicar o carousel",
      "Use hashtags: #imoveldealtopadrao #luxorealestate #balneariocamboriu",
      "Marque o perfil da construtora para aumentar alcance orgânico",
      "Publique entre 19h–21h para maior engajamento no seu nicho",
      "Fixe o carousel no topo do perfil por 7 dias enquanto o imóvel estiver disponível",
    ],
  },

  "imovel-semana": {
    content: `✨ IMÓVEL DA SEMANA

Residencial Vista Mar Infinito
Balneário Camboriú · 4 suítes · 320m²

Esta semana, apresentamos uma obra de arquitetura contemporânea com vista panorâmica irrepreensível para o oceano Atlântico.

O que torna este imóvel único:
→ Único andar disponível com vista 270° para o mar
→ Terraço privativo de 80m²
→ Acabamentos importados da Itália
→ Portaria 24h com segurança biométrica

💰 Valor: R$ 8.500.000
📍 Localização: Av. Atlântica, Balneário Camboriú

⏳ Oportunidade limitada. Entre em contato hoje.

#ImóvelDaSemana #BalneárioCamboriú #AltoPatrimônio`,
    suggestions: [
      "Publique toda segunda-feira para criar expectativa semanal nos seguidores",
      "Adicione um story 'votação' pedindo opinião sobre o imóvel para engajar",
      "Crie um destaque 'Imóvel da Semana' no perfil com todos os posts anteriores",
    ],
  },

  "carousel-bairro": {
    content: `🏙️ SLIDE 1 — TÍTULO
Por que morar em Jurerê Internacional?
[O bairro mais desejado de Florianópolis]

🛍️ SLIDE 2 — AMENIDADES
A 5 minutos de tudo que importa:
• Shopping Iguatemi Florianópolis
• Restaurantes premiados: Ostradamus, Cachaçaria Nacional
• Academia, spa e centros de bem-estar premium
• Farmácias, clínicas e pediatras na mesma quadra

🔒 SLIDE 3 — SEGURANÇA & QUALIDADE DE VIDA
Índice de segurança entre os mais altos da cidade.
Ruas arborizadas, calçadas bem iluminadas.
Comunidade consolidada com moradores de perfil similar.

🚗 SLIDE 4 — MOBILIDADE
• 15 min do aeroporto internacional
• Acesso direto às principais rodovias
• Rota de ciclismo à beira-mar
• Aplicativos de transporte sempre disponíveis

📈 SLIDE 5 — VALORIZAÇÃO
Valorização média dos últimos 5 anos: +14% ao ano
Demanda crescente de compradores nacionais e internacionais
Escassez de terrenos = apreciação garantida

📲 SLIDE 6 — CTA
Conheça os imóveis disponíveis em Jurerê.
Link na bio.`,
    suggestions: [
      "Crie uma série: 'Por que morar em [Bairro]' para cada bairro que você atua",
      "Marque perfis de restaurantes e serviços locais mencionados no carousel",
      "Adicione dados reais de valorização do FIPE ZAP para credibilidade",
    ],
  },

  "infografico-mercado": {
    content: `📊 ATUALIZAÇÃO DE MERCADO — MAIO 2025

Balneário Camboriú · Índices do Mês

SELIC: 10,50% ao ano
→ Ainda favorável para financiamento imobiliário
→ Parcelas acessíveis para imóveis até R$ 1,5M

INCC (Custo da Construção): +0,62% em abril
→ Preços de imóveis na planta tendem a subir nos próximos 6 meses
→ Melhor comprar agora do que esperar

VALORIZAÇÃO LOCAL: +11,3% nos últimos 12 meses
→ Acima da Selic real
→ Acima da poupança
→ Acima do CDI

📌 O QUE ISSO SIGNIFICA PARA VOCÊ?
Se você tem R$ 500.000 parados em renda fixa rendendo CDI (10,5%), em 1 ano você tem R$ 552.500.
Com um imóvel em BC valorizado 11,3%, o mesmo capital vira R$ 556.500 — e você ainda tem um ativo real, tangível e financiável.

💡 Fale comigo e entenda como o momento é favorável para comprar.`,
    suggestions: [
      "Atualize este infográfico mensalmente — consistência constrói autoridade",
      "Use o Canva ou Stories para criar uma versão visual dos dados",
      "Salve como destaque 'Mercado' no seu perfil para novos seguidores encontrarem",
    ],
  },

  "depoimento-cliente": {
    content: `❤️ SLIDE 1 — TÍTULO
"Pensei que nunca conseguiria. Hoje, tenho as chaves na mão."
— Ana e Pedro, Florianópolis

😰 SLIDE 2 — O PROBLEMA
Ana e Pedro moravam de aluguel há 8 anos.
Todo mês: R$ 3.200 que sumiam.
Tentaram 3 vezes sozinhos. Sempre alguma barreira.
Estavam desacreditando.

🤝 SLIDE 3 — O ENCONTRO
Quando me procuraram, a primeira coisa que fiz foi ouvir.
Entendi a realidade deles, o budget real, as prioridades.
Não mostrei o imóvel mais caro. Mostrei o imóvel certo.

🏠 SLIDE 4 — A CONQUISTA
Em 47 dias, eles assinaram.
Apartamento de 3 quartos, 2 vagas, condomínio com área de lazer.
Financiamento aprovado com entrada do FGTS.
Parcela: R$ 2.800 — menos que o aluguel anterior.

✨ SLIDE 5 — A TRANSFORMAÇÃO
"Agora toda manhã acordo sabendo que estou pagando por algo que é meu."
— Ana, 34 anos, professora

Você também pode estar neste próximo slide.
Me chame no direct. Vamos conversar.`,
    suggestions: [
      "Sempre peça permissão ao cliente antes de publicar o depoimento",
      "Use foto real do cliente (com autorização) para aumentar credibilidade",
      "Crie um destaque 'Histórias de Sucesso' e salve todos os depoimentos lá",
    ],
  },

  "calculadora-visual": {
    content: `💰 IMÓVEL OU RENDA FIXA?
Simulação: R$ 500.000 por 10 anos

📈 CENÁRIO 1: Poupança
Rendimento: ~6% ao ano
Resultado em 10 anos: R$ 895.000
Você ainda não tem o imóvel.

📈 CENÁRIO 2: CDI (100%)
Rendimento: ~10,5% ao ano
Resultado em 10 anos: R$ 1.358.000
Você ainda não tem o imóvel.

🏠 CENÁRIO 3: Imóvel em BC
Valorização histórica: +11% ao ano
Valor em 10 anos: R$ 1.418.000
MAIS: você morou, alugou ou usou como ativo real.
MAIS: proteção contra inflação.
MAIS: financiamento disponível (comprou com R$ 150K de entrada).

🏆 RESULTADO
Em 10 anos, o imóvel supera a renda fixa E ainda gera renda ou moradia.

Quer uma simulação personalizada com o seu capital?
Me chame no direct.`,
    suggestions: [
      "Use dados reais da Selic e FIPE ZAP para personalizar a simulação",
      "Crie versões para diferentes valores: R$ 200K, R$ 500K, R$ 1M",
      "Adicione o Simulador de Patrimônio do seu site no link da bio",
    ],
  },

  "quiz-perfil": {
    content: `🧭 SLIDE 1 — TÍTULO
Qual tipo de comprador você é?
Descubra em 5 perguntas qual imóvel combina com você.

❓ SLIDE 2 — PERGUNTA 1
O que mais importa na sua compra?
A) Retorno financeiro e valorização
B) Segurança e conforto para a família
C) Status e localização exclusiva
D) Renda de aluguel imediata

❓ SLIDE 3 — PERGUNTA 2
Qual é o seu horizonte de investimento?
A) Quero resultados em 2-3 anos
B) Estou pensando a longo prazo (10+ anos)
C) Quero algo pra usar agora
D) Mistura dos dois

❓ SLIDE 4 — PERGUNTAS 3, 4 e 5
3. Você prefere imóvel na planta ou pronto?
4. Qual região te interessa mais?
5. Você tem FGTS disponível?

💡 SLIDE 5 — RESULTADO
Salve este carousel e me mande uma mensagem com suas respostas.
Vou te indicar os 3 imóveis do nosso portfólio que mais combinam com o seu perfil — gratuitamente.

📲 Direct ou link na bio.`,
    suggestions: [
      "Use a caixa de perguntas do Instagram Stories para fazer o quiz de forma interativa",
      "Crie um PDF com os resultados para enviar por WhatsApp aos leads",
      "Publique o quiz no início do mês para capturar novos leads",
    ],
  },

  "mapa-bairros": {
    content: `🗺️ MAPA DE VALORIZAÇÃO — BALNEÁRIO CAMBORIÚ 2025

🟢 ALTA VALORIZAÇÃO (+12% ao ano)
• Centro (Av. Brasil) — alta demanda, escassez de terrenos
• Barra Sul — vista mar, infraestrutura completa
• Pioneiros — urbanização consolidada, perfil familiar premium

🟡 VALORIZAÇÃO MODERADA (+8% ao ano)
• Nações — crescimento acelerado, boa infraestrutura
• Municípios — acessível, próximo ao centro
• Tabuleiro — expansão residencial em curso

🔴 VALORIZAÇÃO EM MATURAÇÃO (+5% ao ano)
• Estaleiro — potencial futuro, ainda em desenvolvimento
• Barra Norte — requer infraestrutura adicional

📌 COMO LER ESTE MAPA:
Verde = comprar agora, antes de nova valorização
Amarelo = bom custo-benefício, crescimento sustentado
Vermelho = especulação, maior prazo para retorno

Quer entender qual bairro é ideal para o SEU objetivo?
Me chame. Análise gratuita do seu perfil de comprador.`,
    suggestions: [
      "Atualize o mapa a cada 6 meses com dados reais do mercado",
      "Crie versões para cada cidade que você atua",
      "Use cores reais em um infográfico visual no Canva para maior impacto",
    ],
  },

  vendido: {
    content: `🔑 VENDIDO!

Residencial Vista Mar Infinito — Balneário Camboriú

Em 47 dias, encontrei o comprador certo para o imóvel certo.

Esse apartamento carregava uma história especial: 4 suítes, vista panorâmica para o Atlântico, e um proprietário que confiou em mim desde o primeiro dia para fazer a negociação com a discrição e o cuidado que um imóvel assim merece.

O resultado? Uma transação realizada dentro do valor de mercado, com todas as partes satisfeitas e a chave entregue com aquela emoção única que só quem trabalha com imóveis conhece. 🏠✨

Para quem está pensando em colocar seu imóvel à venda:
→ Preciso ter apenas os compradores certos vendo o seu imóvel
→ Faço a curadoria de interessados antes de qualquer visita
→ Negociação com sigilo, estratégia e resultado

Me chame no direct. Vamos conversar sobre o seu imóvel.

#Vendido #CorretorDeImóveis #BalneárioCamboriú #AltoPatrimônio #ImóveisBC #NegociaçãoImobiliária #VendaDeImóveis`,
    suggestions: [
      "Publique nas primeiras 24h após o fechamento enquanto a emoção é real",
      "Peça permissão ao cliente para marcá-lo na foto da entrega das chaves",
      "Faça um Reels de 15s com a entrega das chaves — alto engajamento garantido",
      "Salve em destaque 'Vendidos' para novos seguidores verem seu histórico",
    ],
  },

  hashtags: {
    content: `#BalneárioCamboriú #BC #BCImóveis #ImóveisBC #ApartamentosBC #LuxoBC #BCLuxury #BalneárioCamboriúSC #VidaBeiraMar #AltoPadrãoBC #ImóvelDeLuxo #AltoPatrimônio #CorretorDeImóveis #MercadoImobiliário #InvestimentoImobiliário #ImóveisLuxo #RealEstateBrasil #VendaDeImóveis #CompraDeImóveis #ImóveisAltoPatrimônio #ImóvelDoMês #LançamentoImobiliário #ImóvelExclusivo #OportunidadeÚnica #VistaParaOMar #ImóvelNaPlanta #EntregaImediata #ImóvelPremium #SonhoRealizado #PatrimônioImobiliário`,
    suggestions: [
      "Use entre 20-30 hashtags por post — mais não é melhor, relevância importa mais",
      "Alterne os conjuntos de hashtags a cada 3-4 posts para não ser penalizado pelo algoritmo",
      "Teste hashtags de nicho (<100K posts) — a concorrência é menor e o alcance proporcional é maior",
      "Salve 3-4 conjuntos diferentes no bloco de notas do celular para alternar rapidamente",
    ],
  },

  "autoridade-pessoal": {
    content: "Anexe sua foto e selecione um cenário para gerar uma imagem profissional com o Gemini.",
    suggestions: [
      "Use fotos com boa iluminação frontal e fundo neutro para melhores resultados",
      "Publique imagens de autoridade 1-2x por semana para construir presença digital",
      "Alterne entre cenários: frente ao imóvel, escritório, entrega de chaves",
      "Adicione uma legenda de valor ao post — compartilhe um aprendizado ou insight do mercado",
      "Stories com bastidor da geração da imagem geram engajamento extra",
    ],
  },

  "anuncio-premium": {
    content: `💎 ANÚNCIO PREMIUM - LANÇAMENTO EXCLUSIVO

A excelência construtiva encontra o design de ponta. Apresentamos uma obra-prima de arquitetura contemporânea assinada pela AB INVEST.

Uma composição simétrica e minimalista de concreto branco, painéis de madeira calorosos e esquadrias metálicas escuras. Fachada com imponentes janelas de vidro do piso ao teto, capturando a luz natural do amanhecer ao pôr do sol.

Destaques da Residência:
• Projeto arquitetônico ultra-moderno
• Balcões elegantes e design de teto flutuante
• Paisagismo contemporâneo integrado
• Acabamento de altíssimo luxo

Preço sob consulta para clientes qualificados.

Fale conosco agora:
📞 +91-8088 900 660 (ou clique no link da bio)
🌐 Acesse www.abinvest.com para a ficha técnica completa.`,
    suggestions: [
      "Use este anúncio como criativo de topo de funil em campanhas de tráfego pago no Instagram",
      "Foque em públicos de interesse como: 'Investimento imobiliário', 'Arquitetura moderna', 'Bens de luxo'",
      "Se incluiu sua foto de corretor, posicione-se no direct como o consultor responsável pelo atendimento desse portfólio de luxo",
      "Publique nos melhores horários de engajamento do seu público empresarial (ex: 12h ou após 18h)",
      "Adicione uma chamada nos Stories com o link direto para o WhatsApp do corretor"
    ]
  },
};
