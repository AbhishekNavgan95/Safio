import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loader2, ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { api } from '../../../lib/utils';

const moduleSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    levelRequired: z.coerce.number().int().min(1, 'Level must be at least 1').default(1),
    xpReward: z.coerce.number().int().min(0, 'XP reward cannot be negative').default(50),
    order: z.coerce.number().int().min(0, 'Order cannot be negative').default(0),
    // questions: z.array(z.string()).default([])
});

export function ModuleForm() {
    const { id } = useParams();
    const isEditMode = !!id;
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [moduleData, setModuleData] = useState(null);

    // Initialize form with default values
    const form = useForm({
        resolver: zodResolver(moduleSchema),
        defaultValues: {
            title: '',
            description: '',
            levelRequired: 1,
            xpReward: 50,
            order: 0,
            // questions: []
        },
    });

    // Fetch module data if in edit mode
    useEffect(() => {
        if (isEditMode) {
            const fetchModule = async () => {
                try {
                    setLoading(true);
                    const response = await api.get(`/modules/${id}`);
                    setModuleData(response.data);
                    // Reset form with fetched data
                    form.reset({
                        title: response.data.title,
                        description: response.data.description || '',
                        levelRequired: response.data.levelRequired || 1,
                        xpReward: response.data.xpReward || 50,
                        order: response.data.order || 0,
                        // questions: response.data.questions || []
                    });
                } catch (err) {
                    console.error('Error fetching module:', err);
                    toast.error('Failed to load module data');
                    // navigate('/dashboard/modules');
                } finally {
                    setLoading(false);
                }
            };

            fetchModule();
        }
    }, [id, isEditMode, form, navigate]);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            if (isEditMode) {
                await api.put(`/modules/${id}`, data);
            } else {
                await api.post('/modules', data);
            }
            navigate('/dashboard/modules');
        } catch (err) {
            console.error('Error saving module:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode && !moduleData) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 mb-2"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Modules
            </button>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 border border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {isEditMode ? 'Edit Module' : 'Create New Module'}
                    </h3>
                </div>

                <div className="px-4 py-5 sm:p-6">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Title *
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        id="title"
                                        className="block w-full px-2 py-2 rounded-md border-gray-300 border focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        placeholder="Enter module title"
                                        {...form.register('title')}
                                    />
                                    {form.formState.errors.title && (
                                        <p className="mt-1 text-sm text-red-600">{form.formState.errors.title.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="levelRequired" className="block text-sm font-medium text-gray-700">
                                    Level Required
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="number"
                                        id="levelRequired"
                                        min={1}
                                        className="block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        {...form.register('levelRequired')}
                                    />
                                    {form.formState.errors.levelRequired && (
                                        <p className="mt-1 text-sm text-red-600">{form.formState.errors.levelRequired.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="xpReward" className="block text-sm font-medium text-gray-700">
                                    XP Reward
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="number"
                                        id="xpReward"
                                        min={0}
                                        className="block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        {...form.register('xpReward')}
                                    />
                                    {form.formState.errors.xpReward && (
                                        <p className="mt-1 text-sm text-red-600">{form.formState.errors.xpReward.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="order" className="block text-sm font-medium text-gray-700">
                                    Display Order
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="number"
                                        id="order"
                                        min={0}
                                        className="block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        {...form.register('order')}
                                    />
                                    {form.formState.errors.order && (
                                        <p className="mt-1 text-sm text-red-600">{form.formState.errors.order.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="description"
                                        rows={4}
                                        className="block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        placeholder="Enter module description"
                                        {...form.register('description')}
                                    />
                                    {form.formState.errors.description && (
                                        <p className="mt-1 text-sm text-red-600">{form.formState.errors.description.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/dashboard/modules')}
                                disabled={loading}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isEditMode ? 'Update Module' : 'Create Module'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
