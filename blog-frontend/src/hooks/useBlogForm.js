import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../api';

export const useBlogForm = (blogId = null) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', content: '', category: 'all' });
  const [banner, setBanner] = useState({ file: null, preview: null });
  const [status, setStatus] = useState({ loading: false, error: '', success: false });

  useEffect(() => {
    if (blogId) {
      API_URL.get(`/blog/${blogId}`).then(res => {
        setFormData({ title: res.data.title, content: res.data.content, category: res.data.category || 'all' });
        setBanner({ file: null, preview: res.data.bannerImage });
      }).catch(err => console.error("Error loading blog:", err));
    }
  }, [blogId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBannerChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBanner({ file, preview: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: false });

    const apiData = new FormData();
    apiData.append('title', formData.title);
    apiData.append('content', formData.content);
    apiData.append('category', formData.category);
    if (banner.file) apiData.append('banner', banner.file);

    try {
      const promise = blogId
        ? API_URL.put(`/blog/${blogId}`, apiData)
        : API_URL.post('/blog', apiData);

      const res = await promise;

      if (res.status === 200 || res.status === 201) {
        setStatus({ loading: false, error: '', success: true });
        setTimeout(() => navigate('/home'), 1200);
      }
    } catch (e) {
      setStatus({ loading: false, error: e.response?.data?.error || 'Something went wrong', success: false });
    }
  };

  return { formData, banner, status, handleInputChange, handleBannerChange, handleSubmit };
};