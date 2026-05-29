export type Playbook = {
  id: string;
  perfil: string;
  descricao: string;
  icon: string;
  cor: string;
  gatilhos: string[];
  objecoes: { objecao: string; resposta: string }[];
  argumentos: { errado: string; certo: string; nota: string }[];
  palavrasProibidas: string[];
  palavrasPoderosas: string[];
  tomDeVoz: string;
  framesDeChamento: string[];
};

export const playbooks: Playbook[] = [
  {
    id: "investidor",
    perfil: "Investidor",
    descricao: "Foco em rentabilidade, proteção patrimonial e valorização de longo prazo.",
    icon: "TrendingUp",
    cor: "#C9974D",
    gatilhos: [
      "Proteção contra inflação e desvalorização cambial",
      "Ativo real com liquidez controlada",
      "Expansão limitada da região = valorização garantida",
      "Renda passiva + ganho de capital",
    ],
    objecoes: [
      {
        objecao: "O preço está muito alto.",
        resposta: "O valor reflete a escassez. Regiões com expansão limitada não repetem oportunidades — o custo de não comprar hoje é maior que o custo de comprar.",
      },
      {
        objecao: "Prefiro renda fixa, está rendendo bem.",
        resposta: "Renda fixa preserva poder de compra. Imóvel em região premium tende a superar o CDI na combinação renda + valorização, com a vantagem de ser um ativo tangível.",
      },
      {
        objecao: "Quero esperar o mercado cair.",
        resposta: "Em regiões de alta demanda e oferta limitada, o piso sobe. Quem esperou em Balneário Camboriú entre 2018 e 2022 perdeu 60% de valorização.",
      },
    ],
    argumentos: [
      {
        errado: "Esse imóvel valoriza muito.",
        certo: "Esse ativo tende a proteger patrimônio em regiões de expansão territorial limitada.",
        nota: "Muda de vendedor de metro quadrado para gestor de patrimônio.",
      },
      {
        errado: "O retorno de aluguel é bom.",
        certo: "A taxa de ocupação nesta região permite uma tese de renda passiva consistente com cap rate acima da média do mercado local.",
        nota: "Linguagem financeira cria credibilidade com investidor.",
      },
    ],
    palavrasProibidas: ["barato", "promoção", "desconto", "aproveite", "corre"],
    palavrasPoderosas: ["proteção patrimonial", "ativo real", "escassez", "cap rate", "longo prazo", "legado", "expansão limitada"],
    tomDeVoz: "Técnico e sereno. Fale como gestor de fundo, não como vendedor. Menos entusiasmo, mais dados. Silêncios são poderosos.",
    framesDeChamento: [
      "Com base no que você me disse sobre seus objetivos de longo prazo, esse ativo fecha a tese que faz sentido para o seu portfólio.",
      "A pergunta não é se você vai comprar — é quando. E o timing aqui é favorável.",
      "Posso preparar um sumário executivo do ativo para você avaliar com calma?",
    ],
  },
  {
    id: "casal",
    perfil: "Casal",
    descricao: "Decisão compartilhada. Equilíbrio entre sonho de vida e segurança familiar.",
    icon: "Heart",
    cor: "#A96B38",
    gatilhos: [
      "O lar ideal que os dois sempre imaginaram",
      "Espaço para crescer juntos e para a família",
      "Segurança e estabilidade para o futuro",
      "Memórias que vão durar gerações",
    ],
    objecoes: [
      {
        objecao: "Precisamos pensar melhor.",
        resposta: "Claro. O que falta para vocês se sentirem seguros nessa decisão? Às vezes o que parece 'pensar mais' é apenas uma dúvida específica que posso esclarecer agora.",
      },
      {
        objecao: "Ainda não chegamos a um acordo.",
        resposta: "Faz sentido. Posso conversar com vocês dois juntos? As melhores decisões de vida são tomadas em consenso — e eu quero que os dois saiam daqui felizes.",
      },
      {
        objecao: "Não sabemos se é o momento.",
        resposta: "O momento certo raramente aparece. O que aparece são janelas — e essa janela está aberta. Daqui a dois anos, o que vocês vão pensar sobre essa escolha?",
      },
    ],
    argumentos: [
      {
        errado: "Esse apartamento é lindo, vocês vão amar.",
        certo: "Esse espaço foi pensado para quem quer construir uma vida de qualidade — não apenas morar.",
        nota: "Venda a vida dentro do imóvel, não o imóvel em si.",
      },
      {
        errado: "Tem 3 quartos e 2 vagas.",
        certo: "Tem espaço para crescer — seja para filhos, para um home office, para receber família com conforto.",
        nota: "Traduza especificações em experiências reais de vida.",
      },
    ],
    palavrasProibidas: ["transação", "negócio", "custo", "metro quadrado", "planta"],
    palavrasPoderosas: ["lar", "construir juntos", "segurança", "família", "memória", "qualidade de vida", "crescer"],
    tomDeVoz: "Caloroso, presente e empático. Olhe para os dois. Perceba quem é o decisor emocional e quem é o racional — e adapte seu discurso para cada um simultaneamente.",
    framesDeChamento: [
      "Imaginem vocês dois daqui a cinco anos — como esse espaço vai fazer parte da história de vocês?",
      "Esse tipo de imóvel não fica disponível por muito tempo. Quando aparece uma oportunidade assim, vale avançar.",
      "Posso separar esse para vocês enquanto organizam os documentos?",
    ],
  },
  {
    id: "medico",
    perfil: "Médico",
    descricao: "Alta renda, pouco tempo. Busca segurança, status e ativo que 'trabalhe por ele'.",
    icon: "Shield",
    cor: "#C9974D",
    gatilhos: [
      "Patrimônio que cresce enquanto você trabalha",
      "Proteção contra instabilidade da economia",
      "Status compatível com sua conquista profissional",
      "Decisão inteligente, não emocional",
    ],
    objecoes: [
      {
        objecao: "Não tenho tempo para cuidar de imóvel.",
        resposta: "Exatamente por isso esse ativo faz sentido — a gestão é terceirizada. Você não cuida, você possui. É patrimônio passivo.",
      },
      {
        objecao: "Prefiro investir na minha clínica.",
        resposta: "Diversificação é o que diferencia quem constrói patrimônio de quem apenas acumula renda. Seu consultório é geração de renda. O imóvel é proteção patrimonial.",
      },
      {
        objecao: "Ainda estou analisando outras opções.",
        resposta: "Faz sentido comparar. Mas esse ativo específico tem características que raramente se repetem — quero garantir que você tenha a informação completa antes de decidir.",
      },
    ],
    argumentos: [
      {
        errado: "É uma ótima oportunidade de negócio.",
        certo: "É um ativo que complementa o perfil patrimonial de quem construiu uma carreira de alto desempenho.",
        nota: "Médico responde a espelhos do próprio sucesso.",
      },
      {
        errado: "Fica perto de tudo.",
        certo: "A localização combina com o perfil de quem valoriza tempo — tudo que importa a poucos minutos.",
        nota: "Valorize o tempo dele, não a conveniência genérica.",
      },
    ],
    palavrasProibidas: ["popular", "acessível", "custo-benefício", "bom preço", "todo mundo quer"],
    palavrasPoderosas: ["exclusivo", "patrimônio", "proteção", "inteligente", "passivo", "diversificação", "perfil"],
    tomDeVoz: "Objetivo e respeitoso. Médico não quer ser convencido — quer ser informado. Traga dados, seja preciso, não seja excessivamente simpático. Respeite o tempo dele.",
    framesDeChamento: [
      "Com base no seu perfil, esse ativo resolve exatamente o que falta na sua composição patrimonial.",
      "Posso te mandar um sumário executivo hoje para você avaliar no seu tempo?",
      "A decisão é sua. Só quero garantir que você tem tudo que precisa para tomá-la com clareza.",
    ],
  },
  {
    id: "empresario",
    perfil: "Empresário",
    descricao: "Pensa em ROI, alavancagem e proteção de capital. Compra com lógica, mas fecha com ego.",
    icon: "Briefcase",
    cor: "#C9974D",
    gatilhos: [
      "Ativo com potencial de alavancagem",
      "Proteção do patrimônio fora do CNPJ",
      "Status que comunica poder silencioso",
      "Decisão inteligente que poucos têm acesso",
    ],
    objecoes: [
      {
        objecao: "Meu dinheiro rende mais na empresa.",
        resposta: "Dentro da empresa, seu capital está exposto ao risco operacional. Imóvel premium fora do CNPJ é proteção patrimonial — não competição com o negócio.",
      },
      {
        objecao: "Não é o momento, o mercado está incerto.",
        resposta: "Empresário sabe que incerteza é onde se fazem os melhores movimentos. Em mercados de alta demanda, a janela de acesso fecha antes da certeza chegar.",
      },
      {
        objecao: "Preciso consultar meu sócio / contador.",
        resposta: "Claro. Posso preparar uma análise financeira estruturada para facilitar essa conversa? Às vezes o que falta é a informação certa na mesa.",
      },
    ],
    argumentos: [
      {
        errado: "Esse imóvel tem ótima localização.",
        certo: "Esse ativo está em uma região com fundamentos sólidos de demanda e oferta restrita — exatamente o que compõe uma tese de valorização consistente.",
        nota: "Empresário respeita raciocínio estruturado.",
      },
      {
        errado: "É um investimento seguro.",
        certo: "É um movimento de proteção patrimonial que funciona de forma complementar ao que você já construiu.",
        nota: "Não concorra com o negócio dele — complemente.",
      },
    ],
    palavrasProibidas: ["barato", "promoção", "oportunidade única", "não perca", "urgente"],
    palavrasPoderosas: ["ROI", "alavancagem", "proteção", "fundamentos", "tese", "portfólio", "exclusivo", "capital"],
    tomDeVoz: "Direto, estruturado e sem rodeios. Empresário detecta enrolação em segundos. Vá ao ponto, traga números, respeite a inteligência dele. Deixe espaço para ele parecer o decisor.",
    framesDeChamento: [
      "Olhando para o seu perfil patrimonial, esse ativo fecha uma lacuna importante.",
      "Qual é o próximo passo que faz sentido pra você — uma análise financeira detalhada ou já avançamos para a proposta?",
      "Poucas pessoas têm acesso a esse tipo de ativo. Quero garantir que você esteja entre elas.",
    ],
  },
  {
    id: "aposentadoria",
    perfil: "Aposentadoria / 55+",
    descricao: "Busca segurança, tranquilidade e renda passiva. Decisão emocional com validação racional.",
    icon: "Sunset",
    cor: "#A96B38",
    gatilhos: [
      "Segurança financeira para o resto da vida",
      "Lugar perfeito para viver com qualidade",
      "Renda passiva sem preocupação",
      "Presente para os filhos e netos",
    ],
    objecoes: [
      {
        objecao: "Já tenho imóveis, não preciso de mais.",
        resposta: "Não é sobre ter mais — é sobre ter o certo. Um ativo em região premium pode gerar renda e ainda se valorizar, protegendo o que você construiu ao longo da vida.",
      },
      {
        objecao: "Não quero me endividar nessa fase.",
        resposta: "Entendo completamente. Nesse caso, podemos estruturar uma forma de aquisição que não comprometa seu fluxo — ou até avaliar permuta com algum ativo atual.",
      },
      {
        objecao: "Meus filhos acham que não preciso disso.",
        resposta: "Com respeito: essa é a sua decisão. E o que você está avaliando aqui é deixar um legado ou ter qualidade de vida — as duas coisas que só você pode decidir.",
      },
    ],
    argumentos: [
      {
        errado: "É um ótimo investimento para o futuro.",
        certo: "É o tipo de patrimônio que cuida de você — e que vai continuar cuidando de quem você ama.",
        nota: "Conecte ao legado e ao cuidado, não apenas à rentabilidade.",
      },
      {
        errado: "Vai valorizar muito.",
        certo: "Esse imóvel foi pensado para quem chegou em um momento da vida onde qualidade não é opcional — é o padrão.",
        nota: "Honre a jornada dele. Não subestime o que ele conquistou.",
      },
    ],
    palavrasProibidas: ["risco", "longo prazo", "especulação", "aposta", "dívida"],
    palavrasPoderosas: ["segurança", "tranquilidade", "legado", "família", "qualidade", "patrimônio", "cuidar", "merecido"],
    tomDeVoz: "Calmo, respeitoso e presente. Fale devagar. Escute muito. Nunca pressione. Mostre que você está do lado dele — não tentando vender algo.",
    framesDeChamento: [
      "Você passou a vida construindo. Esse imóvel é a expressão do que você merece agora.",
      "Posso te mostrar como outras famílias com perfil parecido estruturaram essa decisão?",
      "Não precisa decidir hoje — mas quero que você saia daqui com todas as informações.",
    ],
  },
  {
    id: "familia",
    perfil: "Família com Filhos",
    descricao: "Prioriza segurança, espaço e qualidade de vida. Decisão emocional com aprovação do cônjuge.",
    icon: "Users",
    cor: "#A96B38",
    gatilhos: [
      "O lugar onde os filhos vão crescer",
      "Segurança e tranquilidade para toda a família",
      "Espaço que acompanha cada fase da vida",
      "Bairro e vizinhança compatíveis com o estilo de vida",
    ],
    objecoes: [
      {
        objecao: "Estamos esperando os filhos crescerem.",
        resposta: "Faz sentido. Mas eles crescem aqui — e o imóvel certo acompanha cada fase: quarto de bebê, espaço de estudo, área de lazer para adolescente.",
      },
      {
        objecao: "Precisamos de escola boa por perto.",
        resposta: "Entendo. Posso te mostrar o mapa completo de infraestrutura da região — escolas, hospital, lazer. É exatamente esse contexto que justifica o valor do ativo.",
      },
      {
        objecao: "Achamos o espaço pequeno.",
        resposta: "Projeto bem planejado entrega mais funcionalidade que metragem bruta. Posso te mostrar como as famílias que já moram aqui organizaram o espaço?",
      },
    ],
    argumentos: [
      {
        errado: "Tem 120m² e 3 quartos.",
        certo: "É um espaço pensado para cada membro da família ter o seu — sem abrir mão de viver juntos.",
        nota: "Espaço vira experiência familiar.",
      },
      {
        errado: "A região é segura.",
        certo: "É o tipo de endereço que dá tranquilidade — você sai de casa sabendo que sua família está protegida.",
        nota: "Segurança é sentimento, não dado estatístico.",
      },
    ],
    palavrasProibidas: ["metro quadrado", "planta", "especificação", "contrato", "tabela"],
    palavrasPoderosas: ["família", "crescer", "seguro", "escola", "vizinhança", "vida boa", "espaço", "lar"],
    tomDeVoz: "Acolhedor e concreto. Mostre cenas reais de vida naquele espaço. Faça-os imaginar o café da manhã, o aniversário, o primeiro dia de escola. Quanto mais vívido, mais real.",
    framesDeChamento: [
      "Imagina seus filhos crescendo aqui — que tipo de memória esse lugar vai criar para a sua família?",
      "Esse é o tipo de lugar que faz toda a família dizer: foi a melhor decisão que tomamos.",
      "Posso agendar uma visita com toda a família para sentirem o espaço juntos?",
    ],
  },
  {
    id: "airbnb",
    perfil: "Airbnb / Renda de Curto Prazo",
    descricao: "Foco em retorno rápido, ocupação alta e gestão simplificada.",
    icon: "Home",
    cor: "#C9974D",
    gatilhos: [
      "Renda passiva mensal desde o primeiro mês",
      "Alta taxa de ocupação em região turística",
      "Ativo que paga a si mesmo",
      "Gestão terceirizada sem trabalho",
    ],
    objecoes: [
      {
        objecao: "E se a ocupação for baixa?",
        resposta: "Regiões como Balneário Camboriú e Porto Belo têm demanda turística o ano todo — não apenas no verão. Posso mostrar dados de ocupação média da região?",
      },
      {
        objecao: "É muito trabalho gerenciar.",
        resposta: "Existe um mercado consolidado de gestoras de Airbnb que cuidam de tudo — check-in, limpeza, precificação dinâmica. Você só recebe o repasse.",
      },
      {
        objecao: "Prefiro aluguel tradicional, mais seguro.",
        resposta: "Aluguel tradicional traz previsibilidade. Airbnb em região premium pode gerar 2 a 3x mais por m² no mesmo período. A escolha depende do perfil de retorno que você quer.",
      },
    ],
    argumentos: [
      {
        errado: "Vai render bem no aluguel.",
        certo: "Com gestão profissional, esse ativo pode gerar retorno mensal superior ao aluguel tradicional, com flexibilidade de uso próprio nas datas que quiser.",
        nota: "Combine retorno financeiro com benefício pessoal.",
      },
      {
        errado: "A diária aqui é alta.",
        certo: "A precificação dinâmica nessa região permite capturar picos de demanda — feriados, temporada, eventos. O retorno anual supera o modelo fixo.",
        nota: "Torne o mecanismo de precificação um diferencial.",
      },
    ],
    palavrasProibidas: ["barato", "lotado", "temporada fraca", "risco de inadimplência"],
    palavrasPoderosas: ["ocupação", "retorno", "passivo", "gestão profissional", "temporada", "diária", "precificação dinâmica"],
    tomDeVoz: "Prático e orientado a números. Esse cliente quer saber quanto entra por mês. Seja objetivo, traga dados reais, mostre o fluxo financeiro. Evite romantismo.",
    framesDeChamento: [
      "Com base na ocupação média da região, o retorno projetado cobre o financiamento e ainda gera caixa positivo.",
      "Posso te colocar em contato com uma gestora de referência para você ter uma visão real da operação?",
      "Esse é o tipo de ativo que trabalha por você — enquanto você faz outra coisa.",
    ],
  },
  {
    id: "status",
    perfil: "Comprador de Status",
    descricao: "Compra identidade, pertencimento e símbolo de conquista. O imóvel é extensão do ego.",
    icon: "Crown",
    cor: "#C9974D",
    gatilhos: [
      "Endereço que comunica quem você é",
      "Acesso a um círculo exclusivo",
      "Símbolo do que você conquistou",
      "Poucos têm — você pode ter",
    ],
    objecoes: [
      {
        objecao: "Não sei se vale tanto.",
        resposta: "O valor não está nos metros quadrados — está no que esse endereço representa. Algumas coisas têm preço. Outras têm valor. Esse pertence à segunda categoria.",
      },
      {
        objecao: "Vou pensar.",
        resposta: "Claro. Só esteja ciente de que esse tipo de ativo não fica disponível por muito tempo. Quando pessoas com o seu perfil decidem, geralmente não encontram mais.",
      },
      {
        objecao: "Conheço imóveis parecidos mais baratos.",
        resposta: "Parecidos na planta, talvez. Diferentes no endereço, no padrão do condomínio e em quem mora. Esses detalhes não aparecem na tabela de preços.",
      },
    ],
    argumentos: [
      {
        errado: "É um apartamento de alto padrão.",
        certo: "É um dos endereços mais desejados da região — o tipo que comunica, sem dizer nada, exatamente quem você é.",
        nota: "O endereço é o argumento. A planta é detalhe.",
      },
      {
        errado: "Tem acabamento premium.",
        certo: "Cada detalhe foi pensado para quem não aceita menos do que o melhor — porque chegou até aqui sem aceitar.",
        nota: "Espelhe a conquista dele no imóvel.",
      },
    ],
    palavrasProibidas: ["popular", "todo mundo", "comum", "básico", "padrão"],
    palavrasPoderosas: ["exclusivo", "raro", "endereço", "pertencimento", "poucos", "seleto", "conquista", "silencioso"],
    tomDeVoz: "Contido, elegante e seguro. Nunca mostre ansiedade para fechar. Quanto mais escasso parecer, mais valioso. Menos entusiasmo, mais autoridade. Você não está vendendo — está oferecendo acesso.",
    framesDeChamento: [
      "Esse não é para qualquer pessoa. É para quem chegou em um nível onde o endereço importa tanto quanto a planta.",
      "Tenho outros interessados, mas achei que fazia sentido você ter a primeira opção.",
      "Quando quiser avançar, é só me falar. Vou garantir que você tenha prioridade.",
    ],
  },
];
