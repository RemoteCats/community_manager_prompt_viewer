interface Prompt {
  id: number;
  platform: string;
  category: string;
  tone: string;
  situation: string;
  prompt: string;
}

export function exportToCSV(prompts: Prompt[], filename: string = 'prompts.csv') {
  const headers = ['ID', 'Platform', 'Category', 'Tone', 'Situation', 'Prompt'];
  const rows = prompts.map((p) => [
    p.id,
    p.platform,
    p.category,
    p.tone,
    p.situation,
    `"${p.prompt.replace(/"/g, '""')}"`, // Escape quotes in CSV
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToPDF(prompts: Prompt[], filename: string = 'prompts.pdf') {
  // Create HTML content for PDF
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>AI Community Manager OS - Saved Prompts</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #1a1a1a;
          background: #fafaf8;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 900px;
          margin: 0 auto;
          background: white;
          padding: 40px;
          border-radius: 4px;
        }
        .header {
          border-bottom: 2px solid #1a1a1a;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          color: #1a1a1a;
        }
        .header p {
          margin: 5px 0 0 0;
          color: #666666;
          font-size: 14px;
        }
        .metadata {
          background: #f5f5f5;
          padding: 15px;
          border-radius: 4px;
          margin-bottom: 30px;
          font-size: 12px;
          color: #666666;
        }
        .prompt-item {
          margin-bottom: 25px;
          page-break-inside: avoid;
          border-left: 3px solid #1a1a1a;
          padding-left: 15px;
        }
        .prompt-id {
          font-size: 11px;
          color: #999999;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .prompt-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 10px;
        }
        .tag {
          display: inline-block;
          background: #f0f0f0;
          padding: 4px 8px;
          border-radius: 3px;
          font-size: 11px;
          font-weight: bold;
          color: #1a1a1a;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .prompt-text {
          background: #fafaf8;
          padding: 12px;
          border-radius: 3px;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          line-height: 1.5;
          color: #333333;
          border: 1px solid #e0e0e0;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e0e0e0;
          font-size: 11px;
          color: #999999;
          text-align: center;
        }
        @media print {
          body { background: white; }
          .container { box-shadow: none; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>AI Community Manager OS</h1>
          <p>Saved Prompts Collection</p>
        </div>
        
        <div class="metadata">
          <strong>Total Prompts:</strong> ${prompts.length} | 
          <strong>Generated:</strong> ${new Date().toLocaleString()} | 
          <strong>Made by:</strong> Spark Collective
        </div>

        <div class="prompts">
          ${prompts
            .map(
              (p) => `
            <div class="prompt-item">
              <div class="prompt-id">Prompt #${p.id}</div>
              <div class="prompt-tags">
                <span class="tag">${p.platform}</span>
                <span class="tag">${p.category}</span>
                <span class="tag">${p.tone}</span>
                <span class="tag">${p.situation}</span>
              </div>
              <div class="prompt-text">${p.prompt}</div>
            </div>
          `
            )
            .join('')}
        </div>

        <div class="footer">
          <p>© 2026 Spark Collective. All rights reserved.</p>
          <p>This document contains AI-ready prompts for community management.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Use print API to generate PDF
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    
    // Delay print to ensure content is loaded
    setTimeout(() => {
      printWindow.print();
      // Close after printing (user can cancel)
      setTimeout(() => printWindow.close(), 1000);
    }, 250);
  }
}

export function exportCollectionToJSON(
  collectionName: string,
  prompts: Prompt[],
  filename?: string
) {
  const data = {
    collection: collectionName,
    exportDate: new Date().toISOString(),
    promptCount: prompts.length,
    madeBy: 'Spark Collective',
    prompts,
  };

  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename || `${collectionName.replace(/\s+/g, '_')}.json`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
