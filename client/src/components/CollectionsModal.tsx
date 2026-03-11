import { useState } from 'react';
import { X, Plus, Trash2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Collection } from '@/hooks/useCollections';
import { exportToCSV, exportToPDF, exportCollectionToJSON } from '@/lib/exportUtils';

interface Prompt {
  id: number;
  platform: string;
  category: string;
  tone: string;
  situation: string;
  prompt: string;
}

interface CollectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  collections: Collection[];
  allPrompts: Prompt[];
  onCreateCollection: (name: string, description?: string) => void;
  onDeleteCollection: (id: string) => void;
  onUpdateCollection: (id: string, updates: Partial<Collection>) => void;
}

export function CollectionsModal({
  isOpen,
  onClose,
  collections,
  allPrompts,
  onCreateCollection,
  onDeleteCollection,
  onUpdateCollection,
}: CollectionsModalProps) {
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDesc, setNewCollectionDesc] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  if (!isOpen) return null;

  const handleCreateCollection = () => {
    if (newCollectionName.trim()) {
      onCreateCollection(newCollectionName, newCollectionDesc);
      setNewCollectionName('');
      setNewCollectionDesc('');
    }
  };

  const handleSaveEdit = (id: string) => {
    if (editingName.trim()) {
      onUpdateCollection(id, { name: editingName });
      setEditingId(null);
      setEditingName('');
    }
  };

  const getCollectionPrompts = (collection: Collection) => {
    return allPrompts.filter((p) => collection.promptIds.includes(p.id));
  };

  const handleExport = (collection: Collection, format: 'csv' | 'pdf' | 'json') => {
    const prompts = getCollectionPrompts(collection);
    const filename = `${collection.name.replace(/\s+/g, '_')}.${format === 'json' ? 'json' : format}`;

    if (format === 'csv') {
      exportToCSV(prompts, filename);
    } else if (format === 'pdf') {
      exportToPDF(prompts, filename);
    } else if (format === 'json') {
      exportCollectionToJSON(collection.name, prompts, filename);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <div className="sticky top-0 bg-white border-b border-border p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">My Collections</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded transition"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Create New Collection */}
          <div className="bg-muted p-4 rounded border border-border">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground mb-3">
              Create New Collection
            </h3>
            <div className="space-y-3">
              <Input
                placeholder="Collection name (e.g., Discord Onboarding)"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                className="bg-white border-border"
              />
              <Input
                placeholder="Description (optional)"
                value={newCollectionDesc}
                onChange={(e) => setNewCollectionDesc(e.target.value)}
                className="bg-white border-border"
              />
              <Button
                onClick={handleCreateCollection}
                disabled={!newCollectionName.trim()}
                className="w-full bg-foreground text-white hover:bg-foreground/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Collection
              </Button>
            </div>
          </div>

          {/* Collections List */}
          {collections.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No collections yet. Create one to organize your favorite prompts!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {collections.map((collection) => {
                const prompts = getCollectionPrompts(collection);
                const isEditing = editingId === collection.id;

                return (
                  <Card key={collection.id} className="p-4 border border-border">
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <div className="flex-1">
                        {isEditing ? (
                          <div className="space-y-2">
                            <Input
                              value={editingName}
                              onChange={(e) => setEditingName(e.target.value)}
                              className="bg-white border-border"
                              autoFocus
                            />
                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleSaveEdit(collection.id)}
                                size="sm"
                                className="bg-foreground text-white"
                              >
                                Save
                              </Button>
                              <Button
                                onClick={() => setEditingId(null)}
                                size="sm"
                                variant="outline"
                                className="border-border"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">{collection.name}</h4>
                            {collection.description && (
                              <p className="text-sm text-muted-foreground mt-1">{collection.description}</p>
                            )}
                            <p className="text-xs text-muted-foreground mt-2">
                              {prompts.length} prompt{prompts.length !== 1 ? 's' : ''} • Updated{' '}
                              {new Date(collection.updatedAt).toLocaleDateString()}
                            </p>
                          </div>
                        )}
                      </div>

                      {!isEditing && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingId(collection.id);
                              setEditingName(collection.name);
                            }}
                            className="p-2 hover:bg-muted rounded transition text-muted-foreground hover:text-foreground"
                            title="Edit collection"
                          >
                            ✎
                          </button>
                          <button
                            onClick={() => onDeleteCollection(collection.id)}
                            className="p-2 hover:bg-muted rounded transition text-muted-foreground hover:text-foreground"
                            title="Delete collection"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Export Options */}
                    {prompts.length > 0 && !isEditing && (
                      <div className="flex gap-2 pt-3 border-t border-border">
                        <button
                          onClick={() => handleExport(collection, 'csv')}
                          className="flex-1 px-3 py-2 text-xs font-semibold uppercase tracking-widest bg-muted hover:bg-border text-foreground rounded transition flex items-center justify-center gap-2"
                          title="Export as CSV"
                        >
                          <Download className="w-3 h-3" />
                          CSV
                        </button>
                        <button
                          onClick={() => handleExport(collection, 'pdf')}
                          className="flex-1 px-3 py-2 text-xs font-semibold uppercase tracking-widest bg-muted hover:bg-border text-foreground rounded transition flex items-center justify-center gap-2"
                          title="Export as PDF"
                        >
                          <Download className="w-3 h-3" />
                          PDF
                        </button>
                        <button
                          onClick={() => handleExport(collection, 'json')}
                          className="flex-1 px-3 py-2 text-xs font-semibold uppercase tracking-widest bg-muted hover:bg-border text-foreground rounded transition flex items-center justify-center gap-2"
                          title="Export as JSON"
                        >
                          <Download className="w-3 h-3" />
                          JSON
                        </button>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
