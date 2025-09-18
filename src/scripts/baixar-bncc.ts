import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

async function baixarBNCC() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const url = 'https://basenacionalcomum.mec.gov.br/images/BNCC_EI_EF_110518_versaofinal_site.pdf'; // PDF oficial da BNCC
  const caminhoArquivo = path.resolve(__dirname, '../../bncc.pdf');

  const response = await axios.get(url, { responseType: 'stream' });

  const writer = fs.createWriteStream(caminhoArquivo);
  response.data.pipe(writer);

  writer.on('finish', () => {
    console.log('✅ PDF da BNCC baixado com sucesso!');
  });

  writer.on('error', (err) => {
    console.error('❌ Erro ao baixar o PDF:', err);
  });
}

baixarBNCC();