import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Upload, 
  Download, 
  FileSpreadsheet, 
  AlertCircle, 
  CheckCircle, 
  Package,
  Edit,
  Trash2,
  Save,
  X,
  Plus
} from "lucide-react";
import { parseCSV, generateCSVTemplate, exportToCSV } from "@/utils/csvUtils";

interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  vendor: string;
  productType: string;
  tags: string;
  published: boolean;
  variantSKU: string;
  variantPrice: number;
  variantComparePrice?: number;
  variantInventoryQty: number;
  variantInventoryPolicy: string;
  variantWeight?: number;
  variantWeightUnit?: string;
  imageUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  status: 'active' | 'draft';
  category?: string;
  material?: string;
  size?: string;
  color?: string;
  finish?: string;
  thickness?: string;
  warranty?: string;
  installation?: string;
}

export function BulkProductImport() {
  const [products, setProducts] = useState<Product[]>([]);
  const [importStatus, setImportStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});
  const [importProgress, setImportProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample products for flooring
  const sampleProducts: Product[] = [
    {
      id: 'prod-001',
      handle: 'luxury-vinyl-oak-heritage',
      title: 'Luxury Vinyl Plank - Oak Heritage',
      description: 'Waterproof luxury vinyl plank with realistic oak wood texture. Perfect for high-traffic areas.',
      vendor: 'Premium Floors Co',
      productType: 'Luxury Vinyl Plank',
      tags: 'waterproof,oak,lvp,residential,commercial',
      published: true,
      variantSKU: 'LVP-OAK-001',
      variantPrice: 4.99,
      variantComparePrice: 6.99,
      variantInventoryQty: 5000,
      variantInventoryPolicy: 'continue',
      variantWeight: 2.5,
      variantWeightUnit: 'lb',
      imageUrl: '/placeholder.svg',
      seoTitle: 'Oak Heritage Luxury Vinyl Plank Flooring',
      seoDescription: 'Premium waterproof oak LVP flooring. Best price guaranteed.',
      status: 'active',
      category: 'Luxury Vinyl',
      material: 'Vinyl Composite',
      size: '7" x 48"',
      color: 'Natural Oak',
      finish: 'Matte',
      thickness: '8mm',
      warranty: '25 years',
      installation: 'Click-lock'
    },
    {
      id: 'prod-002',
      handle: 'porcelain-tile-carrara-marble',
      title: 'Porcelain Tile - Carrara Marble Look',
      description: 'Premium porcelain tile with authentic Carrara marble veining. Suitable for floors and walls.',
      vendor: 'Elite Tiles Inc',
      productType: 'Porcelain Tile',
      tags: 'porcelain,marble-look,tile,bathroom,kitchen',
      published: true,
      variantSKU: 'PT-CARRARA-002',
      variantPrice: 8.99,
      variantComparePrice: 11.99,
      variantInventoryQty: 3000,
      variantInventoryPolicy: 'deny',
      variantWeight: 4.2,
      variantWeightUnit: 'lb',
      imageUrl: '/placeholder.svg',
      seoTitle: 'Carrara Marble Look Porcelain Tile',
      seoDescription: 'Elegant Carrara marble porcelain tiles for luxury flooring.',
      status: 'active',
      category: 'Tile',
      material: 'Porcelain',
      size: '24" x 24"',
      color: 'White/Gray',
      finish: 'Polished',
      thickness: '10mm',
      warranty: '10 years',
      installation: 'Thin-set mortar'
    }
  ];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImportStatus('processing');
    setImportProgress(0);
    setErrorMessage('');

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result as string;
        const parsed = await parseCSV(text);
        
        // Simulate processing progress
        for (let i = 0; i <= 100; i += 10) {
          setImportProgress(i);
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        setProducts(parsed);
        setImportStatus('success');
        
        // Save to localStorage as a simple database
        localStorage.setItem('flooringProducts', JSON.stringify(parsed));
      };
      reader.readAsText(file);
    } catch (error) {
      setImportStatus('error');
      setErrorMessage('Failed to parse CSV file. Please check the format.');
    }
  };

  const handleDownloadTemplate = () => {
    const template = generateCSVTemplate();
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flooring-products-template.csv';
    a.click();
  };

  const handleExportProducts = () => {
    const csv = exportToCSV(products);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flooring-products-export.csv';
    a.click();
  };

  const loadSampleProducts = () => {
    setProducts(sampleProducts);
    localStorage.setItem('flooringProducts', JSON.stringify(sampleProducts));
    setImportStatus('success');
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm(product);
  };

  const handleSaveEdit = () => {
    if (!editingId) return;
    
    const updatedProducts = products.map(p => 
      p.id === editingId ? { ...p, ...editForm } as Product : p
    );
    setProducts(updatedProducts);
    localStorage.setItem('flooringProducts', JSON.stringify(updatedProducts));
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (id: string) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('flooringProducts', JSON.stringify(updatedProducts));
  };

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      handle: 'new-product',
      title: 'New Product',
      description: '',
      vendor: '',
      productType: '',
      tags: '',
      published: false,
      variantSKU: '',
      variantPrice: 0,
      variantInventoryQty: 0,
      variantInventoryPolicy: 'deny',
      status: 'draft',
    };
    setProducts([newProduct, ...products]);
    setEditingId(newProduct.id);
    setEditForm(newProduct);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Bulk Product Import & Management
          </CardTitle>
          <CardDescription>
            Import, manage, and export your flooring products in bulk using CSV files - just like Shopify!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="import" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="import">Import</TabsTrigger>
              <TabsTrigger value="manage">Manage Products</TabsTrigger>
              <TabsTrigger value="template">Template & Guide</TabsTrigger>
            </TabsList>

            <TabsContent value="import" className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <FileSpreadsheet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Upload CSV File</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload a CSV file with your product data to import in bulk
                </p>
                
                <div className="flex gap-2 justify-center">
                  <Button onClick={() => fileInputRef.current?.click()}>
                    <Upload className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                  <Button variant="outline" onClick={handleDownloadTemplate}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                  <Button variant="secondary" onClick={loadSampleProducts}>
                    Load Sample Products
                  </Button>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {importStatus === 'processing' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Importing products...</span>
                    <span>{importProgress}%</span>
                  </div>
                  <Progress value={importProgress} />
                </div>
              )}

              {importStatus === 'success' && (
                <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle>Import Successful</AlertTitle>
                  <AlertDescription>
                    Successfully imported {products.length} products. Go to "Manage Products" tab to view and edit.
                  </AlertDescription>
                </Alert>
              )}

              {importStatus === 'error' && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Import Failed</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              <div className="grid md:grid-cols-3 gap-4 pt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">{products.length}</div>
                    <p className="text-sm text-muted-foreground">Total Products</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">
                      {products.filter(p => p.published).length}
                    </div>
                    <p className="text-sm text-muted-foreground">Published</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">
                      {products.filter(p => p.variantInventoryQty > 0).length}
                    </div>
                    <p className="text-sm text-muted-foreground">In Stock</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="manage" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Product Inventory</h3>
                <div className="flex gap-2">
                  <Button onClick={handleAddProduct}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                  <Button variant="outline" onClick={handleExportProducts} disabled={products.length === 0}>
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>

              {products.length > 0 ? (
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>SKU</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          {editingId === product.id ? (
                            <>
                              <TableCell>
                                <Input
                                  value={editForm.variantSKU || ''}
                                  onChange={(e) => setEditForm({ ...editForm, variantSKU: e.target.value })}
                                  className="w-24"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={editForm.title || ''}
                                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={editForm.productType || ''}
                                  onChange={(e) => setEditForm({ ...editForm, productType: e.target.value })}
                                  className="w-32"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={editForm.variantPrice || ''}
                                  onChange={(e) => setEditForm({ ...editForm, variantPrice: parseFloat(e.target.value) })}
                                  className="w-20"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={editForm.variantInventoryQty || ''}
                                  onChange={(e) => setEditForm({ ...editForm, variantInventoryQty: parseInt(e.target.value) })}
                                  className="w-20"
                                />
                              </TableCell>
                              <TableCell>
                                <select
                                  value={editForm.status || 'draft'}
                                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value as 'active' | 'draft' })}
                                  className="px-2 py-1 border rounded"
                                >
                                  <option value="active">Active</option>
                                  <option value="draft">Draft</option>
                                </select>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-1">
                                  <Button size="icon" variant="ghost" onClick={handleSaveEdit}>
                                    <Save className="h-4 w-4" />
                                  </Button>
                                  <Button size="icon" variant="ghost" onClick={() => setEditingId(null)}>
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </>
                          ) : (
                            <>
                              <TableCell className="font-mono text-sm">{product.variantSKU}</TableCell>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{product.title}</div>
                                  <div className="text-sm text-muted-foreground">{product.vendor}</div>
                                </div>
                              </TableCell>
                              <TableCell>{product.productType}</TableCell>
                              <TableCell>
                                <div>
                                  <div className="font-medium">${product.variantPrice}</div>
                                  {product.variantComparePrice && (
                                    <div className="text-sm line-through text-muted-foreground">
                                      ${product.variantComparePrice}
                                    </div>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>{product.variantInventoryQty}</TableCell>
                              <TableCell>
                                <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                                  {product.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-1">
                                  <Button size="icon" variant="ghost" onClick={() => handleEdit(product)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button size="icon" variant="ghost" onClick={() => handleDelete(product.id)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>No Products</AlertTitle>
                  <AlertDescription>
                    Import a CSV file or load sample products to get started.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="template" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>CSV Template & Column Guide</CardTitle>
                  <CardDescription>
                    Use this template structure for bulk importing flooring products
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Required Columns:</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                      <div>Handle | Title | Description | Vendor | Product Type</div>
                      <div>Tags | Published | Variant SKU | Variant Price</div>
                      <div>Variant Inventory Qty | Variant Inventory Policy</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Optional Flooring-Specific Columns:</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                      <div>Category | Material | Size | Color | Finish</div>
                      <div>Thickness | Warranty | Installation | Image URL</div>
                      <div>SEO Title | SEO Description | Status</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Example Row:</h4>
                    <div className="overflow-x-auto">
                      <pre className="bg-muted p-4 rounded-lg text-xs">
{`luxury-vinyl-oak,Luxury Vinyl Oak,Waterproof LVP flooring,Premium Floors,LVP,waterproof;oak;residential,true,LVP-001,4.99,5000,continue,Luxury Vinyl,Vinyl,7x48,Oak,Matte,8mm,25 years,Click-lock`}
                      </pre>
                    </div>
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Pro Tips</AlertTitle>
                    <AlertDescription>
                      <ul className="list-disc ml-4 mt-2 space-y-1">
                        <li>Use semicolons (;) to separate multiple tags</li>
                        <li>Prices should be numbers without currency symbols</li>
                        <li>Published should be "true" or "false"</li>
                        <li>Inventory policy: "deny" (stop selling when out) or "continue" (allow backorders)</li>
                        <li>Keep SKUs unique across all products</li>
                      </ul>
                    </AlertDescription>
                  </Alert>

                  <Button onClick={handleDownloadTemplate} className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download CSV Template
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}