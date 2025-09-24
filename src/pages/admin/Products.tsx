import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Download, Upload, Trash2, Edit, FileSpreadsheet, AlertCircle, Key, RefreshCw, Cloud } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { parseCsvFile, downloadCsvTemplate, exportProductsToCsv } from "@/utils/csvUtils";
import { flooringAPI } from "@/services/flooringApi";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

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

interface ImportProgress {
  sessionId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  processedRecords: number;
  totalRecords: number;
  errors?: string[];
  message?: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [apiToken, setApiToken] = useState<string>("");
  const [isTokenDialogOpen, setIsTokenDialogOpen] = useState(false);
  const [importProgress, setImportProgress] = useState<ImportProgress | null>(null);
  const [useApiImport, setUseApiImport] = useState(false);
  const [importHistory, setImportHistory] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Check if API token exists
    const token = flooringAPI.getAuthToken();
    if (token) {
      setApiToken(token);
      checkApiHealth();
      fetchImportHistory();
    }
  }, []);

  const checkApiHealth = async () => {
    try {
      const isHealthy = await flooringAPI.checkHealth();
      if (isHealthy) {
        toast({
          title: "API Connected",
          description: "Flooring bulk import API is available",
        });
      }
    } catch (error) {
      console.error("API health check failed:", error);
    }
  };

  const fetchImportHistory = async () => {
    try {
      const history = await flooringAPI.getImportHistory();
      setImportHistory(history);
    } catch (error) {
      console.error("Failed to fetch import history:", error);
    }
  };

  const handleSaveApiToken = () => {
    if (apiToken) {
      flooringAPI.setAuthToken(apiToken);
      setIsTokenDialogOpen(false);
      toast({
        title: "API Token Saved",
        description: "You can now use the bulk import API",
      });
      checkApiHealth();
      fetchImportHistory();
    }
  };

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

  const handleLocalUpload = async () => {
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

  const handleApiUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file to upload",
        variant: "destructive",
      });
      return;
    }

    if (!flooringAPI.getAuthToken()) {
      setIsTokenDialogOpen(true);
      return;
    }

    setIsUploading(true);
    setImportProgress(null);

    try {
      // Start the upload
      const session = await flooringAPI.uploadCSV(selectedFile);
      
      toast({
        title: "Upload Started",
        description: `Processing ${session.totalRecords} products...`,
      });

      // Poll for progress
      await flooringAPI.pollImportProgress(
        session.sessionId,
        (progress) => {
          setImportProgress(progress);
        },
        2000
      );

      toast({
        title: "Import Complete",
        description: `Successfully imported ${session.totalRecords} products`,
      });

      // Refresh history
      fetchImportHistory();
      
      setSelectedFile(null);
      const fileInput = document.getElementById('csv-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      toast({
        title: "Import Failed",
        description: error instanceof Error ? error.message : "Failed to import products",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setTimeout(() => setImportProgress(null), 3000);
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

  const handleDownloadTemplate = async () => {
    if (useApiImport && flooringAPI.getAuthToken()) {
      try {
        await flooringAPI.downloadTemplate();
        toast({
          title: "Template Downloaded",
          description: "CSV template downloaded successfully",
        });
      } catch (error) {
        downloadCsvTemplate();
      }
    } else {
      downloadCsvTemplate();
    }
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
          <Dialog open={isTokenDialogOpen} onOpenChange={setIsTokenDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Key className="mr-2 h-4 w-4" />
                {flooringAPI.getAuthToken() ? "Update" : "Set"} API Token
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>API Authentication</DialogTitle>
                <DialogDescription>
                  Enter your JWT token to enable API-based bulk imports
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="api-token">API Token (JWT)</Label>
                  <Input
                    id="api-token"
                    type="password"
                    value={apiToken}
                    onChange={(e) => setApiToken(e.target.value)}
                    placeholder="Enter your JWT token"
                  />
                </div>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    This token will be stored locally and used for authenticating with the bulk import API
                  </AlertDescription>
                </Alert>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsTokenDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveApiToken}>Save Token</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button onClick={handleDownloadTemplate} variant="outline">
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
          {flooringAPI.getAuthToken() && (
            <TabsTrigger value="history">Import History</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="import" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Import Method</CardTitle>
              <CardDescription>
                Choose between local processing or API-based import
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button
                  variant={!useApiImport ? "default" : "outline"}
                  onClick={() => setUseApiImport(false)}
                  className="flex-1"
                >
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Local Import
                </Button>
                <Button
                  variant={useApiImport ? "default" : "outline"}
                  onClick={() => setUseApiImport(true)}
                  className="flex-1"
                >
                  <Cloud className="mr-2 h-4 w-4" />
                  API Import {flooringAPI.getAuthToken() && "✓"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>CSV Upload</CardTitle>
              <CardDescription>
                {useApiImport 
                  ? "Upload CSV file to the bulk import API for processing"
                  : "Upload a CSV file to import products locally"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {useApiImport && (
                <Alert>
                  <Cloud className="h-4 w-4" />
                  <AlertDescription>
                    <strong>API Import Features:</strong>
                    <ul className="mt-2 ml-6 list-disc text-sm">
                      <li>Server-side validation and processing</li>
                      <li>Batch processing for large files</li>
                      <li>Real-time progress tracking</li>
                      <li>Import history and session management</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>CSV Format Requirements:</strong>
                  <ul className="mt-2 ml-6 list-disc text-sm">
                    <li>SKU, Name, Category, and Price are required fields</li>
                    <li>Price should be numeric (without currency symbols)</li>
                    <li>For images, provide URLs or leave blank</li>
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

              {importProgress && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Import Progress</span>
                    <span>{importProgress.processedRecords}/{importProgress.totalRecords} records</span>
                  </div>
                  <Progress value={importProgress.progress} />
                  <p className="text-sm text-muted-foreground">
                    Status: {importProgress.status}
                    {importProgress.message && ` - ${importProgress.message}`}
                  </p>
                  {importProgress.errors && importProgress.errors.length > 0 && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Errors:</strong>
                        <ul className="mt-2 ml-6 list-disc text-sm">
                          {importProgress.errors.slice(0, 3).map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}

              <Button 
                onClick={useApiImport ? handleApiUpload : handleLocalUpload} 
                disabled={!selectedFile || isUploading}
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                {isUploading ? "Importing..." : `Import Products${useApiImport ? " via API" : ""}`}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <h4 className="font-semibold">Step 1: Choose Import Method</h4>
                <p className="text-sm text-muted-foreground">
                  Select between local processing or API-based import for larger files.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Step 2: Download Template</h4>
                <p className="text-sm text-muted-foreground">
                  Click "Download Template" to get a CSV file with the correct format and example data.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Step 3: Fill in Your Data</h4>
                <p className="text-sm text-muted-foreground">
                  Open the template in Excel or Google Sheets and add your product information.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Step 4: Upload</h4>
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

        {flooringAPI.getAuthToken() && (
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Import History</CardTitle>
                <CardDescription>
                  View your previous bulk import sessions
                </CardDescription>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={fetchImportHistory}
                  className="ml-auto"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
              </CardHeader>
              <CardContent>
                {importHistory.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No import history available
                  </p>
                ) : (
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-4">
                      {importHistory.map((session) => (
                        <Card key={session.id}>
                          <CardContent className="pt-6">
                            <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <p className="font-medium">{session.fileName}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(session.createdAt).toLocaleString()}
                                </p>
                                <div className="flex gap-4 text-sm">
                                  <span>Total: {session.totalRecords}</span>
                                  <span className="text-green-600">Processed: {session.processedRecords}</span>
                                  {session.failedRecords > 0 && (
                                    <span className="text-destructive">Failed: {session.failedRecords}</span>
                                  )}
                                </div>
                              </div>
                              <Badge variant={
                                session.status === 'completed' ? 'default' :
                                session.status === 'failed' ? 'destructive' :
                                'secondary'
                              }>
                                {session.status}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}