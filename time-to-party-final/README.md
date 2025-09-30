# Time to Party - Website

Este é o website oficial da **Time to Party - Eventos e Decoração**, uma empresa especializada na organização e produção de festas de aniversário personalizadas.

## 📁 Estrutura do Projeto

```
time-to-party-final/
├── index.html          # Página principal do website
├── styles.css          # Estilos CSS do website
├── script.js           # JavaScript para interatividade
├── README.md           # Este arquivo de instruções
└── images/             # Pasta com todas as imagens
    ├── timetoparty_logo.jpg
    ├── cenario1.jpg
    ├── cenario2.jpg
    ├── cenario3.jpg
    ├── cenario4.jpg
    └── cenario5.jpg
```

## 🚀 Como Executar o Website

### Opção 1: Abrir Diretamente no Navegador
1. Navegue até a pasta `time-to-party-final`
2. Faça duplo clique no arquivo `index.html`
3. O website abrirá automaticamente no seu navegador padrão

### Opção 2: Usando um Servidor Local (Recomendado)
Para uma melhor experiência e funcionalidades completas:

#### Com Python (se instalado):
```bash
# Navegue até a pasta do projeto
cd time-to-party-final

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Depois acesse: `http://localhost:8000`

#### Com Node.js (se instalado):
```bash
# Instale o http-server globalmente
npm install -g http-server

# Navegue até a pasta do projeto
cd time-to-party-final

# Execute o servidor
http-server

# Ou especifique uma porta
http-server -p 8000
```

#### Com PHP (se instalado):
```bash
# Navegue até a pasta do projeto
cd time-to-party-final

# Execute o servidor PHP
php -S localhost:8000
```

## 🌟 Características do Website

### Design e Estilo
- **Tema de Cores**: Bordeaux (#722f37) como cor principal
- **Tipografia**: Inter para texto e Playfair Display para títulos
- **Layout**: Moderno, responsivo e profissional
- **Logo**: Integrado no cabeçalho e como marca d'água sutil

### Seções Principais
1. **Início (Hero)** - Apresentação da empresa com call-to-actions
2. **Sobre** - Missão da empresa e estatísticas
3. **Serviços** - Pacotes "Festa em Casa" e "Premium"
4. **Galeria** - Fotos reais dos cenários da empresa
5. **Extras** - Serviços adicionais organizados em tabs
6. **Contacto** - Formulário e informações de contacto

### Funcionalidades Interativas
- **Navegação Suave**: Scroll suave entre seções
- **Menu Mobile**: Hamburger menu responsivo
- **Tabs Dinâmicos**: Na seção de extras
- **Formulário de Contacto**: Com validação
- **Animações**: Elementos aparecem ao fazer scroll
- **Galeria Interativa**: Hover effects nas imagens
- **Contadores Animados**: Nas estatísticas

## 📱 Responsividade

O website é totalmente responsivo e funciona perfeitamente em:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (até 767px)

## 🎨 Personalização

### Alterar Cores
As cores principais estão definidas no início do arquivo `styles.css`:
```css
:root {
    --accent-color: #722f37;        /* Cor principal (Bordeaux) */
    --accent-light: #a64d57;        /* Bordeaux claro */
    --text-primary: #2c2c2c;        /* Texto principal */
    --background-primary: #ffffff;   /* Fundo principal */
}
```

### Alterar Conteúdo
- **Textos**: Edite diretamente no arquivo `index.html`
- **Imagens**: Substitua os arquivos na pasta `images/`
- **Informações de Contacto**: Atualize na seção de contacto

### Alterar Imagens
Para substituir as imagens:
1. Mantenha os mesmos nomes de arquivo
2. Use formatos JPG ou PNG
3. Recomenda-se resolução mínima de 800x600px para as imagens da galeria

## 📞 Informações de Contacto Incluídas

- **Email**: timetoparty.pt@gmail.com
- **Instagram**: @timetoparty.pt
- **WhatsApp**: 919 252 000

## 🔧 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com Flexbox e Grid
- **JavaScript ES6+**: Interatividade e animações
- **Font Awesome**: Ícones
- **Google Fonts**: Tipografia (Inter + Playfair Display)

## 📋 Compatibilidade

### Navegadores Suportados
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Funcionalidades Modernas
- CSS Grid e Flexbox
- CSS Custom Properties (variáveis)
- Intersection Observer API
- ES6+ JavaScript

## 🚨 Notas Importantes

1. **Imagens**: Todas as imagens estão incluídas na pasta `images/`
2. **Paths Relativos**: O website usa caminhos relativos, funcionando em qualquer computador
3. **Sem Dependências Externas**: Exceto Google Fonts e Font Awesome (CDN)
4. **Formulário**: O formulário é apenas demonstrativo - não envia emails reais

## 📝 Para Desenvolvedores

### Estrutura do CSS
- Reset e variáveis CSS no início
- Componentes organizados por seção
- Media queries para responsividade no final

### Estrutura do JavaScript
- Event listeners organizados por funcionalidade
- Animações usando Intersection Observer
- Debouncing para otimização de performance

## 🎉 Pronto para Usar!

O website está completo e pronto para ser usado. Todos os arquivos necessários estão incluídos e as imagens da empresa estão integradas. Basta abrir o `index.html` no navegador para ver o resultado final!

---

**Time to Party - Eventos e Decoração**  
*Tornamos os seus momentos de festa inesquecíveis*
