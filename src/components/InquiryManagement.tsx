import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, Phone, Building2, MessageSquare, CheckCircle, Clock, Archive } from 'lucide-react';
import toast from 'react-hot-toast';

interface Inquiry {
  id: string;
  name: string;
  business: string;
  email: string;
  phone: string;
  message: string;
  status: 'pending' | 'in_progress' | 'completed' | 'archived';
  created_at: string;
}

export default function InquiryManagement() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Inquiry['status'] | 'all'>('all');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries(data);
    } catch (error) {
      toast.error('Failed to fetch inquiries');
    } finally {
      setLoading(false);
    }
  };

  const updateInquiryStatus = async (id: string, status: Inquiry['status']) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Status updated successfully');
      fetchInquiries();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const filteredInquiries = inquiries.filter(
    inquiry => filter === 'all' || inquiry.status === filter
  );

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    archived: 'bg-gray-100 text-gray-800',
  };

  const statusIcons = {
    pending: Clock,
    in_progress: MessageSquare,
    completed: CheckCircle,
    archived: Archive,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Contact Form Inquiries</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'all'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'pending'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('in_progress')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'in_progress'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'completed'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter('archived')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'archived'
                ? 'bg-gray-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Archived
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {filteredInquiries.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">No Inquiries Found</h3>
            <p className="text-gray-500 mt-2">There are no inquiries matching the selected filter.</p>
          </div>
        ) : (
          filteredInquiries.map((inquiry) => {
            const StatusIcon = statusIcons[inquiry.status];
            return (
              <div key={inquiry.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{inquiry.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${statusColors[inquiry.status]}`}>
                        <StatusIcon className="w-4 h-4" />
                        {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Submitted on {new Date(inquiry.created_at).toLocaleString()}
                    </p>
                  </div>
                  <select
                    value={inquiry.status}
                    onChange={(e) => updateInquiryStatus(inquiry.id, e.target.value as Inquiry['status'])}
                    className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">{inquiry.business}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <a href={`mailto:${inquiry.email}`} className="text-blue-600 hover:underline">
                        {inquiry.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <a href={`tel:${inquiry.phone}`} className="text-blue-600 hover:underline">
                        {inquiry.phone}
                      </a>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Message</h4>
                    <p className="text-gray-700 whitespace-pre-wrap">{inquiry.message}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}