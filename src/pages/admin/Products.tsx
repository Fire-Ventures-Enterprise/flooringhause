import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Download, Upload, Trash2, Edit, FileSpreadsheet, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { parseCsvFile, downloadCsvTemplate, exportProductsToCsv } from "@/utils/csvUtils";

interface Product {
  id: string;
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

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/csv") {
      setSelectedFile(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select a CSV file",
        variant: "destructive",
      });
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file to upload",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const parsedProducts = await parseCsvFile(selectedFile);
      
      // Add IDs to products if not present
      const productsWithIds = parsedProducts.map((product, index) => ({
        ...product,
        id: product.id || `prod-${Date.now()}-${index}`,
      }));

      setProducts(prevProducts => [...prevProducts, ...productsWithIds]);
      
      toast({
        title: "Success",
        description: `Imported ${productsWithIds.length} products successfully`,
      });
      
      setSelectedFile(null);
      // Reset file input
      const fileInput = document.getElementById('csv-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      toast({
        title: "Import failed",
        description: error instanceof Error ? error.message : "Failed to parse CSV file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
    toast({
      title: "Product deleted",
      description: "The product has been removed from the catalog",
    });
  };

  const handleExport = () => {
    exportProductsToCsv(products);
    toast({
      title: "Export complete",
      description: "Products exported to CSV file",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Product Management</h2>
          <p className="text-muted-foreground mt-2">
            Bulk import and manage your product catalog
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={downloadCsvTemplate} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Template
          </Button>
          {products.length > 0 && (
            <Button onClick={handleExport} variant="outline">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Export Products
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="import" className="space-y-4">
        <TabsList>
          <TabsTrigger value="import">Import Products</TabsTrigger>
          <TabsTrigger value="catalog">Product Catalog ({products.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="import" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>CSV Import</CardTitle>
              <CardDescription>
                Upload a CSV file to bulk import products into your catalog
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>CSV Format Requirements:</strong>
                  <ul className="mt-2 ml-6 list-disc text-sm">
                    <li>SKU, Name, Category, and Price are required fields</li>
                    <li>Price should be numeric (without currency symbols)</li>
                    <li>For images, provide URLs or leave blank (you can add them later)</li>
                    <li>Use the template for the correct format</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="csv-upload">Select CSV File</Label>
                <Input
                  id="csv-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleFileSelect}
                  disabled={isUploading}
                />
                {selectedFile && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                  </p>
                )}
              </div>

              <Button 
                onClick={handleUpload} 
                disabled={!selectedFile || isUploading}
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                {isUploading ? "Importing..." : "Import Products"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <h4 className="font-semibold">Step 1: Download Template</h4>
                <p className="text-sm text-muted-foreground">
                  Click "Download Template" to get a CSV file with the correct format and example data.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Step 2: Fill in Your Data</h4>
                <p className="text-sm text-muted-foreground">
                  Open the template in Excel or Google Sheets and add your product information.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Step 3: Upload</h4>
                <p className="text-sm text-muted-foreground">
                  Save as CSV and upload the file here to import all products at once.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="catalog" className="space-y-4">
          {products.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileSpreadsheet className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No products yet</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Import products using the CSV upload feature to get started
                </p>
                <Button onClick={() => {
                  const importTab = document.querySelector('[value="import"]') as HTMLButtonElement;
                  if (importTab) importTab.click();
                }}>
                  Go to Import
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Product Catalog</CardTitle>
                <CardDescription>
                  Manage your imported products
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>SKU</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Sale Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{product.name}</div>
                              {product.brand && (
                                <div className="text-sm text-muted-foreground">{product.brand}</div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div>{product.category}</div>
                              {product.subcategory && (
                                <div className="text-sm text-muted-foreground">{product.subcategory}</div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>${product.price.toFixed(2)}</TableCell>
                          <TableCell>
                            {product.salePrice ? (
                              <span className="text-destructive">${product.salePrice.toFixed(2)}</span>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant={product.inStock ? "default" : "secondary"}>
                              {product.inStock ? "In Stock" : "Out of Stock"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setEditingProduct(product)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}