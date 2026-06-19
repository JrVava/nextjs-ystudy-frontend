const fs = require('fs');

const html = fs.readFileSync('c:/Users/Lokesh/Desktop/YStudy/HTML_WEBSITE/index.html', 'utf8');

const headerMatch = html.match(/<header[\s\S]*?<\/header>/i);
// For the search modal, looking for ystudy-search-modal
const searchModalMatch = html.match(/<div aria-hidden="true" class="ystudy-search-modal" id="ystudySearchModal">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i) || html.match(/<div[^>]*ystudy-search-modal[^>]*>[\s\S]*?<\/div>\s*<\/div>/i);
const footerMatch = html.match(/<footer[\s\S]*?<\/footer>/i);

function toJsx(str) {
  if (!str) return '';
  return str
    .replace(/class=/g, 'className=')
    .replace(/for=/g, 'htmlFor=')
    .replace(/<!--[\s\S]*?-->/g, '')
    // fix self-closing tags
    .replace(/<img([^>]*[^\/])>/g, '<img$1 />')
    .replace(/<input([^>]*[^\/])>/g, '<input$1 />')
    .replace(/<br([^>]*[^\/])>/g, '<br$1 />')
    .replace(/<hr([^>]*[^\/])>/g, '<hr$1 />')
    // style attributes need object format
    .replace(/style="([^"]*)"/g, (match, p1) => {
      const parts = p1.split(';').filter(Boolean);
      const styleObj = {};
      parts.forEach(p => {
        const [k, v] = p.split(':');
        if (k && v) {
          const camelK = k.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
          styleObj[camelK] = v.trim();
        }
      });
      return 'style={' + JSON.stringify(styleObj) + '}';
    });
}

let headerJsx = toJsx(headerMatch ? headerMatch[0] : '');
if (searchModalMatch) {
  headerJsx += '\n\n' + toJsx(searchModalMatch[0]);
}

const footerJsx = toJsx(footerMatch ? footerMatch[0] : '');

const headerTsx = `export default function Header() {
  return (
    <>
      ${headerJsx}
    </>
  );
}
`;

const footerTsx = `export default function Footer() {
  return (
    <>
      ${footerJsx}
    </>
  );
}
`;

fs.writeFileSync('c:/Users/Lokesh/Desktop/YStudy/YStudy_WEBSITE/ystudy/src/components/layout/Header.tsx', headerTsx);
fs.writeFileSync('c:/Users/Lokesh/Desktop/YStudy/YStudy_WEBSITE/ystudy/src/components/layout/Footer.tsx', footerTsx);
console.log('Successfully updated Header.tsx and Footer.tsx');
