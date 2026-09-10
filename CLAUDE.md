# Contexto do projeto: portfólio patrickamaral.com.br

## Quem sou
Patrick Amaral, Product Designer sênior, 17 anos de experiência em design
digital. Base em Uberlândia MG. Trabalhei no PagBank de 2021 a 2026, hoje em
busca de recolocação em vagas de UX/UI e Product Design, preferencialmente
remotas.

Tenho fluência em HTML, CSS e JS e domínio avançado de Figma. Pode ser técnico
comigo, não precisa explicar conceito básico. Prefiro entender a decisão a
receber código pronto sem contexto. Estou usando este projeto também para
estudar Git, GitHub e GitHub Pages na prática, então explique o raciocínio
por trás dos comandos e da configuração.

## O que é o projeto
Portfólio pessoal construído sobre o template Astrofy (Astro + TailwindCSS +
DaisyUI), publicado no GitHub Pages, no domínio próprio patrickamaral.com.br
(domínio apex).

Público do site: hiring manager de produto, recrutador tech e head de design.

## Estado atual
Etapa 1 (deploy) e etapa 2 (arquitetura de conteúdo) concluídas. Primeiro dos
três cases reais já publicado, em /trabalhos/redesign-checklist-auditoria-varejo.
Etapa 3 (identidade visual) só teve ajustes pontuais até agora: tema mudou de
dark pra light, avatar do sidebar ficou redondo, crédito ao template Astrofy
foi removido do rodapé. O trabalho completo de tipografia, escala de
espaçamento, paleta e layout ainda não começou.

Pendências fora do roadmap numerado: /sobre e a bio da home ainda são
conteúdo placeholder, e não existe CTA de contato (e-mail/LinkedIn) definido
ainda.

Configurações já feitas:
- astro.config.mjs com site apontando para https://patrickamaral.com.br e base
  na raiz, sem prefixo de repositório
- public/CNAME com o domínio, para sobreviver a cada build
- workflow do GitHub Actions fazendo build e deploy no Pages, com Node fixado
  em 22 (Astro 7 exige >=22.12.0, o padrão do withastro/action é Node 20)
- GitHub Pages com origem definida como GitHub Actions e custom domain
  configurado
- DNS com os registros A do GitHub Pages no apex
- metadados globais atualizados com meus dados

## Roadmap
1. Deploy e infraestrutura: CONCLUÍDO
2. Arquitetura de conteúdo: CONCLUÍDO (collections, schemas, componentes MDX,
   páginas de /trabalhos e /sobre)
3. Identidade visual: EM ABERTO (tipografia, escala de espaçamento, paleta,
   layout). Só tema light/avatar redondo/remoção do crédito do template
   foram feitos até agora, a pedido pontual, fora de ordem
4. Conteúdo real: EM ANDAMENTO (1 de 3 cases publicado)

Trabalhamos uma etapa por vez. Não antecipe etapa seguinte sem eu pedir.

## Decisões já tomadas
- Cases e blog são collections separadas, com schemas diferentes. Case não é
  post de blog.
- O case tem duas camadas de leitura: um resumo estruturado (problema, minha
  atuação, resultado) no topo, que também alimenta o card no índice, e o texto
  longo depois.
- Confidencialidade é requisito de schema, não exceção. Trabalhei cinco anos em
  fintech e parte do material é sensível. O schema precisa suportar case
  confidencial, métricas relativas no lugar de absolutas e case privado
  acessível só por link direto.
- O schema separa o que EU fiz do que o time fez.
- Alt text é campo obrigatório para publicar (tecnicamente opcional no tipo
  Zod, mas o build quebra se um case com status: published não tiver alt em
  cover/thumbnail).
- Serão três cases, no máximo quatro. Curadoria por força do case, não por
  data. Os 2 cases fictícios usados pra validar a estrutura foram removidos
  do repo assim que o primeiro case real ficou pronto.
- O visual padrão do Astrofy tem cara de site de desenvolvedor e será
  substituído na etapa 3. Não é para ser mantido.

## Como trabalhar comigo
- Commits pequenos e descritivos, um por etapa lógica.
- Quando houver mais de um caminho razoável, pergunte em vez de escolher.
- Nunca invente conteúdo sobre minha carreira, projetos, empresas ou métricas.
  Placeholder tem que ser obviamente placeholder.
- Não altere identidade visual fora da etapa 3, a menos que eu peça um ajuste
  pontual específico.
- Acessibilidade desde o início: hierarquia de heading correta, foco visível,
  contraste adequado.
- Nunca use travessão nos textos que você escrever.
