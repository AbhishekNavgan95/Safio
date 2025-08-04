import { Routes, Route, Navigate } from 'react-router-dom';
import { ModuleList } from '../../components/dashboard/modules/ModuleList';
import { ModuleForm } from '../../components/dashboard/modules/ModuleForm';

export function ModulePage() {
  return (
    <div className="container mx-auto p-4">
      <Routes>
        <Route index element={<ModuleList />} />
        <Route path="new" element={<ModuleForm />} />
        <Route path=":id" element={<ModuleForm />} />
        <Route path="*" element={<Navigate to="/dashboard/modules" replace />} />
      </Routes>
    </div>
  );
}
