import fs from 'fs';
import pdfParse from 'pdf-parse';

interface HabilidadeExtraida {
  codigo: string;
  descricao: string;
}

export async function extrairHabilidadesBNCC(pdfPath: string): Promise<HabilidadeExtraida[]> {
  const buffer = fs.readFileSync(pdfPath);
  const data = await pdfParse(buffer);

  const texto = data.text;
  const linhas = texto.split('\n');

  const habilidades: HabilidadeExtraida[] = [];

  const regex = /(EF\d{2}[A-Z]{2}\d{2})\s*[-–—]?\s*(.+)/;

  for (const linha of linhas) {
    const match = linha.match(regex);
    if (match) {
      habilidades.push({
        codigo: match[1].trim(),
        descricao: match[2].trim(),
      });
    }
  }

  console.log(`✅ ${habilidades.length} habilidades extraídas`);
  return habilidades;
}