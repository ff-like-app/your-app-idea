import { useState, useEffect, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ActionBar from "@/components/ActionBar";
import AccountCard from "@/components/AccountCard";
import EmptyState from "@/components/EmptyState";
import AddAccountModal from "@/components/AddAccountModal";
import ImportModal from "@/components/ImportModal";
import ExportPanel from "@/components/ExportPanel";
import FilePathConfig from "@/components/FilePathConfig";

import { GuestAccount } from "@/types/account";
import { loadAccounts, saveAccounts } from "@/lib/storage";
import { useFileSystem } from "@/hooks/useFileSystem";

const Index = () => {
  const [accounts, setAccounts] = useState<GuestAccount[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  // File system hook for native Android access
  const {
    isNative,
    hasPermission,
    isLoading,
    guestFilePath,
    guestFiles,
    setGuestFilePath,
    requestStoragePermission,
    injectAccount,
    refreshGuestFiles
  } = useFileSystem();

  // Load accounts from localStorage on mount
  useEffect(() => {
    const loaded = loadAccounts();
    setAccounts(loaded);
  }, []);

  // Save accounts whenever they change
  useEffect(() => {
    saveAccounts(accounts);
  }, [accounts]);

  // Filter accounts by search
  const filteredAccounts = useMemo(() => {
    if (!searchQuery.trim()) return accounts;
    const query = searchQuery.toLowerCase();
    return accounts.filter(
      (acc) =>
        acc.name?.toLowerCase().includes(query) ||
        acc.gameId?.includes(query) ||
        acc.uid.includes(query)
    );
  }, [accounts, searchQuery]);

  // Selected account
  const selectedAccount = useMemo(
    () => accounts.find((acc) => acc.id === selectedId) || null,
    [accounts, selectedId]
  );

  const handleAddAccount = (account: GuestAccount) => {
    setAccounts((prev) => [account, ...prev]);
    toast.success("Account added successfully!");
  };

  const handleImport = (imported: GuestAccount[]) => {
    setAccounts((prev) => [...imported, ...prev]);
    toast.success(`Imported ${imported.length} account(s)!`);
  };

  const handleDeleteAccount = (id: string) => {
    setAccounts((prev) => prev.filter((acc) => acc.id !== id));
    if (selectedId === id) setSelectedId(null);
    toast.success("Account deleted");
  };

  const handleSelectAccount = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const handleInjectAccount = async (account: GuestAccount): Promise<boolean> => {
    return await injectAccount(account);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="floating-orb w-96 h-96 bg-primary -top-48 -left-48" />
      <div className="floating-orb w-64 h-64 bg-secondary -bottom-32 -right-32" style={{ animationDelay: "2s" }} />
      <div className="floating-orb w-48 h-48 bg-accent top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: "4s" }} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 flex flex-col pb-32">
          {/* File path configuration for native Android */}
          {isNative && (
            <FilePathConfig
              currentPath={guestFilePath}
              onPathChange={setGuestFilePath}
              guestFiles={guestFiles}
              hasPermission={hasPermission}
              onRequestPermission={requestStoragePermission}
              onRefresh={refreshGuestFiles}
              isLoading={isLoading}
            />
          )}

          {accounts.length === 0 ? (
            <EmptyState
              onAddClick={() => setShowAddModal(true)}
              onImportClick={() => setShowImportModal(true)}
            />
          ) : (
            <>
              <ActionBar
                onAddClick={() => setShowAddModal(true)}
                onImportClick={() => setShowImportModal(true)}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                accountCount={filteredAccounts.length}
              />

              {/* Account list */}
              <div className="flex-1 px-4 space-y-3 overflow-y-auto">
                <AnimatePresence mode="popLayout">
                  {filteredAccounts.map((account, index) => (
                    <AccountCard
                      key={account.id}
                      account={account}
                      index={index}
                      isSelected={selectedId === account.id}
                      onSelect={() => handleSelectAccount(account.id)}
                      onDelete={() => handleDeleteAccount(account.id)}
                    />
                  ))}
                </AnimatePresence>

                {filteredAccounts.length === 0 && searchQuery && (
                  <div className="text-center py-12 text-muted-foreground">
                    No accounts match "{searchQuery}"
                  </div>
                )}
              </div>
            </>
          )}
        </main>

        <Footer />
      </div>

      {/* Modals */}
      <AddAccountModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddAccount}
      />

      <ImportModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={handleImport}
      />

      {/* Export panel */}
      {selectedAccount && (
        <ExportPanel
          account={selectedAccount}
          onClose={() => setSelectedId(null)}
          isNative={isNative}
          hasPermission={hasPermission}
          isLoading={isLoading}
          onInject={handleInjectAccount}
        />
      )}
    </div>
  );
};

export default Index;
