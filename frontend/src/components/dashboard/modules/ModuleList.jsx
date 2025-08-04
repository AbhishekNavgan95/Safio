import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, Save, X } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { api } from '../../../lib/utils';
import ConfirmModal from '../../common/ConfirmModal';

export function ModuleList({ onEdit, onCreate }) {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReordering, setIsReordering] = useState(false);
  const [isDirty, setIsDirty]         = useState(false);
  const [isSaving, setIsSaving]       = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState(null);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      setLoading(true);
      const response = await api.get('/modules');
      setModules(response.data);
    } catch (err) {
      console.error('Error fetching modules:', err);
      setError('Failed to load modules. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ---- Ordering helpers ----
  const updateOrder = (list) => list.map((m, idx) => ({ ...m, order: idx + 1 }));

  const moveUp = (i) => {
    if (i === 0) return;
    const arr = [...modules];
    [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
    setModules(updateOrder(arr));
    setIsDirty(true);
  };

  const moveDown = (i) => {
    if (i === modules.length - 1) return;
    const arr = [...modules];
    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    setModules(updateOrder(arr));
    setIsDirty(true);
  };

  const handleSaveOrder = async () => {
    try {
      setIsSaving(true);
      await api.post('/modules/reorder', { modules });
      setIsDirty(false);
      setIsReordering(false);
    } catch (err) {
      console.error('Error saving order:', err);
      alert('Failed to save order');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelReorder = () => {
    fetchModules();
    setIsReordering(false);
    setIsDirty(false);
  };

  const handleDelete = async (id) => {

      try {
        await api.delete(`/modules/${id}`);
        fetchModules();
      } catch (err) {
        console.error('Error deleting module:', err);
      }
  };

  const openDeleteModal = (module) => {
    setModuleToDelete(module);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!moduleToDelete) return;
    await handleDelete(moduleToDelete._id);
    setModalOpen(false);
    setModuleToDelete(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Modules</h3>
          <p className="text-sm text-gray-500">Manage your learning modules</p>
        </div>
        {isReordering ? (
          <div className="flex space-x-2">
            <button onClick={handleSaveOrder} disabled={!isDirty || isSaving} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 disabled:opacity-50">
              {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save
            </button>
            <button onClick={handleCancelReorder} className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50">
              <X className="mr-2 h-4 w-4" /> Cancel
            </button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <button onClick={() => setIsReordering(true)} className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50">Reorder</button>
            <Link 
              to="new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={(e) => e.stopPropagation()}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Module
            </Link>
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {isReordering && <th className="px-4 py-3" />}
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level Required</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">XP Reward</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {modules.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                  No modules found. Create your first module to get started.
                </td>
              </tr>
            ) : (
              modules.map((module, idx) => (
                <tr key={module._id} className="hover:bg-gray-50">
                  {isReordering && (
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-col items-center">
                        <button onClick={() => moveUp(idx)} disabled={idx===0} className="p-1 disabled:opacity-20"><ArrowUp size={14} /></button>
                        <button onClick={() => moveDown(idx)} disabled={idx===modules.length-1} className="p-1 disabled:opacity-20"><ArrowDown size={14} /></button>
                      </div>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{module.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{module.levelRequired}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{module.xpReward}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{module.order}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link 
                        to={`${module._id}`}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => openDeleteModal(module)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ConfirmModal
        open={modalOpen}
        title="Delete module?"
        description={moduleToDelete ? `Are you sure you want to delete "${moduleToDelete.title}"? This action cannot be undone.` : ''}
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
