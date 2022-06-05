import fs from 'fs';
import http from 'http';

// Adicionar texto no arquivo.txt se não existir o mesmo é criado "arquivo.txt"
async function adicionarTexto() {
    const novo_texto = await fs.promises.appendFile('./arquivo.txt', 'Decio Santana de Aguiar\n', 'utf-8');
    return;
}

// Ler arquivo.txt
async function lerArquivo() {
    const texto = await fs.promises.readFile('./arquivo.txt', 'utf-8');
    return texto;
}

//  Criar servidor local na porta 8080
const servidor = http.createServer(async (req, res) => {
    const { url, method } = req;

        switch (method) {
        case 'GET':
            res.write('Busca com sucesso \n\n')
            res.end(await lerArquivo());
            break;

        case 'POST':
            res.write('Adicionado com sucesso \n\n')
            res.end(await adicionarTexto());
            break;

        default:
            res.writeHead(404);
            return res.end('Erro de requisição');
            break;
    }
}).listen(8080, ()=>{
    console.log(`Servidor ativo na porta: http://localhost:8080`);
});

