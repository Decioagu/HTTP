import fs from 'fs';
import http from 'http';

// Criar arquivo.txt
async function lerArquivo() {
    const texto = await fs.promises.readFile('./arquivo.txt', 'utf-8');
    return texto;
}

// Adicionar texto no 
async function adicionarTexto(texto_novo) {
    await fs.promises.appendFile('./arquivo.txt', '\n' + texto_novo, 'utf-8');
    return;
}

//  Criar servidor local na porta 8080
const servidor = http.createServer(async (req, res) => {
    const { url, method } = req;

        switch (method) {
        case 'GET':
            res.write('Busca com sucesso')
            res.end(await lerArquivo());
            break;

        case 'POST':
            res.write('Adicionado com sucesso')
            res.end(await adicionarTexto());
            break;

        default:
            res.writeHead(404);
            return res.end('Erro de requisição');
    }
}).listen(8080, ()=>{
    console.log(`Servidor ativo na porta: http://localhost:8080`);
});

