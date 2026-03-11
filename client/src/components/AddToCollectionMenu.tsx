import { useState } from 'react';
import { Folder, Plus } from 'lucide-react';
import { Collection } from '@/hooks/useCollections';

interface AddToCollectionMenuProps {
  promptId: number;
  collections: Collection[];
  onAddToCollection: (collectionId: string) => void;
  onCreateAndAdd: (name: string) => void;
}

export function AddToCollectionMenu({
  promptId,
  collections,
  onAddToCollection,
  onCreateAndAdd,
}: AddToCollectionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  const handleCreateAndAdd = () => {
    if (newCollectionName.trim()) {
      onCreateAndAdd(newCollectionName);
      setNewCollectionName('');
      setIsCreating(false);
      setIsOpen(false);
    }
  };

  const collectionsWithPrompt = collections.filter((c) =>
    c.promptIds.includes(promptId)
  );
  const collectionsWithoutPrompt = collections.filter(
    (c) => !c.promptIds.includes(promptId)
  );

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-muted rounded transition text-muted-foreground hover:text-foreground"
        title="Add to collection"
      >
        <Folder className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-border rounded shadow-lg z-40">
          <div className="p-3 space-y-2 max-h-64 overflow-y-auto">
            {/* Collections with this prompt */}
            {collectionsWithPrompt.length > 0 && (
              <>
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-2 py-1">
                  In Collections
                </div>
                {collectionsWithPrompt.map((collection) => (
                  <div
                    key={collection.id}
                    className="px-2 py-1 text-sm bg-muted text-foreground rounded"
                  >
                    ✓ {collection.name}
                  </div>
                ))}
              </>
            )}

            {/* Collections without this prompt */}
            {collectionsWithoutPrompt.length > 0 && (
              <>
                {collectionsWithPrompt.length > 0 && (
                  <div className="border-t border-border my-2"></div>
                )}
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-2 py-1">
                  Add to Collection
                </div>
                {collectionsWithoutPrompt.map((collection) => (
                  <button
                    key={collection.id}
                    onClick={() => {
                      onAddToCollection(collection.id);
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-2 py-2 text-sm hover:bg-muted rounded transition text-foreground"
                  >
                    {collection.name}
                  </button>
                ))}
              </>
            )}

            {/* Create new collection */}
            {isCreating ? (
              <div className="border-t border-border mt-2 pt-2 space-y-2">
                <input
                  type="text"
                  placeholder="Collection name"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-border rounded bg-white text-foreground"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleCreateAndAdd}
                    disabled={!newCollectionName.trim()}
                    className="flex-1 px-2 py-1 text-xs font-semibold bg-foreground text-white rounded hover:bg-foreground/90 disabled:opacity-50"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => {
                      setIsCreating(false);
                      setNewCollectionName('');
                    }}
                    className="flex-1 px-2 py-1 text-xs font-semibold border border-border rounded hover:bg-muted"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsCreating(true)}
                className="w-full border-t border-border mt-2 pt-2 px-2 py-2 text-sm text-foreground hover:bg-muted rounded transition flex items-center justify-center gap-2"
              >
                <Plus className="w-3 h-3" />
                New Collection
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
