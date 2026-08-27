// Medication Search API Service (Combines OpenFDA Live API + ANVISA Brazilian Medicines Catalog)

const ANVISA_COMMON_MEDS = [
  { name: 'Losartana Potássica', dosage: '50mg', frequency: '1x ao dia', category: 'Anti-hipertensivo' },
  { name: 'Metformina Cloridrato (Glifage)', dosage: '850mg', frequency: '2x ao dia', category: 'Antidiabético' },
  { name: 'Atorvastatina Cálcica', dosage: '20mg', frequency: '1x ao dia', category: 'Estatina / Colesterol' },
  { name: 'Omeprazol', dosage: '20mg', frequency: '1x ao dia (jejum)', category: 'Protetor Gástrico' },
  { name: 'Dipirona Sódica (Novalgina)', dosage: '500mg', frequency: 'Se necessário', category: 'Analgésico / Antitérmico' },
  { name: 'Paracetamol (Tylenol)', dosage: '750mg', frequency: 'Se necessário', category: 'Analgésico' },
  { name: 'Amoxicilina (Clavulin)', dosage: '500mg', frequency: '3x ao dia (de 8/8h)', category: 'Antibiótico' },
  { name: 'Enalapril Maleato', dosage: '10mg', frequency: '1x ao dia', category: 'Anti-hipertensivo' },
  { name: 'Hidroclorotiazida', dosage: '25mg', frequency: '1x ao dia', category: 'Diurético' },
  { name: 'Simvastatina', dosage: '20mg', frequency: '1x ao dia (noite)', category: 'Colesterol' },
  { name: 'Azitromicina', dosage: '500mg', frequency: '1x ao dia', category: 'Antibiótico' },
  { name: 'Ibuprofeno (Alivium)', dosage: '600mg', frequency: 'Se necessário', category: 'Anti-inflamatório' },
  { name: 'Clonazepam (Rivotril)', dosage: '0.5mg', frequency: 'Uso contínuo noturno', category: 'Ansiolítico' },
  { name: 'Levotiroxina Sódica (Puran T4)', dosage: '50mcg', frequency: '1x ao dia (jejum)', category: 'Tireóide' },
  { name: 'Dorflex', dosage: '300mg', frequency: 'Se necessário', category: 'Relaxante Muscular' },
  { name: 'Buscopan Composto', dosage: '10mg/250mg', frequency: 'Se necessário', category: 'Antiespasmódico' }
];

export const searchMedicationsAPI = async (query) => {
  if (!query || query.trim().length < 2) return [];

  const normalizedQuery = query.toLowerCase().trim();

  // 1. Search local Brazilian ANVISA dictionary
  const localMatches = ANVISA_COMMON_MEDS.filter((m) =>
    m.name.toLowerCase().includes(normalizedQuery) ||
    m.category.toLowerCase().includes(normalizedQuery)
  );

  // 2. Fetch live from OpenFDA Drug Database API
  let fdaMatches = [];
  try {
    const response = await fetch(
      `https://api.fda.gov/drug/ndc.json?search=brand_name:"${encodeURIComponent(query)}"*+generic_name:"${encodeURIComponent(query)}"*&limit=5`
    );
    if (response.ok) {
      const data = await response.json();
      if (data.results) {
        fdaMatches = data.results.map((item) => {
          const strength = item.active_ingredients?.[0]?.strength || '10mg';
          return {
            name: item.brand_name || item.generic_name,
            dosage: strength.split('/')[0] || '50mg',
            frequency: '1x ao dia',
            category: item.dosage_form || 'Comprimido (OpenFDA API)',
            source: 'OpenFDA Global API'
          };
        });
      }
    }
  } catch (err) {
    console.warn('OpenFDA API query notice:', err);
  }

  // Combine results with local matches first
  const combined = [...localMatches, ...fdaMatches];

  // Remove duplicates by name
  const unique = Array.from(new Map(combined.map((item) => [item.name.toLowerCase(), item])).values());
  return unique.slice(0, 8);
};
