export function templateStringParaJSON(str: string) {
  // Expressão regular para capturar as variáveis dentro de {{ }}
  const regex = /{{(.*?)}}/g;
  const resultado = [];
  let match;

  // Itera sobre todos os matches
  while ((match = regex.exec(str)) !== null) {
    const variavel = match[1].trim(); // pega o nome da variável
    resultado.push({ [variavel]: `{{${variavel}}}` });
  }

  return resultado;
}
