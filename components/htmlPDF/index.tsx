interface InducingResponse {
    user: any;
    dataInicio: string;
    dataFim: string;
    emocaoEscolha: string;
    emocaoDominate: string;
    idInducion: number;
    allDetectedEmotions: string[];
    detailsInducing: { video: number; emotionsDominates: string[] }[];
  }
  
  interface HTMLPDFProps {
    title: string;
    data: InducingResponse[];
    barGraphBase64?: string;
    pieGraphBase64?: string;
    comparisonGraphBase64?: string;
  }

  export const htmlPDF = ({ title, data, barGraphBase64, pieGraphBase64, comparisonGraphBase64 }: HTMLPDFProps) => {
    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <style>
          /* Estilos para o PDF */
          body { font-family: Helvetica, sans-serif;   backgroundColor: '#DCDCDC' }
          h1 { text-align: center; }
          .graph-container { margin-bottom: 20px; }
          .graph-container img { max-width: 100%; height: auto; }
          /* ... outros estilos ... */
        </style>
      </head>
      <body>
        <h1>${title}</h1>
  
        ${barGraphBase64 ? `
          <div class="graph-container">
            <h2>Gráfico de Frequência de Emoções</h2>
            <img src="${barGraphBase64}" style="width:400px; max-width:500px;" />
          </div>
        ` : ''}
  
        ${pieGraphBase64 ? `
          <div class="graph-container">
            <h2>Variação de Humores</h2>
            <img src="${pieGraphBase64}" style="width:400px; max-width:500px;" />
          </div>
        ` : ''}
  
        ${comparisonGraphBase64 ? `
          <div class="graph-container">
            <h2>Comparação de Predições</h2>
            <img src="${comparisonGraphBase64}" style="width:400px; max-width:500px;" />
          </div>
        ` : ''}
  
        <table>
          <thead>
            <tr>
              <th>Data Início</th>
              <th>Emoção Escolhida</th>
              <th>Emoção Dominante</th>
              <th>Emoções Detectadas</th>
            </tr>
          </thead>
          <tbody>
            ${data.map(item => `
              <tr>
                <td>${item.dataInicio}</td>
                <td>${item.emocaoEscolha}</td>
                <td>${item.emocaoDominate}</td>
                <td>${item.allDetectedEmotions.join(', ')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;
    return htmlContent;
  };


