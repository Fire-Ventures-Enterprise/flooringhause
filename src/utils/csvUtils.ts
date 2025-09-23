interface ProductData {
  id?: string;
  sku: string;
  name: string;
  category: string;
  subcategory?: string;
  description: string;
  price: number;
  salePrice?: number;
  imageUrl?: string;
  inStock: boolean;
  brand?: string;
  material?: string;
  color?: string;
  size?: string;
  features?: string;
}

export const parseCsvFile = (file: File): Promise<ProductData[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim());
        
        if (lines.length < 2) {
          reject(new Error('CSV file is empty or has no data rows'));
          return;
        }
        
        // Parse headers
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        
        // Validate required headers
        const requiredHeaders = ['sku', 'name', 'category', 'price'];
        const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
        
        if (missingHeaders.length > 0) {
          reject(new Error(`Missing required columns: ${missingHeaders.join(', ')}`));
          return;
        }
        
        // Parse data rows
        const products: ProductData[] = [];
        
        for (let i = 1; i < lines.length; i++) {
          const values = parseCsvLine(lines[i]);
          
          if (values.length !== headers.length) {
            console.warn(`Row ${i + 1} has incorrect number of columns, skipping`);
            continue;
          }
          
          const product: any = {};
          
          headers.forEach((header, index) => {
            const value = values[index].trim();
            
            switch(header) {
              case 'price':
              case 'saleprice':
              case 'sale_price':
                product[header === 'saleprice' || header === 'sale_price' ? 'salePrice' : header] = 
                  value ? parseFloat(value.replace(/[^0-9.-]/g, '')) : 0;
                break;
              case 'instock':
              case 'in_stock':
                product.inStock = value.toLowerCase() === 'true' || value === '1' || value.toLowerCase() === 'yes';
                break;
              case 'imageurl':
              case 'image_url':
              case 'image':
                product.imageUrl = value || undefined;
                break;
              case 'subcategory':
              case 'sub_category':
                product.subcategory = value || undefined;
                break;
              default:
                product[header] = value || undefined;
            }
          });
          
          // Set defaults for missing optional fields
          if (!('inStock' in product)) {
            product.inStock = true;
          }
          
          // Validate required fields
          if (!product.sku || !product.name || !product.category || isNaN(product.price)) {
            console.warn(`Row ${i + 1} missing required data, skipping`);
            continue;
          }
          
          products.push(product as ProductData);
        }
        
        if (products.length === 0) {
          reject(new Error('No valid products found in CSV'));
          return;
        }
        
        resolve(products);
      } catch (error) {
        reject(new Error(`Failed to parse CSV: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsText(file);
  });
};

// Parse a single CSV line handling quoted values
const parseCsvLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++; // Skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current);
  return result;
};

export const downloadCsvTemplate = () => {
  const headers = [
    'SKU',
    'Name',
    'Category',
    'Subcategory',
    'Description',
    'Price',
    'Sale_Price',
    'Image_URL',
    'In_Stock',
    'Brand',
    'Material',
    'Color',
    'Size',
    'Features'
  ];
  
  const sampleData = [
    [
      'VIN-001',
      'Luxury Vinyl Plank - Oak Natural',
      'SPC Vinyl Planks',
      'Wood Look',
      'Premium waterproof SPC vinyl plank with realistic oak texture',
      '45.99',
      '',
      '',
      'true',
      'TruSa Premium',
      'SPC Core',
      'Natural Oak',
      '7" x 48"',
      'Waterproof, Scratch Resistant, 20mil Wear Layer'
    ],
    [
      'LAM-002',
      'High Gloss Laminate - Maple',
      'Laminate Flooring',
      'High Gloss',
      'Beautiful high gloss maple laminate with AC4 rating',
      '32.99',
      '28.99',
      '',
      'true',
      'TruSa Select',
      'HDF Core',
      'Maple',
      '8" x 50"',
      'AC4 Rating, Click Lock, 12mm Thickness'
    ],
    [
      'TIL-003',
      'Porcelain Tile - Marble Look',
      'Porcelain Tiles',
      'Marble Look',
      'Large format porcelain tile with realistic marble veining',
      '78.50',
      '',
      '',
      'true',
      'TruSa Elite',
      'Porcelain',
      'Carrara White',
      '24" x 48"',
      'Rectified Edges, Slip Resistant, Indoor/Outdoor'
    ]
  ];
  
  let csvContent = headers.join(',') + '\n';
  sampleData.forEach(row => {
    csvContent += row.map(cell => {
      // Escape quotes and wrap in quotes if contains comma
      if (cell.includes(',') || cell.includes('"')) {
        return `"${cell.replace(/"/g, '""')}"`;
      }
      return cell;
    }).join(',') + '\n';
  });
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'product_import_template.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const exportProductsToCsv = (products: ProductData[]) => {
  const headers = [
    'SKU',
    'Name',
    'Category',
    'Subcategory',
    'Description',
    'Price',
    'Sale_Price',
    'Image_URL',
    'In_Stock',
    'Brand',
    'Material',
    'Color',
    'Size',
    'Features'
  ];
  
  let csvContent = headers.join(',') + '\n';
  
  products.forEach(product => {
    const row = [
      product.sku,
      product.name,
      product.category,
      product.subcategory || '',
      product.description || '',
      product.price.toString(),
      product.salePrice?.toString() || '',
      product.imageUrl || '',
      product.inStock.toString(),
      product.brand || '',
      product.material || '',
      product.color || '',
      product.size || '',
      product.features || ''
    ];
    
    csvContent += row.map(cell => {
      const cellStr = String(cell);
      if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
        return `"${cellStr.replace(/"/g, '""')}"`;
      }
      return cellStr;
    }).join(',') + '\n';
  });
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `products_export_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};